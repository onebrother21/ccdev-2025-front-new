import { Component } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-products-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products-home.component.html',
  styleUrl: './products-home.component.scss'
})

export class ProductsHomeComponent {

}
