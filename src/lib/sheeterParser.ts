interface IShParser {
    name: string;
    rowsData: any[][];
}

interface IShOptions {
    schema: ISheeterOptionsSchema[];
}

interface ISheeterOptionsSchema {
    name: string;
    columns: ISheeterColumn[];
}

interface ISheeterColumn {
    name: string;
    type: string;
    mandatory: boolean;
}

export const sheeterParser: (_data: IShParser, _opt: IShOptions) => IShParser  = function(_data: IShParser, _opt: IShOptions): IShParser {
    const headers: string[] = _data.rowsData[0];
    console.log("@HEADERS: ", headers);
    for (let index: number = 1; index < _data.rowsData.length; index++) {
        const row: any = _data.rowsData[index];
        for (let rowIndex: number = 0; rowIndex < row.length; rowIndex++) {
            // const rowField: any = row[rowIndex];
        }
    }
    return _data;
};



export interface ISheetDefinition {
    name: string;
    columns: IColumnDefinition[];
    addColumn: ( _index: number, _name: string, _type: string, _mandatory: boolean, _alwaysVisibleInSheet: boolean ) => this;
}

export class Sheet implements ISheetDefinition {
    name: string;
    columns: IColumnDefinition[];
    constructor( _name:string ){
        this.name = _name;
        this.columns = [];
    }

    addColumn = ( _index: number, _name: string, _type:string, _mandatory: boolean, _alwaysVisibleInSheet: boolean ): Sheet => {
        this.columns.push(
            new Column(
                _index,
                _name,
                _type,
                _mandatory,
                _alwaysVisibleInSheet
            )
        );

        return this;
    };
}



export interface IColumnDefinition {
    index: number;
    name: string;
    mandatory: boolean;
    alwaysVisibleInSheet: boolean;
    type: string;
}

export class Column implements IColumnDefinition {
    index: number;
    name: string;
    mandatory: boolean;
    alwaysVisibleInSheet: boolean;
    type: string;
    constructor( _index: number, _name: string, _type: string, _mandatory: boolean, _alwaysVisibleInSheet: boolean ) {
        this.index = _index;
        this.name = _name;
        this.type = _type;
        this.mandatory = _mandatory;
        this.alwaysVisibleInSheet = _alwaysVisibleInSheet;
    }
}

export interface ICellDefinition {
    index: number;
    value: any;
}

export class Cell implements ICellDefinition {
    index: number;
    value: any;
    constructor( _index: number, _value: any ) {
        this.index = _index;
        this.value = _value;
    }
}