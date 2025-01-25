import { Routes } from "@angular/router";

export const AdminsRoutes: Routes = [
  {
    path:"",
    children:[
      { path: "",redirectTo: "list",pathMatch: "full"},
      { path:"new",loadComponent:() => import("./new-admin").then(m => m.NewAdminComponent)},
      { path:"list",loadComponent:() => import("./admin-list").then(m => m.AdminListComponent)},
      { path:":adminId",loadComponent:() => import("./admin-editor").then(m => m.AdminEditorComponent)},
    ]
  },{
    path:"",
    outlet:"aux",
    loadComponent:() => import("./admin").then(m => m.AdminComponent),
    children:[
      {
        path:":adminId",
        children:[
          {
            path:"tasks",
            children:[
              {
                path: "",
                redirectTo: "list",
                pathMatch: "full"
              },
              {
                path:"list",
                loadComponent:() => import("./admin-detail").then(m => m.AdminDetailComponent),
              },
            ]
          }
        ]
      }
    ]
  }
];