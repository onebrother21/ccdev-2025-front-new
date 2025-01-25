import { Component } from '@angular/core';
import { SharedModule } from '@shared';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})

export class OrderComponent {
  constructor(
    private router:Router,
    private ordersSvc:OrdersService
  ){}
  ngOnInit() {
    this.ordersSvc.orders$.pipe(
      withLatestFrom(this.ordersSvc.selectedOrder$),
      tap(([orders,orderId]) => {
        if(orders.length){
          this.router.navigate(['/admin/orders',{outlets:{primary:"list",aux:`${orderId||orders[0].id}/tasks`}}]);
        }
    })).subscribe();
  }
}
