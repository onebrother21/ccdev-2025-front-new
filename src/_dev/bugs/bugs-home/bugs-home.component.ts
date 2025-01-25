import { Component } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-bugs-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bugs-home.component.html',
  styleUrl: './bugs-home.component.scss'
})

export class BugsHomeComponent {

}
