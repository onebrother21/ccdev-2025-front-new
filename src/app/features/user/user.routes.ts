import { Routes } from "@angular/router";
import { AuthGuard } from "@state";

export const UserRoutes: Routes = [
  {
    path:"",
    canActivate:[AuthGuard],
    loadComponent:() => import("./user-home").then(m => m.UserHomeComponent),
  }
];
