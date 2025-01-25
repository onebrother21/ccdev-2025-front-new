import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from '../admins.service';
import { Admin } from '../admin.models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admin-editor.component.html',
  styleUrl: './admin-editor.component.scss'
})

export class AdminEditorComponent implements OnInit {
  adminForm!: FormGroup;
  adminId!: string;
  admin?: Admin;
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
  options = [{name:'SP'},{name:'LLC'},{name:'S-Corp'}];
  selectedCheck = -1;
  labels = ['User Details','Vehicle Details'];
  constructor(
    private route: ActivatedRoute,
    private adminsSvc: AdminsService,
    private fb: FormBuilder,
    private router:Router
  ){}
  ngOnInit(): void {
    this.adminId = this.route.snapshot.params['adminId'];
    this.adminsSvc.admins$.pipe(tap(o => {
      const admin = o.find((p) => p.id === this.adminId);
      if(admin){
        this.admin = admin;
        this.adminForm = this.fb.group({
          username: [admin.username || '', [Validators.required,Validators.minLength(5)]],
          licenseNo: [admin.license.idNo || '', [Validators.required,Validators.minLength(8),Validators.maxLength(10)]],
          licenseYr: [admin.license.yr || '', [Validators.required,Validators.minLength(4)]],
          licenseState: [admin.license.state || '', [Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
          vehicleMake: [admin.vehicle.make || '', [Validators.required]],
          vehicleModel: [admin.vehicle.model || '', [Validators.required]],
          vehicleYr: [admin.vehicle.yr || '', [Validators.required,Validators.minLength(4)]],
          vehiclePlateNo: [admin.vehicle.plateNo || '', [Validators.required,Validators.minLength(7),Validators.maxLength(7)]],
          origMileage: [admin.vehicle.origMileage || '', [Validators.required,Validators.minLength(2)]],
          description: [admin.description || '', [Validators.minLength(2)]],
        });
        //this.selectedCheck = this.options.findIndex(o => o.name === admin.type);
      }
    })).subscribe();
  }
  findInvalidControls() {
    const invalid = [];
    const controls = this.adminForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
  changeSelection(i:number) {
    this.selectedCheck = this.selectedCheck === i?-1:i;
    const value = this.selectedCheck > -1?this.options[this.selectedCheck].name:undefined;
    this.adminForm.get("type")?.patchValue(value);
  }
  updateAdmin(): void {
    if (this.adminForm.valid && this.admin) {
      const v = this.adminForm.value;
      this.adminsSvc.updateAdmin(this.admin.id,v);
      this.router.navigate(['/admin/admins',{outlets:{primary:"list",aux:`${this.adminId}/tasks`}}]);
    }
  }
}
