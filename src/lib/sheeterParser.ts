import { ISheetDefinition } from "./Sheet";
import { isNullOrUndefined } from "util";
import { IColumnDefinition } from "./Column";
import { ICellDefinition, Cell } from "./Cell";

interface IShParser {
    name: string;
    rowsData: any[][];
}

interface IShOptions {
    schema: ISheetDefinition[];
}

export const sheeterParser: (_data: IShParser, _opt: IShOptions) => ISheetDefinition | undefined  = function(_data: IShParser, _opt: IShOptions): ISheetDefinition | undefined {
    const currentSchema: ISheetDefinition | undefined = _opt.schema.find( sch => sch.name.toLowerCase() === _data.name.toLowerCase());
    if( isNullOrUndefined(currentSchema ))
        return undefined;

    const HEADERS: string[] = _data.rowsData[0];
    for ( let index: number = 1; index < _data.rowsData.length; index++ ) {
        setColumnIndex( index, HEADERS, currentSchema);
        const row: any = _data.rowsData[index];
        const CELLS: ICellDefinition[] = []
        for ( let rowIndex: number = 0; rowIndex < row.length; rowIndex++ ) {
            CELLS.push( new Cell(rowIndex, row[rowIndex]));
        }
        currentSchema.addRow( CELLS );
    }
    console.log(currentSchema);
    return currentSchema;
};


const setColumnIndex = ( _loopIndex: number, _headers: string[], _schema: ISheetDefinition ): void => {
    const targetColumn: IColumnDefinition | undefined = _schema.columns.find( col => col.name.toLowerCase() === _headers[_loopIndex]);
    if( isNullOrUndefined(targetColumn) )
        return;

    targetColumn.setIndex(_loopIndex);
};