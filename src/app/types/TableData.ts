interface TableData {
  address: string;
  gateway: string;
  interface: string;
}

interface Routes extends TableData {
  uuid: string;
  mask: string;
}

export { TableData, Routes }
