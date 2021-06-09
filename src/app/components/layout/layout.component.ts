import { Component, OnInit } from '@angular/core';
import { Route } from '../../types/TableData';
import { RoutesListService } from '../../services/routes-list.service';
import { MatDialog } from '@angular/material/dialog';
import { RouteDialogComponent } from '../route-dialog/route-dialog.component';
import { take } from 'rxjs/operators';

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
    this.dialog.open(RouteDialogComponent, {data: this.routes}).afterClosed().subscribe(
      result => {
        if (result) {
          this.routesListService.saveNewRoute(result).subscribe(
            _ => this.getRoutes()
          )
        }
      }
    )
  }

  public editOrDeleteRoute(selectedRoute: Route): void {
    console.log(selectedRoute)
  }
}
