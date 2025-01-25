import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CouriersService } from '../couriers.service';
import { Courier } from '../courier.models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-courier-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './courier-editor.component.html',
  styleUrl: './courier-editor.component.scss'
})

export class CourierEditorComponent implements OnInit {
  courierForm!: FormGroup;
  courierId!: string;
  courier?: Courier;
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
    private couriersSvc: CouriersService,
    private fb: FormBuilder,
    private router:Router
  ){}
  ngOnInit(): void {
    this.courierId = this.route.snapshot.params['courierId'];
    this.couriersSvc.couriers$.pipe(tap(o => {
      const courier = o.find((p) => p.id === this.courierId);
      if(courier){
        this.courier = courier;
        this.courierForm = this.fb.group({
          username: [courier.username || '', [Validators.required,Validators.minLength(5)]],
          licenseNo: [courier.license.idNo || '', [Validators.required,Validators.minLength(8),Validators.maxLength(10)]],
          licenseYr: [courier.license.yr || '', [Validators.required,Validators.minLength(4)]],
          licenseState: [courier.license.state || '', [Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
          vehicleMake: [courier.vehicle.make || '', [Validators.required]],
          vehicleModel: [courier.vehicle.model || '', [Validators.required]],
          vehicleYr: [courier.vehicle.yr || '', [Validators.required,Validators.minLength(4)]],
          vehiclePlateNo: [courier.vehicle.plateNo || '', [Validators.required,Validators.minLength(7),Validators.maxLength(7)]],
          origMileage: [courier.vehicle.origMileage || '', [Validators.required,Validators.minLength(2)]],
          description: [courier.description || '', [Validators.minLength(2)]],
        });
        //this.selectedCheck = this.options.findIndex(o => o.name === courier.type);
      }
    })).subscribe();
  }
  findInvalidControls() {
    const invalid = [];
    const controls = this.courierForm.controls;
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
    this.courierForm.get("type")?.patchValue(value);
  }
  updateCourier(): void {
    if (this.courierForm.valid && this.courier) {
      const v = this.courierForm.value;
      this.couriersSvc.updateCourier(this.courier.id,v);
      this.router.navigate(['/admin/couriers',{outlets:{primary:"list",aux:`${this.courierId}/tasks`}}]);
    }
  }
}
