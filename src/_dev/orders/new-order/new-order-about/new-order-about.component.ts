import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapitalizePipe } from 'app/shared/pipes';

@Component({
  selector: 'app-new-order-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CapitalizePipe,
  ],
  templateUrl: './new-order-about.component.html',
  styleUrl: './new-order-about.component.scss'
})
export class NewOrderAboutComponent {
  @Input() title = "";
}
