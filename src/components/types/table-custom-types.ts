export interface TableCustomColumnConfig<T> {
  key: keyof T | string;
  label: string;
  width: number;
  render?: (row: T) => React.ReactNode;
}

export interface TableCustomGenericProps<T> {
  data: T[];
  columns: TableCustomColumnConfig<T>[];
  height?: number;
}