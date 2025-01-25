import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { ActivatedRoute } from '@angular/router';
import { BugTaskEditorComponent } from '../bug-task-editor';
import { BugsService } from '../bugs.service';
import { Subscription, tap, withLatestFrom } from 'rxjs';
import { Task } from '_dev/tasks/tasks.model';

@Component({
  selector: 'app-bug-task-details',
  standalone: true,
  imports: [SharedModule,BugTaskEditorComponent],
  templateUrl: './bug-task-details.component.html',
  styleUrl: './bug-task-details.component.scss'
})

export class BugTaskDetailsComponent implements OnInit,OnDestroy {
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  private subs$:Subscription[] = [];
  bugId!: string;
  taskId!: string;
  task?: Task;
  activeTab = 0;
  constructor(private route: ActivatedRoute, private bugsSvc: BugsService) {}
  ngOnInit(): void {
    this.subs$.push(
      this.route.params.pipe(
        withLatestFrom(this.bugsSvc.bugs$),
        withLatestFrom(this.bugsSvc.selectedBug$),
        tap(([[params,bugs],selectedBug]) => {
          this.bugId = selectedBug || '';
          this.taskId = params["taskId"];
          const bug = bugs.find((p) => p.id === this.bugId);
          this.task = bug?.tasks.find(o => o.id == this.taskId);
        })
      ).subscribe(),
    );
  }
  addSubtask(): void {
    if(this.task) {
      this.bugsSvc.addTaskToBug(this.task.id);
    }
  }
  deleteSubtask(sectionId: string): void {
    if (this.task) {
      this.bugsSvc.removeTaskFromBug(this.task.id, sectionId);
    }
  }
}
