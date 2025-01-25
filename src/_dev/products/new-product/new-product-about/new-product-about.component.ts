import { Component,Input } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-new-product-about',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-product-about.component.html',
  styleUrl: './new-product-about.component.scss'
})

export class NewProductAboutComponent {
  @Input() title = "";
}
