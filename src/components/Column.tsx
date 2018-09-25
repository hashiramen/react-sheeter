import * as React from "react";
import { IColumnDefinition } from "../lib/Column";

export interface IColumnProps {
    data: IColumnDefinition;
}

export default class Column extends React.Component<IColumnProps, any> {
    public render() {
        const { data } = this.props;
        return (
            <div>
                <span>{ data.name }</span>
            </div>
        );
    }
}
