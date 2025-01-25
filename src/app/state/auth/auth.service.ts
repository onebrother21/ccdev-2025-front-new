import { Injectable } from '@angular/core';
import { environment as env } from '@env';
import { AppHttpService } from 'core';
import { AuthUser,AuthUserJson } from './auth.models';
//import { AppConfig,APP_CONFIG } from '../../../../environments/app-config';
declare var CCTXPlayground:any;

@Injectable({providedIn:'root'})

export class AuthenticationService {
  url = `${env.apiUrl}/auth`;
  constructor(private http:AppHttpService){}
  autologinUser = () => this.http.get<AuthUserJson>(`${this.url}/login`);
  loginUser = (o:Pick<AuthUser,"pin"> & {emailOrUsername:string}) => this.http.post<AuthUserJson>(`${this.url}/login`,o);
  loginV2User = (o:Pick<AuthUser,"username"|"pin">) => this.http.post<AuthUserJson>(`${this.url}/login`,o);
  lookupUser(q:{email:string}){return this.http.post<{exists:boolean}>(`${this.url}/lookup`,q);}
  signupUser = (o:{email:string}) => this.http.post<AuthUserJson>(`${this.url}/signup`,o);
  verifyUser = (o:Record<"email"|"verification",string>) => this.http.post<AuthUserJson>(`${this.url}/verify`,o);
  registerUser = (o:Partial<AuthUser>) => this.http.post<AuthUserJson>(`${this.url}/register`,o);
  setUserPin = (o:Pick<AuthUser,"username"|"pin">) => this.http.post<AuthUserJson>(`${this.url}/set-pin`,o);
  signinUser = (o:Pick<AuthUser,"email"|"username">) => this.http.post<AuthUserJson>(`${this.url}/signin`,o);
  signinAdminUser = (o:Pick<AuthUser,"username">) => this.http.post<AuthUserJson>(`${this.url}/signin-admin`,o);
  autoSigninUser(o:Partial<Pick<AuthUser,"username"|"email"|"token">>){return this.http.put<AuthUserJson>(`${this.url}/autosignin`,o);}
  updateUser = (o:{username:string;updates:Partial<AuthUser>}) => this.http.post<AuthUserJson>(`${this.url}/update`,o);
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