import { Product } from "./product.models";

// Shop model
export interface Shop {
  id: string; // Unique identifier for the shop
  name: string; // Shop name
  address: string; // Shop address
  phone: string; // Contact phone number
  inventory: Array<{
    product: Product; // Product details
    amount: number; // Quantity of the product in stock
  }>;
}
