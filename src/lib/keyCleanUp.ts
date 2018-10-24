import { IColumnDefinition, ISheetDefinition } from "..";
import { ColumnRole } from "./Column";
import { ICellDefinition } from "./Cell";

export interface IKeyResolver {
    column: IColumnDefinition;
    keyWasUpdated: boolean;
    lastValue: any;
    newValue: any;
}


export const keyCleanUp = ( _sheets: ISheetDefinition[], _keyResolver: IKeyResolver): ISheetDefinition[] => {
    console.log(_keyResolver);
    const { keyWasUpdated, column, lastValue } = _keyResolver;
    if(keyWasUpdated && lastValue) {
        for (let index = 0; index < _sheets.length; index++) {
            const sheet: ISheetDefinition = _sheets[index];
            
            const correspondedColumns: IColumnDefinition[] = sheet.columns
                .filter( ( refColumn ) => {
                    if(refColumn.role === ColumnRole.RefKey &&
                        refColumn.refColumn === column.name &&
                        refColumn.refSheet === column.parentSheet)
                        return refColumn;

                    return false;
                });

            if(correspondedColumns.length === 0)
                continue;
            

            
            updateRowsOfCertainKey(sheet.rows, correspondedColumns, _keyResolver.newValue);
        }
    }

    return _sheets;
};



const updateRowsOfCertainKey = ( _rows: ICellDefinition[][], _targetColumns: IColumnDefinition[], _newValue: any ) => {
    for (let i = 0; i < _rows.length; i++) {
        const row = _rows[i];
        
        const newRow: ICellDefinition[] = [];
        for (let z = 0; z < row.length; z++) {
            const cell: ICellDefinition = row[z];
            
            const columnfOfCell: IColumnDefinition | undefined = _targetColumns
                .find( ( col ) => col.uniq === cell.uniq);
            
            if(!columnfOfCell) {
                newRow[z] = cell;
                continue;
            }
                
            if(columnfOfCell.)
            newRow[z] = {
                uniq: cell.uniq,
                value: _newValue,
            };
        }

        console.log(newRow);
    }
}