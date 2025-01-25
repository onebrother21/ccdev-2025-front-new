import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService, AuthUser } from '@state';
import { filter, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent  implements OnInit {
  private subs$:Subscription[] = [];
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  registerForm!: FormGroup;
  registerSubmitted = false;
  resetForm(){
    this.registerForm.reset();
    this.registerSubmitted = false;
  }
  dateInputConfig = Object.assign({},
    {
      showWeekNumbers: false,
      locale: 'en',
      containerClass:'theme-red',
      adaptivePosition: true,
      dateInputFormat : 'MM-DD-YYYY',
      selectFromOtherMonth:true,
    }
  );

  constructor(private app:AppStateService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      pin: ['', [Validators.required, Validators.minLength(3)]],
      //passwordConfirm: ['', [Validators.required, Validators.minLength(3)]],
      dob: [new Date(), [Validators.required]],
      agree: ['', [Validators.required]],
    });
    this.subs$.push(
      this.app.errorInAuth$.pipe(
        filter(() => this.registerSubmitted),
        tap(() => {
          console.log("Register Failure!");
          this.resetForm();
        })
      ).subscribe()
    );
  }
  submitRegistration(): void {
    if(this.registerForm.valid) {
      const o = this.registerForm.value;
      const data:Partial<AuthUser> = {
        name:{first:o.firstname,last:o.lastname},
        email:o.email,
        username:o.username,
        agree:o.agree,
        pin:o.pin,
        dob:o.dob
      }
      this.app.registerUser(data);
    }
  }
}