
import { Component } from "@angular/core";
import { SharedModule } from "@shared";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "black-dashboard-angular";
}