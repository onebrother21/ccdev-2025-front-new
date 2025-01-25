// order.d.ts

import { INote, ITask } from "./ccdev-task";
import { IUser } from "./ccdev-user";
import { IProduct } from "./hashdash-products";
import { ICourier, ICustomer, IVendor } from "./hashdash-profiles";
import { AddressObj, Status } from "./ccdev-common";

export type IOrderStatuses = "new"|"Placed"|"Shipped"|"Delivered"|"Cancelled"|"Pending";
export type IPaymentStatus = "Paid"|"Pending"|"Failed"|"Unpaid";
export type IPaymentMethod = "Credit Card"|"Debit Card"|"Mobile Wallet"|"Bank Transfer";

export interface IOrderItem {
  itemId:IProduct;                   // Unique identifier for the item
  name:string;                     // Name of the item
  qty:number;                 // Quantity of the item ordered
  price:number;                    // Price per unit of the item
}
export type IOrderCharges = Record<"subtotal"|"serviceFee"|"deliveryFee"|"adminFees"|"salesTax"|"tip"|"total",number>;

export interface IOrder {
  id: string;                     // Unique order identifier
  creator:IUser;
  customer:ICustomer;               // ID of the customer placing the order
  courier:ICourier;               // ID of the courier delivering the order
  vendor:IVendor;               // ID of the vendor fulfilling the order
  createdOn:Date;
  updatedOn:Date;
  total: number;              // Total price of the order
  description?:string;                    // Optional description of the order
  status:Status<IOrderStatuses>;         // Current status of the order (e.g., Placed, Shipped, Delivered)
  scheduledFor:"asap"|Date;              // Estimated or actual delivery date
  deliveredOn?:Date;              // Estimated or actual delivery date
  deliveryAddress:AddressObj;    // Address where the order will be delivered
  paymentStatus?:Status<IPaymentStatus>;     // Status of the payment (e.g., Paid, Pending, Failed)
  paymentMethod?:IPaymentMethod;    // Payment method used (e.g., Credit Card, Mobile Wallet)
  notes:INote[];                   // Optional notes or instructions from the customer
  tasks:ITask[];
  items:IOrderItem[];               // List of items in the order
  charges:IOrderCharges|null;
  activity:any[]
}
export interface IOrderMethods {
  runBusinessLogic(bvars:any):Promise<void>;
  json(role:string,auth?:boolean):Partial<IOrder>;
}