import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { PostsController } from '../controllers';
import { InMemApiHandlersService } from '../types';

@Injectable({providedIn:"root"})
export class PostsRouter extends InMemApiHandlersService {
  constructor(private posts:PostsController){super();}
  route = (req:HttpRequest<any>) => {
    const {url,method,headers} = req;
    const auth = headers.get("authorization");
    const api = headers.get("x-api-ekey");
    //console.log(url,method);
    try{
      switch(true){
        case url.endsWith('/posts/all') && method === 'GET':return this.posts.all(req);
        case url.endsWith('/posts') && method === 'POST':return this.posts.create(req);
        case url.match(/\/posts\/q\?/) && method === 'GET':return this.posts.query(req,"q?");
        case url.match(/\/posts\/t\?/) && method === 'GET':return this.posts.search(req,"t?");
        case url.match(/\/posts\/\w+$/) && method === 'GET':return this.posts.fetch(req);
        case url.match(/\/posts\/\w+$/) && method === 'PUT':return this.posts.update(req);
        case url.match(/\/posts\/\w+$/) && method === 'DELETE':return this.posts.remove(req);
        //case url.match(/\/posts\/\w+\/activity/) && method === 'POST':return this.posts.saveActivity(req);
        default:return this.e["fourohfour"]();
      }
    }
    catch(e_){return this.e["someerror"](e_);}
  };
}