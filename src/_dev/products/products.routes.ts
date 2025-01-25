import { Routes } from "@angular/router";

export const ProductsRoutes: Routes = [
  {
    path:"",
    children:[
      { path: "",redirectTo: "list",pathMatch: "full"},
      { path:"new",loadComponent:() => import("./new-product").then(m => m.NewProductComponent)},
      { path:"list",loadComponent:() => import("./product-list").then(m => m.ProductListComponent)},
      { path:":productId",loadComponent:() => import("./product-editor").then(m => m.ProductEditorComponent)},
    ]
  },{
    path:"",
    outlet:"aux",
    loadComponent:() => import("./product").then(m => m.ProductComponent),
    children:[
      {
        path:":productId",
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
                loadComponent:() => import("./product-detail").then(m => m.ProductDetailComponent),
              },
            ]
          }
        ]
      }
    ]
  }
];