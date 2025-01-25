import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { Order } from '../orders.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-order-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './order-editor.component.html',
  styleUrl: './order-editor.component.scss'
})

export class OrderEditorComponent implements OnInit {
  orderForm!: FormGroup;
  orderId!: string;
  order?: Order;
  dateInputConfig = Object.assign({},
    {
      minDate:new Date("12/31/2024"),
      showWeekNumbers: false,
      locale: 'en',
      containerClass:'theme-red',
      adaptivePosition: true,
      dateInputFormat : 'MM-DD-YYYY',
      selectFromOtherMonth:true,
    }
  );
  options = [{name:'SP'},{name:'LLC'},{name:'S-Corp'}];
  selectedCheck = -1;
  constructor(
    private route: ActivatedRoute,
    private ordersSvc: OrdersService,
    private fb: FormBuilder,
    private router:Router
  ){}
  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['orderId'];
    this.ordersSvc.orders$.pipe(tap(o => {
      this.order = o.find((p) => p.id === this.orderId);
      this.orderForm = this.fb.group({
        notes: [this.order?.notes || '', [Validators.required, Validators.minLength(3)]],
        description: [this.order?.description || '', [Validators.required, Validators.minLength(10)]],
        deliveryDate: [new Date(this.order?.deliveryDate || ''), [Validators.required]],
        //type: [this.order?.type || '', [Validators.required]],
      });
      //this.selectedCheck = this.options.findIndex(o => o.name === this.order?.type);
    })).subscribe();
  }
  changeSelection(i:number) {
    this.selectedCheck = this.selectedCheck === i?-1:i;
    const value = this.selectedCheck > -1?this.options[this.selectedCheck].name:undefined;
    this.orderForm.get("type")?.patchValue(value);
  }
  updateOrder(): void {
    if (this.orderForm.valid && this.order) {
      const v = this.orderForm.value;
      this.ordersSvc.updateOrder(this.order.id,v);
      this.router.navigate(['/admin/orders',{outlets:{primary:"list",aux:`${this.orderId}/tasks`}}]);
    }
  }
}
