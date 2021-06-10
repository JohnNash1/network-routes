import { TableData } from './TableData';

export interface DialogResult {
  value: TableData,
  selectedRouteId: string,
  isDelete: boolean;
}
