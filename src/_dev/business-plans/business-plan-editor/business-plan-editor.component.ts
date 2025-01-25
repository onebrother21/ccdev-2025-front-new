import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BusinessPlanService } from '../business-plan.service';
import { BusinessPlan } from '../business-plan.models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-business-plan-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './business-plan-editor.component.html',
  styleUrl: './business-plan-editor.component.scss'
})

export class BusinessPlanEditorComponent implements OnInit {
  planForm!: FormGroup;
  planId!: string;
  plan?: BusinessPlan;
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
  constructor(private route: ActivatedRoute, private planService: BusinessPlanService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.planId = this.route.snapshot.params['planId'];
    this.planService.plans$.pipe(tap(o => {
      this.plan = o.find((p) => p.id === this.planId);
      this.planForm = this.fb.group({
        title: [this.plan?.title || '', [Validators.required, Validators.minLength(3)]],
        description: [this.plan?.description || '', [Validators.required, Validators.minLength(10)]],
        startDate: [new Date(this.plan?.startDate || ''), [Validators.required]],
        type: [this.plan?.type || '', [Validators.required]],
      });
      this.selectedCheck = this.options.findIndex(o => o.name === this.plan?.type);
    })).subscribe();
  }
  changeSelection(i:number) {
    this.selectedCheck = this.selectedCheck === i?-1:i;
    const value = this.selectedCheck > -1?this.options[this.selectedCheck].name:undefined;
    this.planForm.get("type")?.patchValue(value);
  }
  updatePlan(): void {
    if (this.planForm.valid && this.plan) {
      const o = this.planForm.value;
      this.planService.updatePlan(this.plan.id,o);
    }
  }
}
