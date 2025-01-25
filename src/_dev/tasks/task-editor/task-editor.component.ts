import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../tasks.service';
import { Task } from '../tasks.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss'
})

export class TaskEditorComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: string;
  task?: Task;
  dateInputConfig = Object.assign({},
    {
      minDate:new Date("09-27-2024"),
      showWeekNumbers: false,
      locale: 'en',
      containerClass:'theme-red',
      adaptivePosition: true,
      dateInputFormat : 'MM-DD-YYYY',
      selectFromOtherMonth:true,
    }
  );
  options = [{name:'SP'},{name:'LLC'},{name:'S-Corp'}];
  selectedCheck = -1;
  constructor(private route: ActivatedRoute, private tasksSvc: TasksService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['taskId'];
    this.tasksSvc.tasks$.pipe(tap(o => {
      this.task = o.find((p) => p.id === this.taskId);
      this.taskForm = this.fb.group({
        title: [this.task?.title || '', [Validators.required, Validators.minLength(3)]],
        description: [this.task?.description || '', [Validators.required, Validators.minLength(10)]],
      });
      //this.selectedCheck = this.options.findIndex(o => o.name === this.task?.type);
    })).subscribe();
  }
  changeSelection(i:number) {
    this.selectedCheck = this.selectedCheck === i?-1:i;
    const value = this.selectedCheck > -1?this.options[this.selectedCheck].name:undefined;
    this.taskForm.get("type")?.patchValue(value);
  }
  updateTask(): void {
    if (this.taskForm.valid && this.task) {
      const o = this.taskForm.value;
      this.tasksSvc.updateTask(this.task.id,o);
    }
  }
}
