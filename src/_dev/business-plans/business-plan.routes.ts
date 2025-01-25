import { Routes } from "@angular/router";

export const BusinessPlanningRoutes: Routes = [
  {
    path:"",
    loadComponent:() => import("./business-plan-home").then(m => m.BusinessPlanHomeComponent),
    children:[
      {path:"",redirectTo: 'plans', pathMatch:'full'},
      // Main route for viewing all business plans
      {
        path: 'plans',
        loadComponent:() => import("./business-plan-list").then(m => m.BusinessPlanListComponent)
      },
      // Route for viewing a specific business plan
      {
        path: 'plans/:planId',
        loadComponent:() => import("./business-plan-detail").then(m => m.BusinessPlanDetailComponent)
      },
      // Route for viewing/editing a specific section of a business plan
      {
        path: 'plans/:planId/sections/:sectionId',
        loadComponent:() => import("./business-plan-section-detail").then(m => m.BusinessPlanSectionDetailComponent)
      },
      // Wildcard route for handling invalid URLs
      { path: '**', redirectTo: 'plans' },
    ]
  }
];
