import { Status } from '@common';
import { UserPreview } from './user.models';

export interface Comment {user: string;text: string;};
export type PostStatuses = |"new"|"posted"|"flagged"|"featured";
export type PostType = {
    _id: string
  creator:UserPreview
  createdAt:string|Date
  published:string|Date
  status:Status<PostStatuses>
  title:string
  content:string
  images?:string[]
  type:"user-timeline"|"user-activity";
  shares?:number;
  likes?:number;
  options?:string[]
};
export interface Post extends PostType {}
export class Post {
  constructor(o:any){
    const n:Partial<Post> = {};
    Object.assign(this,n,o);
  }
  json(){return {...this};}
}
export type PostQueryStringKeys = |"creator.username"|"creator.fullname"|"creator.loc"|"title"|"status.name"|"type";
export type PostQueryNumberKeys = |"shares"|"likes";
export type PostQueryDateKeys = |"createdAt"|"published";
export type PostQuery =
Partial<Record<PostQueryStringKeys,string>> & 
Partial<Record<PostQueryNumberKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>> &  
Partial<Record<PostQueryDateKeys,Partial<Record<"eq"|"ne"|"min"|"max",Date>>>>;