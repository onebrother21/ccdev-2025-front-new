import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "@shared";
import { TasksRoutes } from "./tasks.routes";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TasksRoutes),
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class TasksModule {}
