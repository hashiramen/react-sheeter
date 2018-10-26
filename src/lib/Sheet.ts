import { IColumnDefinition, Column, ColumnRole } from "./Column";
import { ICellDefinition } from "./Cell";
import { IValidateTypeResult } from "./validator";

export interface ISheetDefinition {
    name: string;
    columns: IColumnDefinition[];
    rows: ICellDefinition[][];
    addColumn: (  
        _name: string, 
        _type: string, 
        _specificValidations: Array<( _value: any ) => IValidateTypeResult>, 
        _role: ColumnRole, 
        _refSheet: string, 
        _refColumn: string ) => ISheetDefinition;
    addRow: ( _row: ICellDefinition[] ) => void;
}

export class Sheet implements ISheetDefinition {
    name: string;
    columns: IColumnDefinition[];
    rows: ICellDefinition[][];
    constructor( _name: string ) {
        this.name = _name;
        this.columns = [];
        this.rows = [];
    }

    addColumn = ( 
        _name: string, 
        _type: string, 
        _specificValidations: Array<( _value: any ) => IValidateTypeResult> = [], 
        _role: ColumnRole = ColumnRole.None, 
        _refSheet: string = "", 
        _refColumn: string = "" ): ISheetDefinition => {
            this.columns.push(
                new Column(
                    this.name,
                    _name,
                    _type,
                    _specificValidations,
                    _role,
                    _refSheet,
                    _refColumn,
                ),
            );

        return this;
    }

    addRow = ( _row: ICellDefinition[] ): void => {
        this.rows.push(_row);
    }
}
