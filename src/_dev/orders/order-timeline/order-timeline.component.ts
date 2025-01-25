import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../orders.model';
import { OrdersService } from '../orders.service';
import { Subscription, tap, withLatestFrom } from 'rxjs';
import { AppWindowService } from 'core';
import Stepper from 'bs-stepper';

type TimelineItem = {
  badgeColor:|"danger"|"success"|"info"|"warning"
  badgeIcon:string
  text:string
  title?:string
  timeText?:string
};

@Component({
  selector: 'app-order-timeline',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './order-timeline.component.html',
  styleUrl: './order-timeline.component.scss'
})

export class OrderTimelineComponent implements OnInit,OnDestroy {
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  private subs$:Subscription[] = [];
  orderId!: string;
  order?: Order;
  constructor(
    private route: ActivatedRoute,
    private ordersSvc: OrdersService,
    private win:AppWindowService,
  ){}
  ngOnInit(): void {
    this.subs$.push(
      this.route.params.pipe(
        withLatestFrom(this.ordersSvc.orders$),
        tap(([params,orders]) => {
          this.orderId = params['orderId'];
          this.order = orders.find((p) => p.id === this.orderId);
      })).subscribe()
    );
  }
  items:TimelineItem[] = [
    {
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Some Title",
      text:'Order received',
      timeText:"9:05 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Some Title",
      text:'Courier dispatched',
      timeText:"9:08 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier en route to procure order",
      timeText:"9:10 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier arrived to procure order",
      timeText:"9:18 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Order procured",
      timeText:"9:23 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier en route to deliver order",
      timeText:"9:23 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier arrived to deliver order",
      timeText:"9:39 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Customer ID & age verified",
      timeText:"9:42 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Order delivered",
      timeText:"9:42 pm"
    },
  ];
}
