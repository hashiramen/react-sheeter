import * as React from "react";
import { ICellDefinition } from "../lib/Cell";

export interface ICellProps {
    data: ICellDefinition;
    index: number;
}

export default class Cell extends React.Component<ICellProps, any> {
    public render() {
        const { data } = this.props;
        return (
            <li>
                <p>{ data.value }</p>
            </li>
        );
    }
}
