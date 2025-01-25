import { IUser } from "./ccdev-user";
import { Status } from "./ccdev-common";

export type IProductStatuses = "new"|"in-stock"|"sold-out"|"no-longer-available"|"coming-soon";
export interface IProductMethods {
  json(role:string,auth?:boolean):Partial<IProduct>;
}
export interface IProduct extends IProductMethods {
  id: string; // Unique identifier for the product
  creator:IUser;
  createdOn:Date;
  updatedOn:Date;
  name: string; // Product name
  status:Status<IProductStatuses>;
  description?: string; // Detailed description of the product
  sku?: string; // Stock Keeping Unit identifier
  type?: string; // Product export type/category
  concentration:{
    amt:number; // Product concentration (e.g., percentage, ratio)
    unit:string; // Product concentration unit
  }
  price:{
    amt:number; // Price per unit
    curr:string //Price currency
    per:string; // Name of the unit (e.g., kg, liters)
  }
  receivedOn?: Date; // Date the product was received
  sellBy?: Date; // Sell-by or expiration date
}