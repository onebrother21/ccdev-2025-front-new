import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BusinessPlanService } from '../business-plan.service';
import { BusinessPlanSection } from '../business-plan.models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-business-plan-section-detail',
  standalone: true,
  imports:[SharedModule],
  templateUrl: './business-plan-section-detail.component.html',
  styleUrls: ['./business-plan-section-detail.component.scss'],
})

export class BusinessPlanSectionDetailComponent implements OnInit {
  sectionForm!: FormGroup;
  sectionId!: string;
  planId!: string;
  section?: BusinessPlanSection;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private planService: BusinessPlanService
  ) {}

  ngOnInit(): void {
    // Extract IDs from route
    this.planId = this.route.snapshot.params['planId'];
    this.sectionId = this.route.snapshot.params['sectionId'];

    // Find the section
    this.planService.plans$.pipe(tap(o => {
      const plan = o.find((p) => p.id === this.planId);
      this.section = plan?.sections.find((s) => s.id === this.sectionId);// Initialize the form
      this.sectionForm = this.fb.group({
        title: [this.section?.title || '', [Validators.required, Validators.minLength(3)]],
        content: this.fb.array(this.section?.content.map((c) => this.fb.control(c)) || []),
        htmlContent: [this.section?.htmlContent || '', [Validators.required, Validators.minLength(10)]],
        params: this.fb.group(this.section?.params || {}),
        metrics: this.fb.group(this.section?.metrics || {}),
      });
    })).subscribe();
  }
  objectKeys = (o:any) => Object.keys(o);
  // Getters for dynamic controls
  get content(): FormArray<FormControl> {
    return this.sectionForm.get('content') as FormArray<FormControl>;
  }

  // Methods for adding and removing dynamic content fields
  addContent(): void {
    this.content.push(this.fb.control('', Validators.required));
  }

  removeContent(index: number): void {
    this.content.removeAt(index);
  }

  saveSection(): void {
    if (this.sectionForm.valid && this.section) {
      const updatedSection = { ...this.section, ...this.sectionForm.value };
      this.planService.updateSection(this.planId,this.section.id,updatedSection);
    }
  }

  deleteSection(): void {
    if (this.section) {
      const confirmDelete = confirm('Are you sure you want to delete this section?');
      if (confirmDelete) {
        this.planService.removeSectionFromPlan(this.planId, this.section.id);
      }
    }
  }
}
