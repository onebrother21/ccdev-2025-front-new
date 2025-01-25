import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BugsService } from '../bugs.service';
import { Bug } from '../bugs.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-bug-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bug-editor.component.html',
  styleUrl: './bug-editor.component.scss'
})
export class BugEditorComponent implements OnInit {
  bugForm!: FormGroup;
  bugId!: string;
  bug?: Bug;
  dateInputConfig = Object.assign({},
    {
      minDate:new Date(),
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
  constructor(
    private route: ActivatedRoute,
    private bugsSvc: BugsService,
    private fb: FormBuilder,
    private router:Router
  ){}
  ngOnInit(): void {
    this.bugId = this.route.snapshot.params['bugId'];
    this.bugsSvc.bugs$.pipe(tap(o => {
      this.bug = o.find((p) => p.id === this.bugId);
      this.bugForm = this.fb.group({
        title: [this.bug?.title || '', [Validators.required, Validators.minLength(3)]],
        description: [this.bug?.description || '', [Validators.required, Validators.minLength(10)]],
        dueDate: [new Date(this.bug?.dueDate || ''), [Validators.required]],
        type: [this.bug?.type || '', [Validators.required]],
      });
      this.selectedCheck = this.options.findIndex(o => o.name === this.bug?.type);
    })).subscribe();
  }
  changeSelection(i:number) {
    this.selectedCheck = this.selectedCheck === i?-1:i;
    const value = this.selectedCheck > -1?this.options[this.selectedCheck].name:undefined;
    this.bugForm.get("type")?.patchValue(value);
  }
  updateBug(): void {
    if (this.bugForm.valid && this.bug) {
      const v = this.bugForm.value;
      this.bugsSvc.updateBug(this.bug.id,v);
      this.router.navigate(['/admin/bugs',{outlets:{primary:"list",aux:`${this.bugId}/tasks`}}]);
    }
  }
}
