
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../authentication.service';



@Injectable({
  providedIn: 'root'
})

export class UserService {
  private user: User = {
    id:-1,
    name:'',
    username:'',
    email:'',
    phone: 0,
    role:'',
  }
  private user$ = new BehaviorSubject<User>(this.user);
  private authState$ = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) {}

  getUsers():Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/users')

  }
  getUsersById(id:any){
    return this.http.get<User>(`http://localhost:3000/api/users/${id}`)
  }
  update(id: number, user: User){
    return this.http.put(`http://localhost:3000/api/users/${id}`,user);
  }
  getAuthState(){
    return this.authState$.asObservable();
  }
  getUserObservable(){
    return this.user$.asObservable();
  }
  delete(id:any):Observable<any>{
    return this.http.delete(`http://localhost:3000/api/users/${id}`);
  }


}
