import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequest } from '../model/loginRequest.interface';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../model/loginResponse.interface';
import { SignUpRequest, SignupResponse } from '../model/SignUpRequest.interface';
import { LocalStorageService } from './jwt.service';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {

  private http:HttpClient = inject(HttpClient);
  private localstorage:LocalStorageService = inject(LocalStorageService);


  signin = (request:LoginRequest):Observable<LoginResponse> => {
    return this.http.post<LoginResponse>(`http://localhost:9090/api/auth/authenticate`,request);
  }
  signup = (request:SignUpRequest):Observable<SignupResponse> => {
    return this.http.post<SignupResponse>(`http://localhost:9090/api/auth/signup`,request);
  }

  getUser = (token: string): Observable<LoginResponse> => {

    return this.http.get<any>('http://localhost:9090/users/me').pipe(
      tap((user:any) => {
        this.localstorage.set('user',JSON.stringify(user));
      })
    )
  };

  logout = () => {
    this.localstorage.remove("user");
    this.localstorage.remove("stackoverflowToken")
  }
}
