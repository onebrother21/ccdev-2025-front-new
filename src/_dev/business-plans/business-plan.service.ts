import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BusinessPlan,BusinessPlanSection } from './business-plan.models';

@Injectable({
  providedIn: 'root',
})
export class BusinessPlanService {
  private readonly LOCAL_STORAGE_KEY = 'ccdevBusinessPlans';
  private businessPlans: BusinessPlan[] = this.loadPlansFromLocalStorage();
  private plansSubject = new BehaviorSubject<BusinessPlan[]>(this.businessPlans);
  public plans$ = this.plansSubject.asObservable();

  constructor() {}

  // Create a new business plan
  createPlan(o: Partial<BusinessPlan>, owner: { id: string; name: string }): BusinessPlan {
    const { title, description, type, startDate } = o as BusinessPlan;
    const newPlan: BusinessPlan = {
      id: this.generateId(),
      title,
      description,
      type,
      startDate,
      sections: [],
      createdOn: new Date(),
      lastUpdated: new Date(),
      owner,
      status: 'draft',
      tags: [],
      goals: [],
    };
    this.businessPlans.push(newPlan);
    this.updatePlansSubject();
    console.log(newPlan);
    return newPlan;
  }

  // Update an existing business plan
  updatePlan(planId: string, updatedPlan: Partial<BusinessPlan>): boolean {
    const planIndex = this.businessPlans.findIndex((plan) => plan.id === planId);
    if (planIndex === -1) return false;

    this.businessPlans[planIndex] = {
      ...this.businessPlans[planIndex],
      ...updatedPlan,
      lastUpdated: new Date(),
    };
    this.updatePlansSubject();
    return true;
  }

  // Save a business plan
  savePlan(planId: string): boolean {
    const plan = this.businessPlans.find((plan) => plan.id === planId);
    if (!plan) return false;

    console.log(`Saving plan: ${JSON.stringify(plan)}`);
    this.savePlansToLocalStorage();
    return true; // Simulate saving to backend
  }

  // Delete a business plan
  deletePlan(planId: string): void {
    this.businessPlans = this.businessPlans.filter((plan) => plan.id !== planId);
    this.updatePlansSubject();
  }

  // Add a new section to a plan
  addSectionToPlan(planId: string): boolean {
    const plan = this.businessPlans.find((plan) => plan.id === planId);
    if (!plan) return false;

    const section: BusinessPlanSection = {
      id: this.generateId(),
      title: 'Untitled Section',
      content: [],
      htmlContent: '',
      params: {},
      metrics: {},
      createdOn: new Date(),
      lastUpdated: new Date(),
      tags: [],
    };
    plan.sections.push(section);
    plan.lastUpdated = new Date();
    this.updatePlansSubject();
    return true;
  }

  // Remove a section from a plan
  removeSectionFromPlan(planId: string, sectionId: string): boolean {
    const plan = this.businessPlans.find((plan) => plan.id === planId);
    if (!plan) return false;

    const sectionIndex = plan.sections.findIndex((section) => section.id === sectionId);
    if (sectionIndex === -1) return false;

    plan.sections.splice(sectionIndex, 1);
    plan.lastUpdated = new Date();
    this.updatePlansSubject();
    return true;
  }

  // Retrieve a specific section
  getSection(planId: string, sectionId: string): BusinessPlanSection | null {
    const plan = this.businessPlans.find((plan) => plan.id === planId);
    if (!plan) return null;

    return plan.sections.find((section) => section.id === sectionId) || null;
  }

  // Update a section
  updateSection(planId: string, sectionId: string, updatedSection: Partial<BusinessPlanSection>): boolean {
    const plan = this.businessPlans.find((plan) => plan.id === planId);
    if (!plan) return false;

    const sectionIndex = plan.sections.findIndex((section) => section.id === sectionId);
    if (sectionIndex === -1) return false;

    plan.sections[sectionIndex] = {
      ...plan.sections[sectionIndex],
      ...updatedSection,
      lastUpdated: new Date(),
    };

    plan.lastUpdated = new Date();
    this.updatePlansSubject();
    return true;
  }

  // Delete a section
  deleteSection(planId: string, sectionId: string): boolean {
    return this.removeSectionFromPlan(planId, sectionId);
  }

  // Utility to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load plans from local storage
  private loadPlansFromLocalStorage(): BusinessPlan[] {
    const storedPlans = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedPlans ? JSON.parse(storedPlans) : [];
  }

  // Save plans to local storage
  private savePlansToLocalStorage(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.businessPlans));
  }

  // Update the BehaviorSubject with the latest plans and save to local storage
  private updatePlansSubject(): void {
    this.plansSubject.next([...this.businessPlans]);
    this.savePlansToLocalStorage();
  }
}
