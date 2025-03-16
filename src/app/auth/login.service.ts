import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from './login';
import { Usuario } from './usuario';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  API = `${environment.API_URI}login/logar`;

  constructor() {}

  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {
      responseType: 'text' as 'json',
    });
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return '';
  }

  hasPermission(role: number) {
    let user = this.jwtDecode() as Usuario;
    if (user.role.toString() == role.toString()) return true;
    else return false;
  }
}
