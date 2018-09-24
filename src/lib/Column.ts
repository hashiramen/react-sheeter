export interface IColumnDefinition {
    index: number;
    name: string;
    mandatory: boolean;
    alwaysVisibleInSheet: boolean;
    type: string;
    setIndex: ( _index: number ) => void;
}

export class Column implements IColumnDefinition {
    index: number;
    name: string;
    mandatory: boolean;
    alwaysVisibleInSheet: boolean;
    type: string;
    constructor(  _name: string, _type: string, _mandatory: boolean, _alwaysVisibleInSheet: boolean ) {
        this.name = _name;
        this.type = _type;
        this.mandatory = _mandatory;
        this.alwaysVisibleInSheet = _alwaysVisibleInSheet;
    }

    setIndex = ( _index: number ): void => {
        this.index = _index;
    }
}