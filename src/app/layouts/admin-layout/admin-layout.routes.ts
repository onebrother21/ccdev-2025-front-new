import { Routes } from "@angular/router";

import { AdminRoutes as DashRoutes } from "@features/admin";
import { UserRoutes } from "@features/user";
/*
import { BusinessPlanningRoutes } from "@features/business-plans";
import { MapSimulatorRoutes } from "@features/map-simulator";
import { BugsRoutes } from "@features/bugs";
import { TasksRoutes } from "@features/tasks";
import { OrdersRoutes } from "@features/orders";
import { AdminsRoutes } from "@features/admins";
import { CouriersRoutes } from "@features/couriers";
import { ProductsRoutes } from "@features/products";
*/

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    redirectTo: "dash",
    pathMatch: "full"
  },
  { path: "dash",children:[...DashRoutes]},
  { path: "user",children:[...UserRoutes]},
  /*
  { path: "business",children:[...BusinessPlanningRoutes]},
  {
    path: "tasks",
    loadComponent:() => import("../../features/tasks/tasks").then(m => m.TasksComponent),
    children:[...TasksRoutes]
  },
  {
    path: "bugs",
    loadComponent:() => import("../../features/bugs/bugs-home").then(m => m.BugsHomeComponent),
    children:[...BugsRoutes]
  },{
    path: "admins",
    loadComponent:() => import("../../features/admins/admins-home").then(m => m.AdminsHomeComponent),
    children:[...AdminsRoutes]
  },{
    path: "couriers",
    loadComponent:() => import("../../features/couriers/couriers-home").then(m => m.CouriersHomeComponent),
    children:[...CouriersRoutes]
  },{
    path: "products",
    loadComponent:() => import("../../features/products/products-home").then(m => m.ProductsHomeComponent),
    children:[...ProductsRoutes]
  },{
    path: "orders",
    loadComponent:() => import("../../features/orders/orders-home").then(m => m.OrdersHomeComponent),
    children:[...OrdersRoutes]
  },
  { path: "map-sim",children:[...MapSimulatorRoutes]},
  /*
  { path: "tasks",children:[...TasksRoutes]},
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
  */
];
