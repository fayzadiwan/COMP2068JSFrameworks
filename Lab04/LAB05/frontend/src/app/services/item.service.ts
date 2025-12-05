import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({providedIn:'root'})
export class ItemService{
  API='http://localhost:3000/api/items';
  constructor(private http:HttpClient){}
  getAll(){return this.http.get(this.API);}
  create(i:any){return this.http.post(this.API,i);}
  update(id:number,i:any){return this.http.put(`${this.API}/${id}`,i);}
  delete(id:number){return this.http.delete(`${this.API}/${id}`);}
}