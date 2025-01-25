import { Component } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-couriers-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './couriers-home.component.html',
  styleUrl: './couriers-home.component.scss'
})

export class CouriersHomeComponent {

}
