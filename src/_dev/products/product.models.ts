// product.model.ts

import { Task } from "_dev/tasks/tasks.model";

export interface Product {
  id: string;                       // Unique product identifier
  customerId: string;               // ID of the customer placing the product
  items: ProductItem[];               // List of items in the product
  totalAmount: number;              // Total price of the product
  productStatus: ProductStatus;         // Current status of the product (e.g., Placed, Shipped, Delivered)
  productDate: Date;                  // Date when the product was placed
  scheduledDate: "asap"|Date;              // Estimated or actual delivery date
  deliveryDate?: Date;              // Estimated or actual delivery date
  deliveryAddress: Address|null;    // Address where the product will be delivered
  paymentStatus: PaymentStatus;     // Status of the payment (e.g., Paid, Pending, Failed)
  paymentMethod?: PaymentMethod;    // Payment method used (e.g., Credit Card, Mobile Wallet)
  notes?: string;                   // Optional notes or instructions from the customer
  description?: string;                    // Optional description of the product
  tasks:Task[];
}

export interface ProductItem {
  itemId: string;                   // Unique identifier for the item
  name: string;                     // Name of the item
  quantity: number;                 // Quantity of the item producted
  price: number;                    // Price per unit of the item
  total: number;                    // Total price for the item (quantity * price)
}

export interface Address {
  street: string;                   // Street address
  city: string;                     // City
  state: string;                    // State
  postalCode: string;               // Postal code
  country: string;                  // Country
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Unpaid';
export type ProductStatus = 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled'|"Pending";
export type PaymentMethod = 'Credit Card' | 'Debit Card' | 'Mobile Wallet' | 'Bank Transfer';
/*
export interface Product {
  id: string; // Unique identifier for the product
  name: string; // Product name
  description: string; // Detailed description of the product
  sku: string; // Stock Keeping Unit identifier
  concentration: string; // Product concentration (e.g., percentage, ratio)
  type: string; // Product type/category
  unitPrice: number; // Price per unit
  unitName: string; // Name of the unit (e.g., kg, liters)
  receivedOn: Date; // Date the product was received
  sellBy: Date; // Sell-by or expiration date
}
*/