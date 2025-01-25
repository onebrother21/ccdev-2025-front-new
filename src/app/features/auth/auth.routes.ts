import { Routes } from "@angular/router";

export const AuthRoutes: Routes = [
  {path:"",redirectTo: 'login', pathMatch:'full'},
  {
    path: 'login',
    loadComponent:() => import("./login").then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent:() => import("./register").then(m => m.RegisterComponent)
  },
  // Wildcard route for handling invalid URLs
  { path: '**', redirectTo: 'login' },
];
