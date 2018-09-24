import * as React from "react";
import ReactSheeter from "./components/ReactSheeter";


export interface IReactSheeterContainerProps {
  data: any[];
}

export default class ReactSheeterContainer extends React.Component<IReactSheeterContainerProps> {
  render() {
    const { data } = this.props;
    return (
      <ReactSheeter 
        data={data}
      />
    );
  }
}


export { sheeterParser, Column, IColumnDefinition, Sheet, ISheetDefinition } from "./lib/sheeterParser";