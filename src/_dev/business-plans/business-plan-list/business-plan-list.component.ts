import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { tap } from 'rxjs';
import { BusinessPlanService } from '../business-plan.service';
import { BusinessPlan } from '../business-plan.models';
import { BusinessPlanCreatorComponent } from '../business-plan-creator';

@Component({
  selector: 'app-business-plan-list',
  standalone: true,
  imports:[SharedModule,BusinessPlanCreatorComponent],
  templateUrl: './business-plan-list.component.html',
  styleUrls: ['./business-plan-list.component.scss'],
})

export class BusinessPlanListComponent implements OnInit {
  businessPlans: BusinessPlan[] = [];
  constructor(private planService: BusinessPlanService) {}
  ngOnInit(): void {
    this.planService.plans$.pipe(tap(plans => this.businessPlans = plans)).subscribe();
  }
  deletePlan(planId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this plan?');
    if (confirmDelete) {
      this.planService.deletePlan(planId);
    }
  }
}
