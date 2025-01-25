import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { ActivatedRoute } from '@angular/router';
import { TaskEditorComponent } from '../task-editor';
import { TasksService } from '../tasks.service';
import { tap } from 'rxjs';
import { Task } from '../tasks.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [SharedModule,TaskEditorComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})

export class TaskDetailsComponent implements OnInit {
  taskId!: string;
  task?: Task;
  activeTab = 0;
  constructor(private route: ActivatedRoute, private tasksSvc: TasksService) {}
  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['taskId'];
    this.tasksSvc.tasks$.pipe(tap(o => {
      this.task = o.find((p) => p.id === this.taskId);
    })).subscribe();
  }
  addSubtask(): void {
    if (this.task) {
      this.tasksSvc.addSubtaskToTask(this.task.id);
    }
  }
  deleteSubtask(sectionId: string): void {
    if (this.task) {
      this.tasksSvc.removeSubtaskFromTask(this.task.id, sectionId);
    }
  }
}
