import * as React from "react";
import ReactSheeter from "./components/ReactSheeter";
import { ISheetDefinition } from "./lib/Sheet";
// import { IColumnDefinition, ColumnRole } from "./lib/Column";
// import { ICellDefinition } from "./lib/Cell";


export interface IReactSheeterContainerProps {
  data: ISheetDefinition[];
  handleSheetsUpdate: (_sheets: ISheetDefinition[]) => void;
}

export default class ReactSheeterContainer extends React.Component<IReactSheeterContainerProps> {
  public render() {
    const { data } = this.props;
    return (
      <ReactSheeter
        data={data}
        handleSheetUpdate={this.handleSheetUpdate}
      />
    );
  }

  handleSheetUpdate = (_sheet: ISheetDefinition) => {
    const { data } = this.props;
    const targetIndex: number = data.findIndex((s) => s.name === _sheet.name);
    const newSheets: ISheetDefinition[] = [
      ...this.props.data,
    ];
    newSheets[targetIndex] = _sheet;

    // this.cleanUp(newSheets);
    this.props.handleSheetsUpdate(newSheets);
  }

  // private cleanUp = (_sheets: ISheetDefinition[]) => {
  //   const keys: IColumnDefinition[] = [].concat.apply([], _sheets
  //     .map((sh: ISheetDefinition) => {
  //       return sh.columns
  //         .filter((col: IColumnDefinition) => {
  //           if (col.role === ColumnRole.Key)
  //             return true;

  //           return false;
  //         })
  //         .map((col: IColumnDefinition) => col);
  //     }));

  //   const refsKeys: IColumnDefinition[] = [].concat.apply([], _sheets
  //     .map((sh: ISheetDefinition) => {
  //       return sh.columns
  //         .filter((col: IColumnDefinition) => {
  //           if (col.role === ColumnRole.RefKey)
  //             return true;

  //           return false;
  //         })
  //         .map((col: IColumnDefinition) => col);
  //     }));

  //   for (const keyColumn of keys) {
  //     const refColumns = refsKeys.filter( (col) => col.refSheet === keyColumn.parentSheet && col.refColumn === keyColumn.name);
  //     console.log(refColumns);
      
  //     for (const column of refColumns) {
  //       const sheet: ISheetDefinition | undefined = _sheets.find( (sh) => sh.name === column.parentSheet);
  //       if(sheet) {
  //         for (const row of sheet.rows) {
  //           const newRow = [];
  //           for (const cell of row) {
  //             if(cell.uniq === column.uniq) {
  //               console.log(cell, column);
  //               newRow.push({  } as ICellDefinition);
  //             } else {
  //               newRow.push(cell);
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

}


export { sheeterParser } from "./lib/sheeterParser";
export { ICellDefinition } from "./lib/Cell";
export { IColumnDefinition } from "./lib/Column";
export { Sheet, ISheetDefinition } from "./lib/Sheet";
export { IValidateTypeResult } from "./lib/validator";
