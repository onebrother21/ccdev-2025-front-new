import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input() config:Partial<{
    placeholder:string;
    alt:string;
    class:string;
    id:string
  }> = {
    placeholder:"assets/img/image_placeholder.jpg",
    alt:"Upload preview",
    class:"",
    id:""
  };
  @Input() imageSrc?:string = "";
}
