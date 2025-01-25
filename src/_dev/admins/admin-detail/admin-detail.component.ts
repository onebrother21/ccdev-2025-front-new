import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../admin.models';
import { AdminsService } from '../admins.service';
import { Subscription, tap, withLatestFrom } from 'rxjs';
import Stepper from 'bs-stepper';

type TimelineItem = {
  badgeColor:|"danger"|"success"|"info"|"warning"
  badgeIcon:string
  text:string
  title?:string
  timeText?:string
};

@Component({
  selector: 'app-admin-detail',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './admin-detail.component.html',
  styleUrl: './admin-detail.component.scss'
})

export class AdminDetailComponent implements OnInit,OnDestroy {
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  private subs$:Subscription[] = [];
  adminId!: string;
  admin?: Admin;
  constructor(
    private route: ActivatedRoute,
    private adminsSvc: AdminsService,
  ){}
  ngOnInit(): void {
    this.subs$.push(
      this.route.params.pipe(
        withLatestFrom(this.adminsSvc.admins$),
        tap(([params,admins]) => {
          this.adminId = params['adminId'];
          this.admin = admins.find((p) => p.id === this.adminId);
      })).subscribe()
    );
  }
  items:TimelineItem[] = [
    {
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Some Title",
      text:'Admin received',
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
      text:"Courier en route to procure admin",
      timeText:"9:10 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier arrived to procure admin",
      timeText:"9:18 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Admin procured",
      timeText:"9:23 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier en route to deliver admin",
      timeText:"9:23 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier arrived to deliver admin",
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
      text:"Admin delivered",
      timeText:"9:42 pm"
    },
  ];
}
