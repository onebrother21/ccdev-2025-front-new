import { Routes } from "@angular/router";
import { AdminLayoutRoutes } from "./layouts/admin-layout";
import { AuthLayoutRoutes } from "./layouts/auth-layout";
import { DashboardComponent } from "app/pages/dashboard/dashboard.component";
import { AuthGuard, NoAuthGuard } from "@state";

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo:"admin",
    pathMatch:"full",
  },{
    path: "admin",
    canActivate:[AuthGuard],
    loadComponent: () => import("./layouts/admin-layout").then(m => m.AdminLayoutComponent),
    children: [...AdminLayoutRoutes],
  },{
    path: "abc123",
    canActivate:[NoAuthGuard],
    loadComponent: () => import ("./layouts/auth-layout").then(m => m.AuthLayoutComponent),
    children: [...AuthLayoutRoutes],
  },
  { path: "dashboard", component: DashboardComponent },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];