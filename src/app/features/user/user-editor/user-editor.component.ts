import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppStateService,User,UserJson } from '@state';
import { filter, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-editor.component.html',
  styleUrl: './user-editor.component.scss'
})

export class UserEditorComponent implements OnInit {
  private subs$:Subscription[] = [];
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  userForm!: FormGroup;
  userSubmitted = false;
  user:UserJson|null = null;
  resetForm(){
    this.userForm.reset();
    this.userSubmitted = false;
  }
  userImage:FormControl = new FormControl('');
  states = ["CA","CO","MI","WA"];
  constructor(private app:AppStateService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.subs$.push(
      this.app.me$.pipe(tap(o => {
        if(o){
          this.user = o;
          this.userForm = this.fb.group({
            firstname: [o.name.first, [Validators.required]],
            lastname: [o.name.last, [Validators.required]],
            username: [o.username, [Validators.required]],
            email: [o.email, [Validators.required,Validators.email]],
            //pin: ['', [Validators.required,Validators.minLength(3)]],
            state: [null, [Validators.required,Validators.minLength(2)]],
            title: [o.title],
            bio: [o.bio],
            img:[o.img || ""]
          });
          this.userForm.controls['firstname'].disable();
          this.userForm.controls['lastname'].disable();
        }
      })).subscribe()
    );
  }
  setImage(o:any){
    this.userImage.patchValue(o);
    this.app.updateUser({img:o});
  }
  submitUserUpdates(): void {
    if(this.userForm.valid) {
      const o = this.userForm.value;
      const data:Partial<User> = {
        email:o.email,
        username:o.username,
        title:o.title,
        bio:o.bio,
      }
      this.app.updateUser(data);
    }
  }
  findInvalidControls() {
    const invalid = [];
    const controls = this.userForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
