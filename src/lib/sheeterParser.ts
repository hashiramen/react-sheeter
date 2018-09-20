interface IShParser
{
    name: string;
    rowsData: any[][];
}

interface IShOptions {
    schema: ISheeterOptionsSchema;
}

interface ISheeterOptionsSchema {
    empty: any;
}

export const sheeterParser: (_data: IShParser, _opt: IShOptions) => IShParser  = function(_data: IShParser, _opt: IShOptions): IShParser {
    for (let index: number = 0; index < _data.rowsData.length; index++) {
        const row: any = _data.rowsData[index];
        for (let rowIndex: number = 0; rowIndex < row.length; rowIndex++) {
            const rowField: any = row[rowIndex];
            console.log(rowField);
        }
    }
    return _data;
};

