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
    const { keyWasUpdated, column, lastValue, newValue } = _keyResolver;
    
    if(keyWasUpdated && lastValue) {
        const updatedSheets: ISheetDefinition[] = _sheets;

        for (let index = 0; index < _sheets.length; index++) {
            const sheet: ISheetDefinition = _sheets[index];
            
            const correspondedColumns: IColumnDefinition[] = findCorrespondedColumns(sheet, column);

            if(correspondedColumns.length === 0) {
                updatedSheets[index] = sheet;
                continue;
            }
            
            const updatedMatrix: ICellDefinition[][] = updateRowsOfCertainKey(sheet.rows, correspondedColumns, newValue, lastValue);
            updatedSheets[index] = sheet;
            updatedSheets[index].rows = updatedMatrix;
        }

        return updatedSheets;
    } else {
        return _sheets;
    }
};

const findCorrespondedColumns = ( _sheet: ISheetDefinition, _originalColumn: IColumnDefinition ): IColumnDefinition[] => _sheet.columns
    .filter( ( refColumn ) => {
        if(refColumn.role === ColumnRole.RefKey &&
            refColumn.refColumn === _originalColumn.name &&
            refColumn.refSheet === _originalColumn.parentSheet)
            return refColumn;

        return false;
    });

const updateRowsOfCertainKey = ( _rows: ICellDefinition[][], _targetColumns: IColumnDefinition[], _newValue: any, _lastValue: any ): ICellDefinition[][] => {
    const newCellMatrix: ICellDefinition[][] = [];

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
                
            if(cell.value === _lastValue) {
                newRow[z] = {
                    uniq: cell.uniq,
                    value: _newValue === "" ? undefined : _newValue,
                };
                continue;
            }

            newRow[z] = cell;
        }

        newCellMatrix[i] = newRow;
    }

    return newCellMatrix;
};
