import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService, AuthUser, UserJson } from '@state';
import { filter, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  private subs$:Subscription[] = [];
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  user:UserJson|null = null;
  constructor(private app:AppStateService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.subs$.push(
      this.app.me$.pipe(tap(o => {
        this.user = o;
  })).subscribe()
    )
  }
}
