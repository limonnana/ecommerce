import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKeyWord } from 'app/shared/model/key-word.model';

type EntityResponseType = HttpResponse<IKeyWord>;
type EntityArrayResponseType = HttpResponse<IKeyWord[]>;

@Injectable({ providedIn: 'root' })
export class KeyWordService {
  public resourceUrl = SERVER_API_URL + 'api/key-words';

  constructor(protected http: HttpClient) {}

  create(keyWord: IKeyWord): Observable<EntityResponseType> {
    return this.http.post<IKeyWord>(this.resourceUrl, keyWord, { observe: 'response' });
  }

  update(keyWord: IKeyWord): Observable<EntityResponseType> {
    return this.http.put<IKeyWord>(this.resourceUrl, keyWord, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKeyWord>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKeyWord[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
