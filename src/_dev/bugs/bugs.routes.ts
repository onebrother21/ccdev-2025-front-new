import { Routes } from "@angular/router";

export const BugsRoutes: Routes = [
  {
    path:"",
    children:[
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full"
      },{
        path:"list",
        loadComponent:() => import("./bugs-list").then(m => m.BugsListComponent),
      },{
        path:":bugId",
        loadComponent:() => import("./bug-editor").then(m => m.BugEditorComponent),
      }
    ]
  },{
    path:"",
    outlet:"aux",
    loadComponent:() => import("./bug").then(m => m.BugComponent),
    children:[
      {
        path:":bugId",
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
                loadComponent:() => import("./bug-task-list").then(m => m.BugTaskListComponent),
              },
              {
                path:":taskId",
                loadComponent:() => import("./bug-task-details").then(m => m.BugTaskDetailsComponent),
              }
            ]
          }
        ]
      }
    ]
  }
];