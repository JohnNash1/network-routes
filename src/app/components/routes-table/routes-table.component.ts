import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from '../../types/TableData';
import { RoutesListService } from '../../services/routes-list.service';

@Component({
  selector: 'app-routes-table',
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.css']
})
export class RoutesTableComponent implements OnInit {
  public displayedColumns: string[] = ['address', 'gateway', 'interface'];
  public dataSource: TableData[] = [];

  constructor(private routesListService: RoutesListService) {
  }

  public ngOnInit(): void {
    this.getRoutes();
  }

  private getRoutes(): void {
    this.routesListService.getRoutes().subscribe(
      routes => {
        this.dataSource = routes as TableData[];
      }
    )
  }
}
