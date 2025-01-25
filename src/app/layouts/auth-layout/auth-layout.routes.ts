import { Routes } from '@angular/router';
import { AuthRoutes } from '@features/auth/auth.routes';

export const AuthLayoutRoutes: Routes = [
  { path: "",children:[...AuthRoutes]},
];
