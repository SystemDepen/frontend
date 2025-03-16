import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReqDocs } from '../../models/req_docs';

@Injectable({
  providedIn: 'root',
})
export class ReqDocsService {
  http = inject(HttpClient);
  API = environment.API_URI + 'documents';

  constructor() { }

  save(res: ReqDocs): Observable<ReqDocs> {
    console.log(res)
    const url = `${this.API}/`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'secret-key':
        'BvPHGM8C0ia4uOuxxqPD5DTbWC9F9TWvPStp3pb7ARo0oK2mJ3pd3YG4lxA9i8bj6OTbadwezxgeEByY',
    });
    return this.http.post<ReqDocs>(url + 'upload', res, { headers });
  }
}
