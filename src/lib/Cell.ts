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