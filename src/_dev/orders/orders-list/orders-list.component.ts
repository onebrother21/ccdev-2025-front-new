import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { Router } from '@angular/router';
import { Order } from '../orders.model';
import { OrdersService } from '../orders.service';
import { AppStateService } from '@state';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})

export class OrdersListComponent implements OnInit,OnDestroy {
  private subs:Subscription[] = [];
  dropdownMenu = ["Action","Another Action","Do Something Else"];
  orders:Order[] = [];
  constructor(
    private ordersSvc:OrdersService,
    private router:Router,
    private app:AppStateService,
  ){}
  ngOnInit(){
    this.subs.push(
      this.ordersSvc.orders$.pipe(tap(o => this.orders = o)).subscribe(),
    );
  }
  doDropdownAction(i:number){
    switch(i){
      case 0:console.log("take action 1");break;
      case 1:console.log("take action 2");break;
      case 2:console.log("do something else");break;
      default:break;
    }
  }
  toggleOrderComplete(o:Order){this.ordersSvc.updateOrder(o.id,{orderStatus:o.orderStatus == "Delivered"?"Placed":'Delivered'});}
  loadOrderTasksInAux(orderId:string){
    this.ordersSvc.selectOrder(orderId);
    this.router.navigate([`/admin/orders`,{outlets:{primary:'list',aux:`${orderId}/tasks`}}]);
  }
  editOrder(orderId:string){
    this.ordersSvc.selectOrder(orderId);
    this.router.navigate([`/admin/orders/${orderId}`]);
  }
  startNewOrder(){this.router.navigate([`/admin/orders`,{outlets:{primary:'new',aux:''}}]);}
  ngOnDestroy(){this.subs.forEach(s => s.unsubscribe());}
}