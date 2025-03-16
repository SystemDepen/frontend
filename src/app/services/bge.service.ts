//https://servicodados.ibge.gov.br/api/v1/localidades/estados

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IBGECityResponse, IBGEUFResponse } from "../models/IBGEUF";


@Injectable({
  providedIn: 'root',
})
export class IBGEService {
  http = inject(HttpClient);

  API = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor() {}

  listAllUFs(): Observable<IBGEUFResponse[]> {
    const url = `${this.API}/estados`; // Correção da URL
    return this.http.get<IBGEUFResponse[]>(url); // Retorno correto da requisição
  }

  listAllCities(selectedUf: any): Observable<IBGECityResponse[]> {
    const url = `${this.API}/estados/${selectedUf}/municipios`;
    return this.http.get<IBGECityResponse[]>(url);
  }
}
