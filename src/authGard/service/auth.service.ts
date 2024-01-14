import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from 'src/app/users/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000';

  constructor(private router: Router,private httpClient:HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login(user: any): Observable<User> {
    const options = {
      headers: new HttpHeaders({ 'content-type': 'application/json'})
    };
    const body = {
      email : user.email,
      password : user.password
    }
    console.log(body)

    return this.httpClient.post<User>(`${this.baseUrl}/login`, body, options).pipe(
      catchError((error: any) => {
        console.error('Une erreur sest produite lors de la connexion :', error);
        return throwError('Une erreur sest produite lors de la connexion.');
      })
    );

  }
}
