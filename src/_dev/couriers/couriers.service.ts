import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Courier } from './courier.models';
import { INITIAL_COURIERS } from './couriers.db';
import { CommonUtils } from '_commoncore/common';
import { Task } from '_dev/tasks/tasks.model';

enum Keynames { 
  COURIERS = 'ccdevCouriers',
  SELECTED_COURIER = 'ccdevSelectedCourier',
};

@Injectable({
  providedIn: 'root'
})
export class CouriersService {
  forceReset = true;
  private couriers: Courier[] = this.loadCouriersFromLocalStorage();
  private couriers_ = new BehaviorSubject<Courier[]>(this.couriers);
  public couriers$ = this.couriers_.asObservable();

  private selectedCourier = this.loadSelectedCourierFromLocalStorage();
  private selectedCourier_ = new BehaviorSubject<string|null>(null);
  public selectedCourier$ = this.selectedCourier_.asObservable();

  constructor() {}

  // Create a new courier
  createCourier(courierData:Partial<Courier>): Courier {
    const newCourier: Courier = {
      id:CommonUtils.longId(),
      pic:'assets/img/default-avatar.png',
      vehicle:{make:"",model:"",yr:1900,plateNo:"",origMileage:0},
      license:{idNo:"",state:"",yr:1900},
      createdOn:new Date(),
      updatedOn:new Date(),
      ...courierData
    } as Courier;
    this.couriers.push(newCourier);
    this.updateCouriersSubject();
    return newCourier;
  }

  // Update an existing courier
  updateCourier(courierId: string, updatedData: Partial<Courier>): boolean {
    const courierIndex = this.couriers.findIndex((courier) => courier.id === courierId);
    if (courierIndex === -1) return false;

    this.couriers[courierIndex] = {
      ...this.couriers[courierIndex],
      ...updatedData,
    };
    this.updateCouriersSubject();
    return true;
  }

  // Save couriers to local storage
  saveCouriers(): void {
    this.saveCouriersToLocalStorage();
  }
  selectCourier(courierId:string){
    this.selectedCourier = courierId;
    this.updateSelectedCourierSubject();
  }
  
  // Delete a courier
  deleteCourier(courierId: string): boolean {
    const initialLength = this.couriers.length;
    this.couriers = this.couriers.filter((courier) => courier.id !== courierId);
    if (this.couriers.length === initialLength) return false;
    this.updateCouriersSubject();
    return true;
  }

  // Utility to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load couriers from local storage
  private loadCouriersFromLocalStorage(): Courier[] {
    if(this.forceReset) return INITIAL_COURIERS;
    const storedCouriers = localStorage.getItem(Keynames.COURIERS);
    return storedCouriers ? JSON.parse(storedCouriers) : INITIAL_COURIERS;
  }
  // Save couriers to local storage
  private saveCouriersToLocalStorage(): void {localStorage.setItem(Keynames.COURIERS,JSON.stringify(this.couriers));}
  // Update the BehaviorSubject with the latest couriers and save to local storage
  private updateCouriersSubject(): void {
    this.couriers_.next([...this.couriers]);
    this.saveCouriersToLocalStorage();
  }

  private loadSelectedCourierFromLocalStorage():string|null {return localStorage.getItem(Keynames.SELECTED_COURIER) || null;}
  private saveSelectedCourierToLocalStorage(){localStorage.setItem(Keynames.SELECTED_COURIER,this.selectedCourier||"");}
  private updateSelectedCourierSubject(): void {
    this.selectedCourier_.next(this.selectedCourier);
    this.saveSelectedCourierToLocalStorage();
  }
}

