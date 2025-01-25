import { Courier } from "./courier.models";

export const INITIAL_COURIERS:Courier[] = [
  {
    id: 'courier-001',
    username:"Bombaclaat",
    name:{first:"Nuupu",last:"Rastapasta"},
    pic:'assets/img/default-avatar.png',
    dob:new Date("04/22/1992"),
    description:"ok cool 1",
    vehicle:{make:"Toyota",model:"Corolla",yr:2020,plateNo:"A3F3G69",origMileage:34555},
    license:{idNo:"64679161",state:"WA",yr:2026},
    createdOn:new Date("01-10-2025"),
    updatedOn:new Date("01-10-2025"),
  },{
    id: 'courier-002',
    username:"Goldfinger",
    name:{first:"Oro",last:"Sally"},
    pic:'assets/img/default-avatar.png',
    dob:new Date("03/22/1999"),
    description:"ok cool 2",
    vehicle:{make:"Toyota",model:"Tundra",yr:2016,plateNo:"Z3FBB69",origMileage:65286},
    license:{idNo:"94675565",state:"MS",yr:2026},
    createdOn:new Date("01-10-2025"),
    updatedOn:new Date("01-10-2025"),
  },{
    id: 'courier-003',
    username:"perryOh",
    name:{first:"Perry",last:"Mason"},
    dob:new Date("11/22/2002"),
    pic:'assets/img/default-avatar.png',
    description:"ok cool 3",
    vehicle:{make:"Hyundai",model:"Santa Fe",yr:2022,plateNo:"9N8GG77",origMileage:112580},
    license:{idNo:"38974922",state:"NY",yr:2028},
    createdOn:new Date("01-09-2025"),
    updatedOn:new Date("01-09-2025"),
  },
];
