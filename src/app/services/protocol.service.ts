import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Protocols } from '../models/protocols';

@Injectable({
  providedIn: 'root',
})
export class ProtocolsService {
  private http = inject(HttpClient);
  private API = `${environment.API_URI}protocols`;

  constructor() {}

  // Buscar todos os protocolos
  findAll(): Observable<Protocols[]> {
    const url = `${this.API}`;
    return this.http.get<Protocols[]>(url);
  }

  // Buscar um protocolo específico por uma propriedade alternativa
  findByUserEmail(email: string): Observable<Protocols[]> {
    const url = `${this.API}/user?email=${email}`;
    return this.http.get<Protocols[]>(url);
  }

  // Criar um novo protocolo
  save(protocol: Protocols): Observable<Protocols> {
    const url = `${this.API}/save`;
    return this.http.post<Protocols>(url, protocol);
  }

  // Atualizar um protocolo existente
  update(protocol: Protocols, id: number | any): Observable<Protocols> {
    const url = `${this.API}/update/${id}`;
    return this.http.put<Protocols>(url, protocol);
  }

  // Deletar um protocolo (neste caso, pode ser com base em outro identificador)
  deleteByStatus(status: number): Observable<void> {
    const url = `${this.API}/delete?status=${status}`;
    return this.http.delete<void>(url);
  }
}
