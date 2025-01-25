import { Component } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

}
