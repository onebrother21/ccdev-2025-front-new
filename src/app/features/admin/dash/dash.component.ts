import { Component,OnInit } from "@angular/core";
import { SharedModule } from "@shared";
import { AppWindowService } from "core";
import { DashMenuComponent } from "../dash-menu";

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [SharedModule,DashMenuComponent],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit {
  constructor(private win:AppWindowService) {}

  ngOnInit() {
    if(!this.win.get()) return;
  }
}

