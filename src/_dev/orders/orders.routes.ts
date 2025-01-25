import { Routes } from "@angular/router";

export const OrdersRoutes: Routes = [
  {
    path:"",
    children:[
      { path: "",redirectTo: "list",pathMatch: "full"},
      { path:"new",loadComponent:() => import("./new-order").then(m => m.NewOrderComponent)},
      { path:"list",loadComponent:() => import("./orders-list").then(m => m.OrdersListComponent)},
      { path:":orderId",loadComponent:() => import("./order-editor").then(m => m.OrderEditorComponent)},
    ]
  },{
    path:"",
    outlet:"aux",
    loadComponent:() => import("./order").then(m => m.OrderComponent),
    children:[
      {
        path:":orderId",
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
                loadComponent:() => import("./order-timeline").then(m => m.OrderTimelineComponent),
              },
            ]
          }
        ]
      }
    ]
  }
];