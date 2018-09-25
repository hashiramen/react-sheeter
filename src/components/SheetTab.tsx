import * as React from "react";
import { ISheetDefinition } from "../lib/Sheet";

export interface ISheetTabProps {
    data: ISheetDefinition;
    handleSheetChange: ( sheet: ISheetDefinition ) => void 
}

export default class SheetTab extends React.Component<ISheetTabProps, any> {
    public render() {
        const { data } = this.props;
        return (
            <button onClick={this.handleSheetChange}>{ data.name }</button>
        );
    }

    handleSheetChange = () => {
        this.props.handleSheetChange( this.props.data )
    }
}
