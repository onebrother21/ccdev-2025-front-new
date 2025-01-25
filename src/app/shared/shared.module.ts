import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { FooterComponent } from "./components/footer";
import { NavbarComponent } from "./components/navbar";
import { SidebarComponent } from "./components/sidebar";
import { AccordionComponent } from "./components/accordion";
import { ImageUploadComponent } from "./components/image-upload";
import { ModalComponent } from "./components/modal";
import { ProgressBarComponent } from "./components/progress-bar";
import { TableViewComponent } from "./components/table-view";
import { TimelineComponent } from "./components/timeline";

import { CapitalizePipe } from "./pipes";
import { RightSidebarWidgetComponent } from "./components/right-sidebar-widget";
import { ImageComponent } from "./components/image";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgbModule,
    DatePipe,
    CapitalizePipe,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AccordionComponent,
    ImageComponent,
    ImageUploadComponent,
    ModalComponent,
    ProgressBarComponent,
    TableViewComponent,
    TimelineComponent,
    RightSidebarWidgetComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgbModule,
    DatePipe,
    CapitalizePipe,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AccordionComponent,
    ImageComponent,
    ImageUploadComponent,
    ModalComponent,
    ProgressBarComponent,
    TableViewComponent,
    TimelineComponent,
    RightSidebarWidgetComponent,
  ]
})
export class SharedModule {}
