import { HttpClient } from '@angular/common/http';
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

  constructor() {}

  save(
    userId: number,
    documentType: string,
    files: File[]
  ): Observable<ReqDocs> {
    const url = `${this.API}/`;

    const formData = new FormData();

    formData.append('userId', userId.toString());
    formData.append('documentType', documentType);

    files.forEach((file) => {
      formData.append('files', file); // mesma chave usada no @RequestParam("files")
    });
    return this.http.post<ReqDocs>(url + 'upload', formData);
  }
}
