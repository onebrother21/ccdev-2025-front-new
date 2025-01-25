import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Bug } from '../bugs.model';
import { BugsService } from '../bugs.service';
import { Subscription, tap, withLatestFrom } from 'rxjs';
import { Task } from '_dev/tasks/tasks.model';

@Component({
  selector: 'app-bug-task-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bug-task-list.component.html',
  styleUrl: './bug-task-list.component.scss'
})

export class BugTaskListComponent implements OnInit,OnDestroy {
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  private subs$:Subscription[] = [];
  taskDropdown = ["Action","Another Action","Do Something Else"];
  bugId!: string;
  bug?: Bug;
  tasks:Task[] = [];
  constructor(
    private route: ActivatedRoute,
    private bugsSvc: BugsService,
    private router:Router
  ){}
  ngOnInit(){
    this.subs$.push(
      this.route.params.pipe(
        withLatestFrom(this.bugsSvc.bugs$),
        tap(([params,bugs]) => {
          this.bugId = params['orderId'];
          this.bug = bugs.find((p) => p.id === this.bugId);
      })).subscribe()
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
  toggleTaskComplete(o:Task){this.bugsSvc.updateTask(this.bugId,o.id,{status:o.status == 'completed'?'in-progress':'completed'});}
}