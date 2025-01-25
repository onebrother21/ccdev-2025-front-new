import { CommonModule } from "@angular/common";
import { Component, OnInit,Output,EventEmitter } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  @Output() trigger = new EventEmitter();
  constructor() {}
  ngOnInit() {}
}
