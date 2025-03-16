import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { reqCamp } from '../models/req_camps';

@Injectable({
  providedIn: 'root',
})
export class ReqCampService {
  http = inject(HttpClient);
  API = environment.API_URI + 'req_camp';

  constructor() { }


  findReqById(id: number): Observable<reqCamp[]> {
    return this.http.get<reqCamp[]>(`${this.API}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error.error);
      })
    );
  }


  save(res: reqCamp): Observable<reqCamp> {
    const url = `${this.API}/save`;


    return this.http.post<reqCamp>(url, res);
  }
}
