import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    Route,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { AppStateService } from '../app-state.service';
import {Observable, map, take, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild {
    constructor(
      private router: Router,
      private app: AppStateService) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      return this.app.authed$.pipe(
        take(1),
        //tap(o => console.log("no auth req",!o)),
        map(o => !o)
      )
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }
}
