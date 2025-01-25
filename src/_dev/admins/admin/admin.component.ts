import { Component } from '@angular/core';
import { SharedModule } from '@shared';
import { Router } from '@angular/router';
import { AdminsService } from '../admins.service';
import { tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent {
  constructor(
    private router:Router,
    private adminsSvc:AdminsService
  ){}
  ngOnInit() {
    this.adminsSvc.admins$.pipe(
      withLatestFrom(this.adminsSvc.selectedAdmin$),
      tap(([admins,adminId]) => {
        if(admins.length){
          this.router.navigate(['/admin/admins',{outlets:{primary:"list",aux:`${adminId||admins[0].id}/tasks`}}]);
        }
    })).subscribe();
  }
}
