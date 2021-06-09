import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Route } from '../../types/TableData';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-routes-table',
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.css']
})
export class RoutesTableComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['address', 'gateway', 'interface'];
  public dataSource = new MatTableDataSource<Route>([]);
  @Input() set sourceData(data: Route[]) {
    this.dataSource.data = data;
  }
  @Output() editOrDeleteRoute = new EventEmitter<Route>()

  // @ts-ignore
  @ViewChild(MatSort) private sort: MatSort;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public selectRouteToEditOrDelete(selectedRoute: Route): void {
    this.editOrDeleteRoute.emit(selectedRoute);
  }
}
