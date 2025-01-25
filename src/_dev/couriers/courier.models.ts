// courier.model.ts
import { User } from "../../app/features/user";

export type Vehicle = {
  make:string;
  model:string;
  yr:string|number;
  plateNo:string;
  origMileage:number;
};
export type LicenseData = {
  idNo:string;
  state:string;
  yr:string|number;
};
export interface Courier {
  id:string;                  // Unique courier identifier
  username:string;
  name:{first:string;last:string;};
  dob:Date;
  pic:string;
  vehicle:Vehicle;
  license:LicenseData;
  createdOn:Date;
  updatedOn:Date;
  description?:string;        // Optional description of the courier
  lastTrip?:Date;
  lastOrder?:string;
}

/*
  items: CourierItem[];               // List of items in the courier
  totalAmount: number;              // Total price of the courier
  courierStatus: CourierStatus;         // Current status of the courier (e.g., Placed, Shipped, Delivered)
  courierDate: Date;                  // Date when the courier was placed
  scheduledDate: "asap"|Date;              // Estimated or actual delivery date
  deliveryDate?: Date;              // Estimated or actual delivery date
  deliveryAddress: Address|null;    // Address where the courier will be delivered
  paymentStatus: PaymentStatus;     // Status of the payment (e.g., Paid, Pending, Failed)
  paymentMethod?: PaymentMethod;    // Payment method used (e.g., Credit Card, Mobile Wallet)
  notes?: string;                   // Optional notes or instructions from the customer
  tasks:Task[];
}

export interface CourierItem {
  itemId: string;                   // Unique identifier for the item
  name: string;                     // Name of the item
  quantity: number;                 // Quantity of the item couriered
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
export type CourierStatus = 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled'|"Pending";
export type PaymentMethod = 'Credit Card' | 'Debit Card' | 'Mobile Wallet' | 'Bank Transfer';
*/
