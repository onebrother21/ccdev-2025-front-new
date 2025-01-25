import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from './orders.model';
import { INITIAL_ORDERS } from './orders.db';
import { CommonUtils } from '_commoncore/common';
import { Task } from '_dev/tasks/tasks.model';

enum Keynames { 
  ORDERS = 'ccdevOrders',
  SELECTED_ORDER = 'ccdevSelectedOrder',
};

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  forceReset = true;
  private orders: Order[] = this.loadOrdersFromLocalStorage();
  private orders_ = new BehaviorSubject<Order[]>(this.orders);
  public orders$ = this.orders_.asObservable();

  private selectedOrder = this.loadSelectedOrderFromLocalStorage();
  private selectedOrder_ = new BehaviorSubject<string|null>(null);
  public selectedOrder$ = this.selectedOrder_.asObservable();

  constructor() {}

  // Create a new order
  createOrder(orderData: Partial<Order>): Order {
    const newOrder: Order = {
      id:CommonUtils.longId(),
      customerId: orderData.customerId || '',
      description: orderData.description || '',
      orderStatus:"Placed",
      orderDate:new Date(),
      scheduledDate:"asap",
      paymentStatus:"Unpaid",
      deliveryAddress:orderData.deliveryAddress || null,
      totalAmount:0,
      items:[],
      tasks:[]
    };
    this.orders.push(newOrder);
    this.updateOrdersSubject();
    return newOrder;
  }

  // Update an existing order
  updateOrder(orderId: string, updatedData: Partial<Order>): boolean {
    const orderIndex = this.orders.findIndex((order) => order.id === orderId);
    if (orderIndex === -1) return false;

    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      ...updatedData,
    };
    this.updateOrdersSubject();
    return true;
  }

  // Save orders to local storage
  saveOrders(): void {
    this.saveOrdersToLocalStorage();
  }
  selectOrder(orderId:string){
    this.selectedOrder = orderId;
    this.updateSelectedOrderSubject();
  }
  
  // Delete a order
  deleteOrder(orderId: string): boolean {
    const initialLength = this.orders.length;
    this.orders = this.orders.filter((order) => order.id !== orderId);
    if (this.orders.length === initialLength) return false;
    this.updateOrdersSubject();
    return true;
  }
  // Add a new task to a order
  addTaskToOrder(orderId:string): boolean {
    const order = this.orders.find((order) => order.id === orderId);
    if (!order) return false;
    const task: Task = {
      id: CommonUtils.longId(),
      title: 'Untitled Task',
      description:'Your content goes here',
      status:'new',
      createdOn: new Date(),
      lastUpdated:new Date(),
      tasks:[]
    };

    order.tasks.push(task);
    //order.lastUpdated = new Date();
    this.updateOrdersSubject();
    return true;
  }

  // Remove a task from a order
  removeTaskFromOrder(orderId: string, taskId: string): boolean {
    const order = this.orders.find((order) => order.id === orderId);
    if (!order) return false;

    const taskIndex = order.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return false;

    order.tasks.splice(taskIndex, 1);
    //order.lastUpdated = new Date();
    this.updateOrdersSubject();
    return true;
  }

  // Retrieve a specific task
  getTask(orderId:string,taskId:string): Order['tasks'][0] | null {
    const order = this.orders.find((order) => order.id === orderId);
    if (!order) return null;
    return order.tasks.find((task) => task.id === taskId) || null;
  }

  // Update a task
  updateTask(orderId:string,taskId:string,updatedTask:Partial<Order['tasks'][0]>): boolean {
    const order = this.orders.find((order) => order.id === orderId);
    if (!order) return false;

    const taskIndex = order.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return false;

    order.tasks[taskIndex] = {
      ...order.tasks[taskIndex],
      ...updatedTask,
      lastUpdated: new Date(),
    };

    //order.lastUpdated = new Date();
    this.updateOrdersSubject();
    return true;
  }

  // Delete a task
  deleteTask(orderId: string, taskId: string): boolean {
    return this.removeTaskFromOrder(orderId, taskId);
  }

  // Utility to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load orders from local storage
  private loadOrdersFromLocalStorage(): Order[] {
    if(this.forceReset) return INITIAL_ORDERS;
    const storedOrders = localStorage.getItem(Keynames.ORDERS);
    return storedOrders ? JSON.parse(storedOrders) : INITIAL_ORDERS;
  }
  // Save orders to local storage
  private saveOrdersToLocalStorage(): void {localStorage.setItem(Keynames.ORDERS,JSON.stringify(this.orders));}
  // Update the BehaviorSubject with the latest orders and save to local storage
  private updateOrdersSubject(): void {
    this.orders_.next([...this.orders]);
    this.saveOrdersToLocalStorage();
  }

  private loadSelectedOrderFromLocalStorage():string|null {return localStorage.getItem(Keynames.SELECTED_ORDER) || null;}
  private saveSelectedOrderToLocalStorage(){localStorage.setItem(Keynames.SELECTED_ORDER,this.selectedOrder||"");}
  private updateSelectedOrderSubject(): void {
    this.selectedOrder_.next(this.selectedOrder);
    this.saveSelectedOrderToLocalStorage();
  }
}

