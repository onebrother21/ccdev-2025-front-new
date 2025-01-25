import { Product } from "./product.models";

export const INITIAL_PRODUCTS:Product[] = [
  {
    id: 'product-001',
    customerId: 'cust-001',
    items: [
      { itemId: 'item-001', name: 'Laptop', quantity: 1, price: 1200, total: 1200 },
      { itemId: 'item-002', name: 'Mouse', quantity: 1, price: 50, total: 50 }
    ],
    totalAmount: 1250,
    paymentStatus: 'Paid',
    productStatus: 'Shipped',
    scheduledDate:"asap",
    deliveryAddress: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      postalCode: '62701',
      country: 'USA'
    },
    productDate: new Date('2025-01-01T10:00:00Z'),
    deliveryDate: new Date('2025-01-05T10:00:00Z'),
    paymentMethod: 'Credit Card',
    notes: 'Leave at the front door.',
    tasks:[]
  },{
    id: 'product-002',
    customerId: 'cust-002',
    items: [
      { itemId: 'item-003', name: 'Smartphone', quantity: 1, price: 800, total: 800 }
    ],
    totalAmount: 800,
    paymentStatus: 'Paid',
    productStatus: 'Delivered',
    scheduledDate:"asap",
    deliveryAddress: {
      street: '456 Oak St',
      city: 'Shelbyville',
      state: 'IL',
      postalCode: '62702',
      country: 'USA'
    },
    productDate: new Date('2025-01-02T14:00:00Z'),
    deliveryDate: new Date('2025-01-04T14:00:00Z'),
    paymentMethod: 'Mobile Wallet',
    notes: '',
    tasks:[]
  },{
    id: 'product-003',
    customerId: 'cust-003',
    items: [
      { itemId: 'item-004', name: 'Headphones', quantity: 2, price: 150, total: 300 }
    ],
    totalAmount: 300,
    paymentStatus: 'Pending',
    productStatus: 'Placed',
    scheduledDate:"asap",
    deliveryAddress: {
      street: '789 Pine St',
      city: 'Capital City',
      state: 'IL',
      postalCode: '62703',
      country: 'USA'
    },
    productDate: new Date('2025-01-03T09:30:00Z'),
    paymentMethod: 'Bank Transfer',
    notes: 'Call before delivery.',
    tasks:[],
  },{
    id: 'product-004',
    customerId: 'cust-004',
    items: [
      { itemId: 'item-005', name: 'Tablet', quantity: 1, price: 500, total: 500 },
      { itemId: 'item-006', name: 'Stylus', quantity: 1, price: 100, total: 100 }
    ],
    totalAmount: 600,
    paymentStatus: 'Paid',
    productStatus: 'Cancelled',
    scheduledDate:"asap",
    deliveryAddress: {
      street: '101 Maple St',
      city: 'Ogdenville',
      state: 'IL',
      postalCode: '62704',
      country: 'USA'
    },
    productDate: new Date('2025-01-04T16:00:00Z'),
    paymentMethod: 'Debit Card',
    notes: 'Cancelled due to delay.',
    tasks:[],
  },{
    id: 'product-005',
    customerId: 'cust-005',
    items: [
      { itemId: 'item-007', name: 'Gaming Console', quantity: 1, price: 400, total: 400 },
      { itemId: 'item-008', name: 'Game Controller', quantity: 2, price: 60, total: 120 }
    ],
    totalAmount: 520,
    paymentStatus: 'Failed',
    productStatus: 'Placed',
    scheduledDate:"asap",
    deliveryAddress: {
      street: '202 Elm St',
      city: 'North Haverbrook',
      state: 'IL',
      postalCode: '62705',
      country: 'USA'
    },
    productDate: new Date('2025-01-05T18:45:00Z'),
    paymentMethod: 'Credit Card',
    notes: 'Retry payment later.',
    tasks:[],
  }
];
