import { Routes } from "@angular/router";
import { AuthGuard } from "@state";

export const AdminRoutes: Routes = [
  {
    path:"",
    loadComponent:() => import("./dash").then(m => m.DashComponent),
  }
];
