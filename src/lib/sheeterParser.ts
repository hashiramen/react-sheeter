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

