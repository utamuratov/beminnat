type ColumnType = 'date' | 'image' | 'template';

export interface IColumn {
  field: string;
  header?: string;
  type?: ColumnType;
  width?: string;
  nzLeft?: boolean;
  nzRight?: boolean;
}

// export class Column implements IColumn {
//   field: string;
//   header?: string;
//   type?: ColumnType;
//   width?: string;
//   nzLeft?: boolean;
//   nzRight?: boolean;

//   constructor(column: IColumn) {
//     this.field = column.field;
//     this.header = column.header || column.field;
//     this.type = column.type || undefined;
//     this.width = column.width || undefined;
//     this.nzLeft = column.nzLeft || false;
//     this.nzRight = column.nzRight || false;
//   }
// }

export class Column implements IColumn {
  constructor(
    public field: string,
    public header?: string,
    public type?: ColumnType,
    public width: string = '200px',
    public nzLeft?: boolean,
    public nzRight?: boolean,
  ) {
    this.header = header || field;
  }
}

export function columnFactory(column: IColumn): Column {
  return new Column(
    column.field,
    column.header,
    column.type,
    column.width,
    column.nzLeft,
    column.nzRight,
  );
}

// export function columnFactory(column: IColumn): Column {
//   return new Column(column);
// }
