// order.model.ts

import { Task } from "_dev/tasks/tasks.model";

export interface Order {
  id: string;                       // Unique order identifier
  customerId: string;               // ID of the customer placing the order
  items: OrderItem[];               // List of items in the order
  totalAmount: number;              // Total price of the order
  orderStatus: OrderStatus;         // Current status of the order (e.g., Placed, Shipped, Delivered)
  orderDate: Date;                  // Date when the order was placed
  scheduledDate: "asap"|Date;              // Estimated or actual delivery date
  deliveryDate?: Date;              // Estimated or actual delivery date
  deliveryAddress: Address|null;    // Address where the order will be delivered
  paymentStatus: PaymentStatus;     // Status of the payment (e.g., Paid, Pending, Failed)
  paymentMethod?: PaymentMethod;    // Payment method used (e.g., Credit Card, Mobile Wallet)
  notes?: string;                   // Optional notes or instructions from the customer
  description?: string;                    // Optional description of the order
  tasks:Task[];
}

export interface OrderItem {
  itemId: string;                   // Unique identifier for the item
  name: string;                     // Name of the item
  quantity: number;                 // Quantity of the item ordered
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
export type OrderStatus = 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled'|"Pending";
export type PaymentMethod = 'Credit Card' | 'Debit Card' | 'Mobile Wallet' | 'Bank Transfer';
