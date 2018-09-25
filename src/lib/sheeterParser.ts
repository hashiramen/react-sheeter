import { ISheetDefinition } from "./Sheet";
import { isNullOrUndefined } from "util";
import { IColumnDefinition } from "./Column";
import { ICellDefinition, Cell } from "./Cell";

interface ISheeterParser {
    name: string;
    rowsData: any[][];
}

interface ISheeterOptions {
    schema: ISheetDefinition[];
}

export const sheeterParser: (_data: ISheeterParser, _opt: ISheeterOptions) => ISheetDefinition | undefined  = function(_data: ISheeterParser, _opt: ISheeterOptions): ISheetDefinition | undefined {
    const currentSchema: ISheetDefinition | undefined = _opt.schema.find( ( sch ) => sch.name.toLowerCase() === _data.name.toLowerCase());
    if( isNullOrUndefined(currentSchema ))
        return undefined;

    const HEADERS: string[] = _data.rowsData[0];
    const LONGEST_INDEX_ARRAY = findLongestArrayIndex( _data.rowsData );
    for ( let index: number = 1; index < _data.rowsData.length; index++ ) {
        setColumnIndex( index, HEADERS, currentSchema);
        const row: any = _data.rowsData[index];
        const CELLS: ICellDefinition[] = [];
        for ( let rowIndex: number = 0; rowIndex < _data.rowsData[LONGEST_INDEX_ARRAY].length; rowIndex++ ) {
            CELLS.push( new Cell(rowIndex, row[rowIndex]));
        }
        currentSchema.addRow( CELLS );
    }
    return currentSchema;
};


const setColumnIndex = ( _loopIndex: number, _headers: string[], _schema: ISheetDefinition ): void => {
    const targetColumn: IColumnDefinition | undefined = _schema.columns.find( ( col ) => col.name.toLowerCase() === _headers[_loopIndex]);
    if( isNullOrUndefined(targetColumn) )
        return;

    targetColumn.setIndex(_loopIndex);
};

const findLongestArrayIndex: any = ( multiArray: any[][]): number => multiArray.map(function(a) { return a.length; }).indexOf(Math.max.apply(Math, multiArray.map(function(a) { return a.length; })));
