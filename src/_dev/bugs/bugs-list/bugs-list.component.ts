import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Bug } from '../bugs.model';
import { Subscription, tap } from 'rxjs';
import { BugsService } from '../bugs.service';

@Component({
  selector: 'app-bugs-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bugs-list.component.html',
  styleUrl: './bugs-list.component.scss'
})

export class BugsListComponent implements OnInit,OnDestroy {
  private subs:Subscription[] = [];
  dropdownMenu = ["Action","Another Action","Do Something Else"];
  bugs:Bug[] = [];
  constructor(
    private bugsSvc:BugsService,
    private router:Router,
    private route: ActivatedRoute,
  ){}
  ngOnInit(){
    this.subs.push(
      this.bugsSvc.bugs$.pipe(tap(o => this.bugs = o)).subscribe(),
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
  toggleBugComplete(o:Bug){this.bugsSvc.updateBug(o.id,{status:o.status == 'completed'?'in-progress':'completed'});}
  loadBugTasksInAux(bugId:string){
    this.bugsSvc.selectBug(bugId);
    this.router.navigate([`/admin/bugs`,{outlets:{primary:'list',aux:`${bugId}/tasks`}}]);
  }
  editBug(bugId:string){
    this.bugsSvc.selectBug(bugId);
    this.router.navigate([`/admin/bugs/${bugId}`]);
  }
  ngOnDestroy(){this.subs.forEach(s => s.unsubscribe());}
}