import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient:HttpClient) { }


  getUsers = () : Observable<User[]> =>{
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`, );
  }

  addUser = (user : Object) : Observable<User>=>{
    const options = {
      headers: new HttpHeaders(
        { 'content-type': 'application/json'}
        )
    };
    //const body = JSON.stringify(book)
    return(this.httpClient.post<User>(
      `${this.baseUrl}/users`,
      user,
      options));
  }

  getUserById = (id : number) : Observable<User>=> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/${id}`)
  }


  
  editUser = (user : User) : Observable<User>=>{
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json'})
    };
    const body = {
      name : user.name,
      email : user.email,
      password : user.password
    }

    return(this.httpClient.put<User>(`${this.baseUrl}/users/${user.id}`, body, options));

  }

  deleteUser = (id : number) : Observable<Object> =>{
    return this.httpClient.delete(`${this.baseUrl}/users/${id}`)
  }


}
