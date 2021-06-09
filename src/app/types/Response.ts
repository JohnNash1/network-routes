import { Route } from "./TableData";

interface Response {
  message: string;
  code: number;
  successful: boolean;
}

interface GetAllRoutesResponse extends Response {
  payload: {
    routes: Route[] | null;
  }
}

interface PostNewRouteResponse extends Response {
  payload: {
    uuid: string
  }
}

export { Response, GetAllRoutesResponse, PostNewRouteResponse }
