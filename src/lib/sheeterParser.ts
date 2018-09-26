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
    _data.rowsData.shift();
    // const LONGEST_INDEX_ARRAY = findLongestArrayIndex( _data.rowsData );
    const ROWS: ICellDefinition[][] =  [];
    for (let i = 0; i < currentSchema.columns.length; i++) {
        const column: IColumnDefinition = currentSchema.columns[i];
        const targetIndex: number = HEADERS.findIndex( (x) => x.toLowerCase() === column.name.toLowerCase());

        const COLUMN_CELLS: ICellDefinition[] = [];
        for (const row of _data.rowsData) {
            if(targetIndex > -1) {
                const cell: string = row[targetIndex];
                COLUMN_CELLS.push( new Cell( column.uniq, cell ));
            } else {
                COLUMN_CELLS.push( new Cell( column.uniq, undefined ));
            }
        }

        ROWS.push(COLUMN_CELLS);
    }

    const arr: ICellDefinition[][] = [];
    for (let i = 0; i < ROWS.length; i++) {
        const innerRow = ROWS[i];
        
        
        
        for (let a = 0; a < innerRow.length; a++) {
            const cell: ICellDefinition = innerRow[a];
            if(typeof arr[a] === "undefined")
                arr[a] = [];

            arr[a][i] = cell;

            if(arr[a].length === ROWS.length)
                currentSchema.addRow( arr[a] );
        }
    }

    return currentSchema;
};
