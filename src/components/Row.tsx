import * as React from "react";
import { ICellDefinition } from "../lib/Cell";
import Cell from "./Cell";

export interface IRowProps {
    availableIndexes: number[];
    data: ICellDefinition[];
}

export default class Row extends React.Component<IRowProps, any> {
    public render() {
        const { data } = this.props;
        return (
            <li>
                <ul>
                    {
                        data
                            .map( (cell, index) => (
                                <Cell key={cell.uniq} data={cell} index={index}/>
                            ))
                    }
                </ul>
            </li>
        );
    }
}
