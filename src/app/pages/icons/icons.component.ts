import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-icons",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
