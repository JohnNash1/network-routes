import { Routes } from "./TableData";

export interface Response {
  message: string;
  code: number;
  successful: boolean;
  payload: {
    routes: Routes[] | null;
  }
}
