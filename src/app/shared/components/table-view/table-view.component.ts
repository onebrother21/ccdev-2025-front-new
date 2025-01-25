import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgbProgressbar
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent {
  constructor(private router:Router){
    //this.router.navigateByUrl("(aux:/admin/dash/tasks)");
  }
}
