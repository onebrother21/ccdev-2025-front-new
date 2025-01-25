import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '@shared';
import { AppStateService } from '@state';
import { Admin } from '../admin.models';
import { AdminsService } from '../admins.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss'
})

export class AdminListComponent implements OnInit,OnDestroy {
  private subs:Subscription[] = [];
  dropdownMenu = ["Action","Another Action","Do Something Else"];
  admins:Admin[] = [];
  constructor(
    private adminsSvc:AdminsService,
    private router:Router,
    private app:AppStateService,
  ){}
  ngOnInit(){
    this.subs.push(
      this.adminsSvc.admins$.pipe(tap(o => this.admins = o)).subscribe(),
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
  toggleAdminComplete(o:Admin){this.adminsSvc.updateAdmin(o.id,{adminStatus:o.adminStatus == "Delivered"?"Placed":'Delivered'});}
  loadAdminTasksInAux(adminId:string){
    this.adminsSvc.selectAdmin(adminId);
    this.router.navigate([`/admin/admins`,{outlets:{primary:'list',aux:`${adminId}/tasks`}}]);
  }
  editAdmin(adminId:string){
    this.adminsSvc.selectAdmin(adminId);
    this.router.navigate([`/admin/admins/${adminId}`]);
  }
  startNewAdmin(){this.router.navigate([`/admin/admins`,{outlets:{primary:'new',aux:''}}]);}
  ngOnDestroy(){this.subs.forEach(s => s.unsubscribe());}
}