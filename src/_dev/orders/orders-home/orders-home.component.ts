import { Component } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-orders-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './orders-home.component.html',
  styleUrl: './orders-home.component.scss'
})

export class OrdersHomeComponent {

}
