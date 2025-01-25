import { Component } from '@angular/core';
import { SharedModule } from '@shared';
import { AppStateService } from '@state';

@Component({
  selector: 'app-auth-layout',
  standalone:true,
  imports: [SharedModule],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  constructor(private app:AppStateService) {}
  ngOnInit(){console.log("auth feature")}
  refreshApp(){this.app.refreshAppState();}
}
