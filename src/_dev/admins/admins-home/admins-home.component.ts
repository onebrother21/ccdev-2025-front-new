import { Component } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-admins-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admins-home.component.html',
  styleUrl: './admins-home.component.scss'
})
export class AdminsHomeComponent {

}
