import { Component, OnInit } from "@angular/core";
import { SharedModule } from "@shared";
import { AppStateService,UserJson } from "@state";
import { Subscription, tap } from "rxjs";

@Component({
  selector: "app-admin-layout",
  standalone:true,
  imports: [SharedModule],
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})

export class AdminLayoutComponent implements OnInit {
  private subs$:Subscription[] = [];
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  public user:UserJson|null = null;
  public sidebarColor: string = "red";
  constructor(private app:AppStateService) {}
  ngOnInit() {
    this.subs$.push(
      this.app.me$.pipe(tap(o => this.user = o)).subscribe(),
    );
  }
  refreshApp(){this.app.refreshAppState();}
}
