import { Inject, Injectable } from '@angular/core';
//import { AppConfig, APP_CONFIG } from '@config';
import { AppLocalStorageService } from './local-storage.service';
import { AppWindowService } from './window.service';
import CryptoJS from 'crypto-js';

@Injectable({providedIn: 'root'})
export class AppEncryptionService {
  constructor(
    //@Inject(APP_CONFIG) private config:AppConfig,
    private local:AppLocalStorageService,
    private win:AppWindowService
  ) { }
  jsonFormatter = {
    stringify: function(cipherParams:any){
      let ct,iv,s;
      ct = cipherParams.ciphertext.toString(CryptoJS.enc.Base64);
      if(cipherParams.iv) iv = cipherParams.iv.toString();
      if(cipherParams.salt) s = cipherParams.salt.toString();
      return iv+"\\"+ct+"\\"+s;
    },
    parse: function(jsonStr:string) {
      const [iv,ct,s] = jsonStr.split("\\");
      const cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(ct)});
      if(iv) cipherParams.iv = CryptoJS.enc.Hex.parse(iv);
      if(s) cipherParams.salt = CryptoJS.enc.Hex.parse(s);
      return cipherParams;
    }
  };
  encrypt(value:any) {
    const key = "adf8506e669e";//(this.config.app as any).ekey; // SECRET KEY FOR ENCRYPTION
    value = JSON.stringify(value);
    const options = {format:this.jsonFormatter,mode:CryptoJS.mode.CBC};
    const encrypted = CryptoJS.AES.encrypt(value,key,options).toString();
    return encrypted;
  }
  decrypt(value:any) {
    const key = "adf8506e669e";//(this.config.app as any).ekey; // SECRET KEY FOR ENCRYPTION
    const options = {format:this.jsonFormatter};
    const decrypted = CryptoJS.AES.decrypt(value,key,options).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }
}