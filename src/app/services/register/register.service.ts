import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../auth/usuario';
import { UsuarioRegisterDTO } from '../../auth/usuario-register.dto';

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

  findUserByDocument(document: string): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${this.API}/findByDocument/${document}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err.error);
        })
      );
  }

handleRegister(data: UsuarioRegisterDTO): Observable<string> {
  return this.http
    .post<string>(`${this.API}/save`, data, {
      responseType: 'text' as 'json',
    })
    .pipe(
      catchError((error) => {
        return throwError(() => error.error);
      })
    );
}

}
