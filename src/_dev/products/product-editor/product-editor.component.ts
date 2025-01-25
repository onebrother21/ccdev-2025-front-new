import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product.models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.scss'
})
export class ProductEditorComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  product?: Product;
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
    private productsSvc: ProductsService,
    private fb: FormBuilder,
    private router:Router
  ){}
  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    this.productsSvc.products$.pipe(tap(o => {
      this.product = o.find((p) => p.id === this.productId);
      this.productForm = this.fb.group({
        notes: [this.product?.notes || '', [Validators.required, Validators.minLength(3)]],
        description: [this.product?.description || '', [Validators.required, Validators.minLength(10)]],
        deliveryDate: [new Date(this.product?.deliveryDate || ''), [Validators.required]],
        //type: [this.product?.type || '', [Validators.required]],
      });
      //this.selectedCheck = this.options.findIndex(o => o.name === this.product?.type);
    })).subscribe();
  }
  changeSelection(i:number) {
    this.selectedCheck = this.selectedCheck === i?-1:i;
    const value = this.selectedCheck > -1?this.options[this.selectedCheck].name:undefined;
    this.productForm.get("type")?.patchValue(value);
  }
  updateProduct(): void {
    if (this.productForm.valid && this.product) {
      const v = this.productForm.value;
      this.productsSvc.updateProduct(this.product.id,v);
      this.router.navigate(['/admin/products',{outlets:{primary:"list",aux:`${this.productId}/tasks`}}]);
    }
  }
}
