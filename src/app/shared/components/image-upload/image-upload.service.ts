import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare enum StorageKeys {
  TEMP_IMG = 'uploadedImage'
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imageSrcSubject = new BehaviorSubject<string>(this.getImageFromLocalStorage());
  public imageSrc$ = this.imageSrcSubject.asObservable();

  getImageFromLocalStorage(){return localStorage.getItem(StorageKeys.TEMP_IMG) || "";}
  private saveImageToLocalStorage(base64Image:string): void {
    localStorage.setItem(StorageKeys.TEMP_IMG,base64Image);
  }
  setImageSrc(src:string): void {
    this.saveImageToLocalStorage(src);
    this.imageSrcSubject.next(src);
  }
}