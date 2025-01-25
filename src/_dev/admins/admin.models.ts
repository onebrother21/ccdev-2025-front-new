// admin.model.ts

import { UserJson } from "@features/user";

export type Admin = {
  id:string;
  email:string;
  displayName:string;
  profilePic:string;
  role:"ADMN"|"SUPR"|"MSTR"|"SYS";
  scopes:string[];
  createdOn:Date;
};
