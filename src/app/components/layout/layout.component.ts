import { Component, OnInit } from '@angular/core';
import { Route } from '../../types/TableData';
import { RoutesListService } from '../../services/routes-list.service';
import { MatDialog } from '@angular/material/dialog';
import { RouteDialogComponent } from '../route-dialog/route-dialog.component';
import { take } from 'rxjs/operators';
import { DialogResult } from '../../types/DialogResult';
import { SaveErrorDialogComponent } from '../save-error-dialog/save-error-dialog.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public routes: Route[] = [];

  constructor(private routesListService: RoutesListService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRoutes();
  }

  private getRoutes(): void {
    this.routesListService.getRoutes().pipe(
      take(1)
    ).subscribe(
      routes => {
        this.routes = routes as Route[];
      }
    )
  }

  public openDialog(): void {
    this.dialog.open(RouteDialogComponent, {data: {routes: this.routes}}).afterClosed().subscribe(
      (result: DialogResult) => {
        if (result) {
          this.routesListService.saveRoute(result).subscribe(
            routeResponse => {
              if (!routeResponse.successful) {
                this.dialog.open(SaveErrorDialogComponent, {data: routeResponse.message})
              } else {
                this.getRoutes()
              }
            }
          )
        }
      }
    )
  }

  public editOrDeleteRoute(selectedRoute: Route): void {
    this.dialog.open(RouteDialogComponent, {data: {routes: this.routes, selectedRoute}}).afterClosed().subscribe(
      (result: DialogResult) => {
        if (result) {
          !result.isDelete ?
            this.routesListService.saveRoute(result)
              .subscribe(_ => this.getRoutes()) :
            this.routesListService.deleteRoute(result)
              .subscribe(_ => this.getRoutes())
        }
      }
    )
  }
}
