import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routes } from '../types/TableData';
import { Response } from '../types/Response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutesListService {
  private url = 'api/routes'

  constructor(private httpClient: HttpClient) { }

  public getRoutes(): Observable<Routes[] | null> {
    return this.httpClient.get<Response>(this.url).pipe(
      map(response => response.payload.routes)
    )
  }
}
