import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-business-plan-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './business-plan-home.component.html',
  styleUrl: './business-plan-home.component.scss'
})

export class BusinessPlanHomeComponent implements OnInit {
  ngOnInit() {
    console.log("business plan feature active")
  }
}
