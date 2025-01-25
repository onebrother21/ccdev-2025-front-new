import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageModule, Storage, uploadBytes,ref } from '@angular/fire/storage';
import { Observable,tap } from 'rxjs';
import { R2StorageService } from 'core';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ImageComponent
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
  @Input() imageUrl?:string = "";
  @Output() setImage:EventEmitter<any> = new EventEmitter();

  constructor(private r2StorageService: R2StorageService) {}
  async onFileSelected(event: Event):Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const key = await this.r2StorageService.uploadImage(file);
      this.setImage.emit(key);
    }
  }
  triggerFileUpload(fileInput:HTMLInputElement):void {
    fileInput.click(); // Programmatically trigger file input click
  }
}