import { Component } from '@angular/core';
import { SharedModule } from '@shared';
import { Router } from '@angular/router';
import { BugsService } from '../bugs.service';
import { tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-bug',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './bug.component.html',
  styleUrl: './bug.component.scss'
})

export class BugComponent {
  constructor(
    private router:Router,
    private bugsSvc:BugsService
  ){}
  ngOnInit() {
    this.bugsSvc.bugs$.pipe(
      withLatestFrom(this.bugsSvc.selectedBug$),
      tap(([bugs,bugId]) => {
        if(bugs.length){
          this.router.navigate(['/admin/bugs',{outlets:{primary:"list",aux:`${bugId||bugs[0].id}/tasks`}}]);
        }
    })).subscribe();
  }
}
