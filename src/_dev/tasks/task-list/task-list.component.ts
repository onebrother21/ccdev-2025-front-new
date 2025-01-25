import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { Task } from '../tasks.model';
import { TasksService } from '../tasks.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})

export class TaskListComponent implements OnInit,OnDestroy {
  private subs:Subscription[] = [];
  taskDropdown = ["Action","Another Action","Do Something Else"];
  tasks:Task[] = [];
  constructor(private tasksSvc:TasksService){}
  ngOnInit(){
    this.subs.push(
      this.tasksSvc.tasks$.pipe(tap(o => this.tasks = o)).subscribe(),
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
  toggleTaskComplete(o:Task){this.tasksSvc.updateTask(o.id,{status:o.status == 'completed'?'in-progress':'completed'});}
  ngOnDestroy(){this.subs.forEach(s => s.unsubscribe());}
}

