import { Component, Input } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-new-admin-about',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-admin-about.component.html',
  styleUrl: './new-admin-about.component.scss'
})
export class NewAdminAboutComponent {
  @Input() title = "";
}
