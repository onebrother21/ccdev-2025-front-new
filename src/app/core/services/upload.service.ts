import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand,PutObjectCommandOutput, GetObjectCommand,GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';

type MockS3Config = {
  region:string;
  endpoint:string;
  credentials:{
    accessKeyId:string;
    secretAccessKey:string;
  }
};
enum StorageKeys {
  TEMP_IMGS = 'uploadedImages'
}

@Injectable({
  providedIn: 'root',
})
export class MockS3 {
  private uploadsKey = StorageKeys.TEMP_IMGS;
  private getImagesFromLocalStorage(){return JSON.parse(localStorage.getItem(this.uploadsKey) || "{}");}
  private saveImagesToLocalStorage(imgs:Record<string,string>): void {localStorage.setItem(this.uploadsKey,JSON.stringify(imgs));}
  private localImagesSubject = new BehaviorSubject<Record<string,string>>(this.getImagesFromLocalStorage());
  public localImages$ = this.localImagesSubject.asObservable();
  private config!:MockS3Config;
  setConfig(o:MockS3Config){this.config = o;}
  async sendV2(command:PutObjectCommand){
    return new Promise<string>(done => {
      const file = command.input.Body;
      const key = command.input.Key;
      if(key){
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string; // Update the displayed image
          const imgs = this.localImagesSubject.getValue();
          imgs[key] = result;
          this.saveImagesToLocalStorage(imgs);
          this.localImagesSubject.next(imgs);
          done(result);
        };
        if(file instanceof Blob) reader.readAsDataURL(file); // Convert file to data URL for preview
      }
    });
  }
  loadImg(key:string){
    const imgs = this.localImagesSubject.getValue();
    const url = imgs[key];
    console.log({key,url});
    return url;
  }
}

@Injectable({
  providedIn: 'root',
})
export class R2StorageService {
 private s3Client!:S3Client;
  private bucketName = 'my-app-images'; // Replace with your bucket name
  
  private currentImgSubject = new BehaviorSubject<string>("");
  public currentImg$ = this.currentImgSubject.asObservable();

  constructor(private mock:MockS3) {
    this.mock.setConfig({
      region: 'auto', // R2 uses a global region
      endpoint: 'https://<account-id>.r2.cloudflarestorage.com', // Replace with your R2 endpoint
      credentials: {
        accessKeyId: '<your-access-key>', // Replace with your Access Key
        secretAccessKey: '<your-secret-key>', // Replace with your Secret Key
      },
    });
  }

  async uploadImage(file: File): Promise<string> {
    const key = `images/${uuidv4()}-${file.name}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ContentType: file.type,
    });
    if(!this.s3Client){
      const imageSrc = await this.mock.sendV2(command);
      this.currentImgSubject.next(imageSrc);
    }
    else {
      this.s3Client.send(command);
    }
    return this.getImageUrl(key);
  }
  private getImageUrl(key: string){
    if(this.s3Client){
      const command = new GetObjectCommand({Bucket: this.bucketName,Key: key});
      const url = `https://<account-id>.r2.cloudflarestorage.com/${this.bucketName}/${key}`;
      return url; // Construct the URL
    }
    else {
      const url = this.mock.loadImg(key);
      return url;
    }
  }
}