import { Admin } from "./admin.models";

export const INITIAL_ADMINS:Admin[] = [
  {
    id: 'admin-001',
    displayName:"Jack P.",
    email:"service.onebrother@gmail.com",
    role:"MSTR",
    scopes:["everything"],
    createdOn:new Date("1/1/2025"),
    profilePic:"assets/img/default-avatar.png",
  },{
    id: 'admin-002',
    displayName:"Joe G.",
    email:"jojo.onebrother@gmail.com",
    role:"SUPR",
    scopes:["couriers","admins"],
    createdOn:new Date("1/2/2025"),
    profilePic:"assets/img/default-avatar.png",
  },{
    id: 'admin-003',
    displayName:"Jim W.",
    email:"service.wilson@gmail.com",
    role:"SUPR",
    scopes:["couriers","admins"],
    createdOn:new Date("1/2/2025"),
    profilePic:"assets/img/default-avatar.png",
  },
];
