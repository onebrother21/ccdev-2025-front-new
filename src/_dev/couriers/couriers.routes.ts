import { Routes } from "@angular/router";

export const CouriersRoutes: Routes = [
  {
    path:"",
    children:[
      { path: "",redirectTo: "list",pathMatch: "full"},
      { path:"new",loadComponent:() => import("./new-courier").then(m => m.NewCourierComponent)},
      { path:"list",loadComponent:() => import("./courier-list").then(m => m.CourierListComponent)},
      { path:":courierId",loadComponent:() => import("./courier-editor").then(m => m.CourierEditorComponent)},
    ]
  },{
    path:"",
    outlet:"aux",
    loadComponent:() => import("./courier").then(m => m.CourierComponent),
    children:[
      {
        path:":courierId",
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
                loadComponent:() => import("./courier-detail").then(m => m.CourierDetailComponent),
              },
            ]
          }
        ]
      }
    ]
  }
];