import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response.model';
import { UserRequest } from '../models/user-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/api/crud-backend/users';
  private http = inject(HttpClient);

  constructor() { }

  findAll():Observable<UserResponse[]>{
    return this.http.get<UserResponse[]>(this.url);
  }

  findById(id:number):Observable<UserResponse>{
    return this.http.get<UserResponse>(this.buildUrl(id));
  }

  save(request:UserRequest):Observable<UserResponse>{
    return this.http.post<UserResponse>(this.url,request);
  }

  update(id:number,request:UserRequest):Observable<UserResponse>{
    return this.http.put<UserResponse>(this.buildUrl(id),request);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(this.buildUrl(id));
  }

  private buildUrl(id:number):string{
    const newUrl = `${this.url}/${id}`;
    return newUrl;
  }
}
