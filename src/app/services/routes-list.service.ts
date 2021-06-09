import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route, TableData } from '../types/TableData';
import { GetAllRoutesResponse, PostNewRouteResponse } from '../types/Response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutesListService {
  private url = 'api/routes'

  constructor(private httpClient: HttpClient) { }

  public getRoutes(): Observable<Route[] | null> {
    return this.httpClient.get<GetAllRoutesResponse>(this.url).pipe(
      map(response => response.payload.routes)
    )
  }

  public saveNewRoute(routeToSave: TableData): Observable<PostNewRouteResponse> {
    return this.httpClient.post<PostNewRouteResponse>(this.url, routeToSave)
  }
}
