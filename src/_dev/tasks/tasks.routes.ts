import { Routes } from "@angular/router";

export const TasksRoutes: Routes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full"
  },
  {
    path:"list",
    loadComponent:() => import("./task-list").then(m => m.TaskListComponent),
  },
  {
    path:":taskId",
    loadComponent:() => import("./task-details").then(m => m.TaskDetailsComponent),
  }
];