import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BugsService } from '../bugs.service';
import { Bug } from '../bugs.model';
import { Subscription, tap, withLatestFrom } from 'rxjs';
import { Task } from '_dev/tasks/tasks.model';

@Component({
  selector: 'app-bug-task-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bug-task-editor.component.html',
  styleUrl: './bug-task-editor.component.scss'
})
export class BugTaskEditorComponent implements OnInit,OnDestroy {
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  private subs$:Subscription[] = [];
  taskForm!: FormGroup;
  bugId!: string;
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
  constructor(private route: ActivatedRoute, private bugsSvc: BugsService, private fb: FormBuilder) {}
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
          this.taskForm = this.fb.group({
            title: [this.task?.title || '', [Validators.required, Validators.minLength(3)]],
            description: [this.task?.description || '', [Validators.required, Validators.minLength(10)]],
          });
          //this.selectedCheck = this.options.findIndex(o => o.name === this.task?.type);
        })
      ).subscribe(),
    );
  }
  changeSelection(i:number) {
    this.selectedCheck = this.selectedCheck === i?-1:i;
    const value = this.selectedCheck > -1?this.options[this.selectedCheck].name:undefined;
    this.taskForm.get("type")?.patchValue(value);
  }
  updateTask(): void {
    if (this.taskForm.valid && this.task) {
      const o = this.taskForm.value;
      this.bugsSvc.updateBug(this.task.id,o);
    }
  }
}