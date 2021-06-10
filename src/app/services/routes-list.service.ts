import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from '../types/TableData';
import { GetAllRoutesResponse, RouteResponse } from '../types/Response';
import { map } from 'rxjs/operators';
import { DialogResult } from '../types/DialogResult';

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

  public saveRoute(dataToSave: DialogResult): Observable<RouteResponse> {
    if (dataToSave.selectedRouteId) {
      return this.httpClient.put<RouteResponse>(`${this.url}/${dataToSave.selectedRouteId}`, dataToSave.value)
    }
    return this.httpClient.post<RouteResponse>(this.url, dataToSave.value)
  }

  public deleteRoute(dataToSave: DialogResult): Observable<RouteResponse> {
    return this.httpClient.delete<RouteResponse>(`${this.url}/${dataToSave.selectedRouteId}`)
  }
}
