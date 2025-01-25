import { Injectable } from '@angular/core';
import { environment as env } from '@env';
import { AppHttpService } from '@core';
import { IUserJson } from '@types';
//import { AppConfig,APP_CONFIG } from '../../../../environments/app-config';
declare var CCTXPlayground:any;

@Injectable({providedIn:'root'})

export class AuthenticationService {
  url = `${env.apiUrlLive}/auth`;
  constructor(private http:AppHttpService){}
  autologinUser = () => this.http.get<IUserJson>(`${this.url}/login`);
  loginUser = (o:{emailOrUsername:string;pin:string}) => this.http.post<IUserJson>(`${this.url}/login`,o);
  loginV2User = (o:{emailOrUsername:string;pin:string}) => this.http.post<IUserJson>(`${this.url}/login`,o);
  lookupUser(q:{email:string}){return this.http.post<{exists:boolean}>(`${this.url}/lookup`,q);}
  signupUser = (o:{email:string}) => this.http.post<IUserJson>(`${this.url}/signup`,o);
  verifyUser = (o:Record<"email"|"verification",string>) => this.http.post<IUserJson>(`${this.url}/verify`,o);
  registerUser = (o:Partial<IUserJson>) => this.http.post<IUserJson>(`${this.url}/register`,o);
  setUserPin = (o:{emailOrUsername:string;pin:string}) => this.http.post<IUserJson>(`${this.url}/set-pin`,o);
  signinUser = (o:{emailOrUsername:string;pin:string}) => this.http.post<IUserJson>(`${this.url}/signin`,o);
  signinAdminUser = (o:{emailOrUsername:string;pin:string}) => this.http.post<IUserJson>(`${this.url}/signin-admin`,o);
  updateUser = (o:{username:string;updates:Partial<IUserJson>}) => this.http.post<IUserJson>(`${this.url}/update`,o);
};

/*
  async loginByGoogle() {
      try {
        this.toastr.warning('Not implemented');

      } catch (error) {
          this.toastr.error(error.message);
      }
  }

  async registerByGoogle() {
      try {
        this.toastr.warning('Not implemented');

      } catch (error) {
          this.toastr.error(error.message);
      }
  }

  async loginByFacebook() {
      try {
        this.toastr.warning('Not implemented');

      } catch (error) {
          this.toastr.error(error.message);
      }
  }

  async registerByFacebook() {
      try {

          this.toastr.warning('Not implemented');
      } catch (error) {
          this.toastr.error(error.message);
      }
  }
*/