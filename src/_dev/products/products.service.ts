import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.models';
import { INITIAL_PRODUCTS } from './products.db';
import { CommonUtils } from '@common';
import { Task } from '_dev/tasks/tasks.model';

enum Keynames { 
  PRODUCTS = 'ccdevProducts',
  SELECTED_PRODUCT = 'ccdevSelectedProduct',
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  forceReset = true;
  private products: Product[] = this.loadProductsFromLocalStorage();
  private products_ = new BehaviorSubject<Product[]>(this.products);
  public products$ = this.products_.asObservable();

  private selectedProduct = this.loadSelectedProductFromLocalStorage();
  private selectedProduct_ = new BehaviorSubject<string|null>(null);
  public selectedProduct$ = this.selectedProduct_.asObservable();

  constructor() {}

  // Create a new product
  createProduct(productData: Partial<Product>): Product {
    const newProduct: Product = {
      id:CommonUtils.longId(),
      customerId: productData.customerId || '',
      description: productData.description || '',
      productStatus:"Placed",
      productDate:new Date(),
      scheduledDate:"asap",
      paymentStatus:"Unpaid",
      deliveryAddress:productData.deliveryAddress || null,
      totalAmount:0,
      items:[],
      tasks:[]
    };
    this.products.push(newProduct);
    this.updateProductsSubject();
    return newProduct;
  }

  // Update an existing product
  updateProduct(productId: string, updatedData: Partial<Product>): boolean {
    const productIndex = this.products.findIndex((product) => product.id === productId);
    if (productIndex === -1) return false;

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedData,
    };
    this.updateProductsSubject();
    return true;
  }

  // Save products to local storage
  saveProducts(): void {
    this.saveProductsToLocalStorage();
  }
  selectProduct(productId:string){
    this.selectedProduct = productId;
    this.updateSelectedProductSubject();
  }
  
  // Delete a product
  deleteProduct(productId: string): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== productId);
    if (this.products.length === initialLength) return false;
    this.updateProductsSubject();
    return true;
  }
  // Add a new task to a product
  addTaskToProduct(productId:string): boolean {
    const product = this.products.find((product) => product.id === productId);
    if (!product) return false;
    const task: Task = {
      id: CommonUtils.longId(),
      title: 'Untitled Task',
      description:'Your content goes here',
      status:'new',
      createdOn: new Date(),
      lastUpdated:new Date(),
      tasks:[]
    };

    product.tasks.push(task);
    //product.lastUpdated = new Date();
    this.updateProductsSubject();
    return true;
  }

  // Remove a task from a product
  removeTaskFromProduct(productId: string, taskId: string): boolean {
    const product = this.products.find((product) => product.id === productId);
    if (!product) return false;

    const taskIndex = product.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return false;

    product.tasks.splice(taskIndex, 1);
    //product.lastUpdated = new Date();
    this.updateProductsSubject();
    return true;
  }

  // Retrieve a specific task
  getTask(productId:string,taskId:string): Product['tasks'][0] | null {
    const product = this.products.find((product) => product.id === productId);
    if (!product) return null;
    return product.tasks.find((task) => task.id === taskId) || null;
  }

  // Update a task
  updateTask(productId:string,taskId:string,updatedTask:Partial<Product['tasks'][0]>): boolean {
    const product = this.products.find((product) => product.id === productId);
    if (!product) return false;

    const taskIndex = product.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return false;

    product.tasks[taskIndex] = {
      ...product.tasks[taskIndex],
      ...updatedTask,
      lastUpdated: new Date(),
    };

    //product.lastUpdated = new Date();
    this.updateProductsSubject();
    return true;
  }

  // Delete a task
  deleteTask(productId: string, taskId: string): boolean {
    return this.removeTaskFromProduct(productId, taskId);
  }

  // Utility to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load products from local storage
  private loadProductsFromLocalStorage(): Product[] {
    if(this.forceReset) return INITIAL_PRODUCTS;
    const storedProducts = localStorage.getItem(Keynames.PRODUCTS);
    return storedProducts ? JSON.parse(storedProducts) : INITIAL_PRODUCTS;
  }
  // Save products to local storage
  private saveProductsToLocalStorage(): void {localStorage.setItem(Keynames.PRODUCTS,JSON.stringify(this.products));}
  // Update the BehaviorSubject with the latest products and save to local storage
  private updateProductsSubject(): void {
    this.products_.next([...this.products]);
    this.saveProductsToLocalStorage();
  }

  private loadSelectedProductFromLocalStorage():string|null {return localStorage.getItem(Keynames.SELECTED_PRODUCT) || null;}
  private saveSelectedProductToLocalStorage(){localStorage.setItem(Keynames.SELECTED_PRODUCT,this.selectedProduct||"");}
  private updateSelectedProductSubject(): void {
    this.selectedProduct_.next(this.selectedProduct);
    this.saveSelectedProductToLocalStorage();
  }
}

/*
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly LOCAL_STORAGE_KEY = 'ccdevProducts';
  private products: Product[] = this.loadProductsFromLocalStorage();
  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  // Observable to subscribe to products
  public products$ = this.productsSubject.asObservable();

  constructor() {}

  // Create a new product
  createProduct(productData: Partial<Product>): Product {
    const newProduct: Product = {
      id: this.generateId(),
      name: productData.name || '',
      description: productData.description || '',
      sku: productData.sku || '',
      concentration: productData.concentration || '',
      type: productData.type || '',
      unitPrice: productData.unitPrice || 0,
      unitName: productData.unitName || '',
      receivedOn: productData.receivedOn || new Date(),
      sellBy: productData.sellBy || new Date(),
    };
    this.products.push(newProduct);
    this.updateProductsSubject();
    return newProduct;
  }

  // Update an existing product
  updateProduct(productId: string, updatedData: Partial<Product>): boolean {
    const productIndex = this.products.findIndex((product) => product.id === productId);
    if (productIndex === -1) return false;

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedData,
    };
    this.updateProductsSubject();
    return true;
  }

  // Save products to local storage
  saveProducts(): void {
    this.saveProductsToLocalStorage();
  }

  // Delete a product
  deleteProduct(productId: string): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== productId);
    if (this.products.length === initialLength) return false;

    this.updateProductsSubject();
    return true;
  }

  // Utility to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load products from local storage
  private loadProductsFromLocalStorage(): Product[] {
    const storedProducts = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedProducts ? JSON.parse(storedProducts) : [];
  }

  // Save products to local storage
  private saveProductsToLocalStorage(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.products));
  }

  // Update the BehaviorSubject with the latest products and save to local storage
  private updateProductsSubject(): void {
    this.productsSubject.next([...this.products]);
    this.saveProductsToLocalStorage();
  }
}
*/
