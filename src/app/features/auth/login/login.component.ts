import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from '@state';
import { filter, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private subs$:Subscription[] = [];
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  loginForm!: FormGroup;
  loginSubmitted = false;
  resetForm(){
    this.loginForm.reset();
    this.loginSubmitted = false;
  }

  constructor(private app:AppStateService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailOrUsername: ['', [Validators.required]],
      pin: ['', [Validators.required, Validators.minLength(4), Validators.minLength(4)]],
    });
    this.subs$.push(
      this.app.errorInAuth$.pipe(
        filter(() => this.loginSubmitted),
        tap(() => {
          console.log("Login Failure!");
          this.resetForm();
        })
      ).subscribe()
    );
  }
  submitLogin(): void {
    if(this.loginForm.valid) {
      const o = this.loginForm.value;
      this.loginSubmitted = true;
      this.app.loginUser(o);
    }
  }
}
