import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../auth/usuario';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly API = environment.API_URI + 'usuario';
  private http = inject(HttpClient);

  constructor() {}

  // retorna lista de usuarios
  findUserById(id: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/findById/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error.error);
      })
    );
  }

  // retorna unico usuario
  findSingleUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/findById/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error.error);
      })
    );
  }
  

  handleRegister(res: Usuario, role: number): Observable<string> {
    const registerData: Usuario = {
      name: res.name,
      document: res.document,
      email: res.email,
      password: res.password,
      gender: res.gender,
      date_born: res.date_born,
      role,
      created_at: new Date(),
      updated_at: new Date(),
      protocols: []
    };


    return this.http
      .post<string>(`${this.API}/save`, registerData, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error.error);
        })
      );
  }
}
