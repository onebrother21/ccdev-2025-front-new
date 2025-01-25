import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { ActivatedRoute } from '@angular/router';
import { Courier } from '../courier.models';
import { CouriersService } from '../couriers.service';
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
  selector: 'app-courier-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './courier-detail.component.html',
  styleUrl: './courier-detail.component.scss'
})

export class CourierDetailComponent implements OnInit,OnDestroy {
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  private subs$:Subscription[] = [];
  courierId!: string;
  courier?: Courier;
  constructor(
    private route: ActivatedRoute,
    private couriersSvc: CouriersService,
    private win:AppWindowService,
  ){}
  ngOnInit(): void {
    this.subs$.push(
      this.route.params.pipe(
        withLatestFrom(this.couriersSvc.couriers$),
        tap(([params,couriers]) => {
          this.courierId = params['courierId'];
          this.courier = couriers.find((p) => p.id === this.courierId);
      })).subscribe()
    );
  }
  items:TimelineItem[] = [
    {
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Some Title",
      text:'Courier received',
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
      text:"Courier en route to procure courier",
      timeText:"9:10 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier arrived to procure courier",
      timeText:"9:18 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier procured",
      timeText:"9:23 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier en route to deliver courier",
      timeText:"9:23 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier arrived to deliver courier",
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
      text:"Courier delivered",
      timeText:"9:42 pm"
    },
  ];
}
