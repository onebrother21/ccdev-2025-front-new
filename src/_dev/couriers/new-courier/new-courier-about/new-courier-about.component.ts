
import { Component, Input } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-new-courier-about',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-courier-about.component.html',
  styleUrl: './new-courier-about.component.scss'
})

export class NewCourierAboutComponent {
  @Input() title = "";
}
