interface TableData {
  address: string;
  gateway: string;
  interface: string;
}

interface Route extends TableData {
  uuid: string;
  mask: string;
}

export { TableData, Route }
