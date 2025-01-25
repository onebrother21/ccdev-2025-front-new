import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { ActivatedRoute } from '@angular/router';
import { BusinessPlanService } from '../business-plan.service';
import { BusinessPlan } from '../business-plan.models';
import { tap } from 'rxjs';
import { BusinessPlanEditorComponent } from '../business-plan-editor';

@Component({
  selector: 'app-business-plan-detail',
  standalone: true,
  imports:[SharedModule,BusinessPlanEditorComponent],
  templateUrl: './business-plan-detail.component.html',
  styleUrls: ['./business-plan-detail.component.scss'],
})

export class BusinessPlanDetailComponent implements OnInit {
  planId!: string;
  plan?: BusinessPlan;
  activeTab = 0;
  constructor(private route: ActivatedRoute, private planService: BusinessPlanService) {}
  ngOnInit(): void {
    this.planId = this.route.snapshot.params['planId'];
    this.planService.plans$.pipe(tap(o => {
      this.plan = o.find((p) => p.id === this.planId);
    })).subscribe();
  }
  addSection(): void {
    if (this.plan) {
      this.planService.addSectionToPlan(this.plan.id);
    }
  }
  deleteSection(sectionId: string): void {
    if (this.plan) {
      this.planService.removeSectionFromPlan(this.plan.id, sectionId);
    }
  }
}
