import * as React from "react";
import { ISheetDefinition } from "../lib/Sheet";

export interface ISheetProps {
    data: ISheetDefinition;
}

export default class Sheet extends React.Component<ISheetProps, any> {
    public render() {
        // const { data } = this.props;
        return (
            <div>
                <p>Sheet</p>
            </div>
        );
    }
}
