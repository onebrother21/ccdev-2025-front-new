import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Shop } from './shop.model';
import { Product } from './product.models';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private readonly LOCAL_STORAGE_KEY = 'ccdevShops';
  private shops: Shop[] = this.loadShopsFromLocalStorage();
  private shopsSubject = new BehaviorSubject<Shop[]>(this.shops);

  // Observable to subscribe to shops
  public shops$ = this.shopsSubject.asObservable();

  constructor() {}

  // Create a new shop
  createShop(shopData: Partial<Shop>): Shop {
    const newShop: Shop = {
      id: this.generateId(),
      name: shopData.name || '',
      address: shopData.address || '',
      phone: shopData.phone || '',
      inventory: shopData.inventory || [],
    };
    this.shops.push(newShop);
    this.updateShopsSubject();
    return newShop;
  }

  // Update an existing shop
  updateShop(shopId: string, updatedData: Partial<Shop>): boolean {
    const shopIndex = this.shops.findIndex((shop) => shop.id === shopId);
    if (shopIndex === -1) return false;

    this.shops[shopIndex] = {
      ...this.shops[shopIndex],
      ...updatedData,
    };
    this.updateShopsSubject();
    return true;
  }

  // Save shops to local storage
  saveShops(): void {
    this.saveShopsToLocalStorage();
  }

  // Delete a shop
  deleteShop(shopId: string): boolean {
    const initialLength = this.shops.length;
    this.shops = this.shops.filter((shop) => shop.id !== shopId);
    if (this.shops.length === initialLength) return false;

    this.updateShopsSubject();
    return true;
  }

  // Add a product to a shop's inventory
  addProductToInventory(shopId: string, product: Product, amount: number): boolean {
    const shop = this.shops.find((shop) => shop.id === shopId);
    if (!shop) return false;

    const inventoryItem = shop.inventory.find((item) => item.product.id === product.id);
    if (inventoryItem) {
      inventoryItem.amount += amount;
    } else {
      shop.inventory.push({ product, amount });
    }

    this.updateShopsSubject();
    return true;
  }

  // Remove a product from a shop's inventory
  removeProductFromInventory(shopId: string, productId: string, amount: number): boolean {
    const shop = this.shops.find((shop) => shop.id === shopId);
    if (!shop) return false;

    const inventoryItem = shop.inventory.find((item) => item.product.id === productId);
    if (!inventoryItem) return false;

    if (inventoryItem.amount <= amount) {
      shop.inventory = shop.inventory.filter((item) => item.product.id !== productId);
    } else {
      inventoryItem.amount -= amount;
    }

    this.updateShopsSubject();
    return true;
  }

  // Utility to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load shops from local storage
  private loadShopsFromLocalStorage(): Shop[] {
    const storedShops = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedShops ? JSON.parse(storedShops) : [];
  }

  // Save shops to local storage
  private saveShopsToLocalStorage(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.shops));
  }

  // Update the BehaviorSubject with the latest shops and save to local storage
  private updateShopsSubject(): void {
    this.shopsSubject.next([...this.shops]);
    this.saveShopsToLocalStorage();
  }
}