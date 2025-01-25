
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { Router } from '@angular/router';
import { Courier } from '../courier.models';
import { CouriersService } from '../couriers.service';
import { Subscription, tap } from 'rxjs';
import { AppStateService } from '@state';

@Component({
  selector: 'app-courier-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './courier-list.component.html',
  styleUrl: './courier-list.component.scss'
})

export class CourierListComponent implements OnInit,OnDestroy {
  ngOnDestroy(){this.subs.forEach(s => s.unsubscribe());}
  private subs:Subscription[] = [];
  dropdownMenu = ["Action","Another Action","Do Something Else"];
  couriers:Courier[] = [];
  constructor(
    private couriersSvc:CouriersService,
    private router:Router,
    private app:AppStateService,
  ){}
  ngOnInit(){
    this.subs.push(
      this.couriersSvc.couriers$.pipe(tap(o => this.couriers = o)).subscribe(),
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
  getVehicleString(courier:Courier){
    const yr = "'"+courier.vehicle.yr.toString().slice(2);
    const make = " " + courier.vehicle.make;
    const model = " " + courier.vehicle.model;
    return yr + make + model;
  }
  editCourier(courierId:string){
    this.couriersSvc.selectCourier(courierId);
    this.router.navigate([`/admin/couriers`,{outlets:{primary:courierId,aux:`${courierId}/tasks`}}]);
  }
  startNewCourier(){this.router.navigate([`/admin/couriers`,{outlets:{primary:'new',aux:''}}]);}
}