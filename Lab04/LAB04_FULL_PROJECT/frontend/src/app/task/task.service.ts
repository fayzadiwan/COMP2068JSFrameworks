import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task { id:number; title:string; completed:boolean; }

@Injectable()
export class TaskService {
  private base = '/api/items';
  constructor(private http: HttpClient) {}
  list(): Observable<Task[]> { return this.http.get<Task[]>(this.base); }
  get(id:number) { return this.http.get<Task>(`${this.base}/${id}`); }
  create(title:string) { return this.http.post<Task>(this.base, { title }); }
  update(task:Task) { return this.http.put<Task>(`${this.base}/${task.id}`, task); }
  delete(id:number) { return this.http.delete(`${this.base}/${id}`); }
}
