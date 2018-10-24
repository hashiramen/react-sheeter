import * as React from "react";
import ReactSheeter from "./components/ReactSheeter";
import { ISheetDefinition } from "./lib/Sheet";
import { IKeyResolver, keyCleanUp } from "./lib/keyCleanUp";
// import { IColumnDefinition, ColumnRole } from "./lib/Column";
// import { ICellDefinition } from "./lib/Cell";


export interface IReactSheeterContainerProps {
  data: ISheetDefinition[];
  handleSheetsUpdate: (_sheets: ISheetDefinition[]) => void;
}

export default class ReactSheeterContainer extends React.PureComponent<IReactSheeterContainerProps> {
  public render() {
    const { data } = this.props;
    return (
      <ReactSheeter
        data={data}
        handleSheetUpdate={this.handleSheetUpdate}
      />
    );
  }

  handleSheetUpdate = (_sheet: ISheetDefinition, _keyResolver: IKeyResolver ) => {
    const { data } = this.props;
    const targetIndex: number = data.findIndex((s) => s.name === _sheet.name);
    const newSheets: ISheetDefinition[] = [
      ...this.props.data,
    ];
    newSheets[targetIndex] = _sheet;

    keyCleanUp(data, _keyResolver);

    // this.cleanUp(newSheets);
    this.props.handleSheetsUpdate(newSheets);
  }

}




export { sheeterParser } from "./lib/sheeterParser";
export { ICellDefinition } from "./lib/Cell";
export { IColumnDefinition } from "./lib/Column";
export { Sheet, ISheetDefinition } from "./lib/Sheet";
export { IValidateTypeResult } from "./lib/validator";
