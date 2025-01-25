import { Component } from '@angular/core';
import { SharedModule } from '@shared';
import { CouriersService } from '../couriers.service';
import { Router } from '@angular/router';
import { tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-courier',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './courier.component.html',
  styleUrl: './courier.component.scss'
})

export class CourierComponent {
  constructor(
    private router:Router,
    private couriersSvc:CouriersService
  ){}
  ngOnInit() {
    this.couriersSvc.couriers$.pipe(
      withLatestFrom(this.couriersSvc.selectedCourier$),
      tap(([couriers,courierId]) => {
        if(couriers.length){
          this.router.navigate(['/admin/couriers',{outlets:{primary:"list",aux:`${courierId||couriers[0].id}/tasks`}}]);
        }
    })).subscribe();
  }
}
