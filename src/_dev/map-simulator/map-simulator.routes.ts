import { Routes } from "@angular/router";

export const MapSimulatorRoutes: Routes = [
  {
    path:"",
    loadComponent:() => import("./map-simulator").then(m => m.MapSimulatorComponent),
  }
];
