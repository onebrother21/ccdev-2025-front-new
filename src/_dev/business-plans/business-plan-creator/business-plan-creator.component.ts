import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { BusinessPlanService } from '../business-plan.service';
import { BusinessPlan } from '../business-plan.models';

@Component({
  selector: 'app-business-plan-creator',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './business-plan-creator.component.html',
  styleUrl: './business-plan-creator.component.scss'
})

export class BusinessPlanCreatorComponent implements OnInit {
  createPlanForm!: FormGroup;
  dateModel = new Date();
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
  constructor(private planService: BusinessPlanService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createPlanForm = this.fb.group({
      startDate: [new Date(), [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      type: ['', [Validators.required]],
    });
  }
  changeSelection(i:number) {
    this.selectedCheck = this.selectedCheck === i?-1:i;
    const value = this.selectedCheck > -1?this.options[this.selectedCheck].name:undefined;
    this.createPlanForm.get("type")?.patchValue(value);
  }
  createPlan(): void {
    if (this.createPlanForm.valid) {
      const o = this.createPlanForm.value;
      this.planService.createPlan(o,{ id: '1', name: 'Admin' });
      this.createPlanForm.reset();
      this.selectedCheck = -1;
    }
  }
}
