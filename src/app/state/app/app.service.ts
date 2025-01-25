import { Injectable, inject } from '@angular/core';
import { environment as env } from '@env';
import { AppHttpService, AppLocalStorageService } from 'core';
import { AppEntity, CommonUtils } from "types";
import { of } from 'rxjs';
import { AppFeatureState } from './app.state';

@Injectable({providedIn:'root'})
export class AppService {
  url = `${env.apiUrl}/users`;
  local = inject(AppLocalStorageService);
  http = inject(AppHttpService);
}
