import { Component } from '@angular/core';
import { SharedModule } from '@shared';
import { UserEditorComponent } from '../user-editor';
import { UserProfileComponent } from '../user-profile';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [SharedModule,UserEditorComponent,UserProfileComponent,],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {

}
