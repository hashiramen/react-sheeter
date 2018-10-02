
export interface ICellDefinition {
    uniq: string;
    value: any;
}

export class Cell implements ICellDefinition {
    uniq: string;
    value: any;
    constructor( _uniq: string, _value: any ) {
        this.uniq = _uniq;
        this.value = _value;
    }
}
