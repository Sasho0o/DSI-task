import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  getUserDetails() {
    return localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData') || '{}')
      : null;
  }

  setDataInLocalStorage(variableName: string, data: string) {
    localStorage.setItem(variableName, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearStorage() {
    localStorage.clear();
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post('api/user/login', { email, password });
  }

  parseJWT(token: string) {
    return jwtDecode(token);
  }
}
