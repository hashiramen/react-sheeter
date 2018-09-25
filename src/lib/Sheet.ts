import { IColumnDefinition, Column } from "./Column";
import { ICellDefinition } from "./Cell";

export interface ISheetDefinition {
    name: string;
    columns: IColumnDefinition[];
    rows: ICellDefinition[][];
    addColumn: (  _name: string, _type: string, _mandatory: boolean, _alwaysVisibleInSheet: boolean ) => ISheetDefinition;
    addRow: ( _row: ICellDefinition[] ) => void;
}

export class Sheet implements ISheetDefinition {
    name: string;
    columns: IColumnDefinition[];
    rows: ICellDefinition[][];
    constructor( _name:string ){
        this.name = _name;
        this.columns = [];
        this.rows = [];
    }

    addColumn = ( _name: string, _type: string, _mandatory: boolean, _alwaysVisibleInSheet: boolean ): ISheetDefinition => {
        this.columns.push(
            new Column(
                _name,
                _type,
                _mandatory,
                _alwaysVisibleInSheet
            )
        );

        return this;
    };

    addRow = ( _row: ICellDefinition[] ): void => {
        this.rows.push(_row);
    }
}
