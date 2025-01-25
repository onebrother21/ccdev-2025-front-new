import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Admin } from './admin.models';
import { INITIAL_ADMINS } from './admins.db';
import { CommonUtils } from '@common';
import { Task } from '_dev/tasks/tasks.model';

enum Keynames { 
  ADMINS = 'ccdevAdmins',
  SELECTED_ADMIN = 'ccdevSelectedAdmin',
};

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  forceReset = true;
  private admins: Admin[] = this.loadAdminsFromLocalStorage();
  private admins_ = new BehaviorSubject<Admin[]>(this.admins);
  public admins$ = this.admins_.asObservable();

  private selectedAdmin = this.loadSelectedAdminFromLocalStorage();
  private selectedAdmin_ = new BehaviorSubject<string|null>(null);
  public selectedAdmin$ = this.selectedAdmin_.asObservable();

  constructor() {}

  // Create a new admin
  createAdmin(adminData: Partial<Admin>): Admin {
    const newAdmin: Admin = {
      id:CommonUtils.longId(),
      displayName:"",
      email:"" adminData.description || '',
      adminStatus:"Placed",
      adminDate:new Date(),
      scheduledDate:"asap",
      paymentStatus:"Unpaid",
      deliveryAddress:adminData.deliveryAddress || null,
      totalAmount:0,
      items:[],
      tasks:[]
    };
    this.admins.push(newAdmin);
    this.updateAdminsSubject();
    return newAdmin;
  }

  // Update an existing admin
  updateAdmin(adminId: string, updatedData: Partial<Admin>): boolean {
    const adminIndex = this.admins.findIndex((admin) => admin.id === adminId);
    if (adminIndex === -1) return false;

    this.admins[adminIndex] = {
      ...this.admins[adminIndex],
      ...updatedData,
    };
    this.updateAdminsSubject();
    return true;
  }

  // Save admins to local storage
  saveAdmins(): void {
    this.saveAdminsToLocalStorage();
  }
  selectAdmin(adminId:string){
    this.selectedAdmin = adminId;
    this.updateSelectedAdminSubject();
  }
  
  // Delete a admin
  deleteAdmin(adminId: string): boolean {
    const initialLength = this.admins.length;
    this.admins = this.admins.filter((admin) => admin.id !== adminId);
    if (this.admins.length === initialLength) return false;
    this.updateAdminsSubject();
    return true;
  }
  // Add a new task to a admin
  addTaskToAdmin(adminId:string): boolean {
    const admin = this.admins.find((admin) => admin.id === adminId);
    if (!admin) return false;
    const task: Task = {
      id: CommonUtils.longId(),
      title: 'Untitled Task',
      description:'Your content goes here',
      status:'new',
      createdOn: new Date(),
      lastUpdated:new Date(),
      tasks:[]
    };

    admin.tasks.push(task);
    //admin.lastUpdated = new Date();
    this.updateAdminsSubject();
    return true;
  }

  // Remove a task from a admin
  removeTaskFromAdmin(adminId: string, taskId: string): boolean {
    const admin = this.admins.find((admin) => admin.id === adminId);
    if (!admin) return false;

    const taskIndex = admin.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return false;

    admin.tasks.splice(taskIndex, 1);
    //admin.lastUpdated = new Date();
    this.updateAdminsSubject();
    return true;
  }

  // Retrieve a specific task
  getTask(adminId:string,taskId:string): Admin['tasks'][0] | null {
    const admin = this.admins.find((admin) => admin.id === adminId);
    if (!admin) return null;
    return admin.tasks.find((task) => task.id === taskId) || null;
  }

  // Update a task
  updateTask(adminId:string,taskId:string,updatedTask:Partial<Admin['tasks'][0]>): boolean {
    const admin = this.admins.find((admin) => admin.id === adminId);
    if (!admin) return false;

    const taskIndex = admin.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return false;

    admin.tasks[taskIndex] = {
      ...admin.tasks[taskIndex],
      ...updatedTask,
      lastUpdated: new Date(),
    };

    //admin.lastUpdated = new Date();
    this.updateAdminsSubject();
    return true;
  }

  // Delete a task
  deleteTask(adminId: string, taskId: string): boolean {
    return this.removeTaskFromAdmin(adminId, taskId);
  }

  // Utility to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load admins from local storage
  private loadAdminsFromLocalStorage(): Admin[] {
    if(this.forceReset) return INITIAL_ADMINS;
    const storedAdmins = localStorage.getItem(Keynames.ADMINS);
    return storedAdmins ? JSON.parse(storedAdmins) : INITIAL_ADMINS;
  }
  // Save admins to local storage
  private saveAdminsToLocalStorage(): void {localStorage.setItem(Keynames.ADMINS,JSON.stringify(this.admins));}
  // Update the BehaviorSubject with the latest admins and save to local storage
  private updateAdminsSubject(): void {
    this.admins_.next([...this.admins]);
    this.saveAdminsToLocalStorage();
  }

  private loadSelectedAdminFromLocalStorage():string|null {return localStorage.getItem(Keynames.SELECTED_ADMIN) || null;}
  private saveSelectedAdminToLocalStorage(){localStorage.setItem(Keynames.SELECTED_ADMIN,this.selectedAdmin||"");}
  private updateSelectedAdminSubject(): void {
    this.selectedAdmin_.next(this.selectedAdmin);
    this.saveSelectedAdminToLocalStorage();
  }
}

