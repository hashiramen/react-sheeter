import * as React from "react";
import { ICellDefinition } from "../lib/Cell";
import Cell from "./Cell";
import styles from "../styles.css";
import { IColumnDefinition } from "../lib/Column";
import { IFindKeyRefsResult } from "./ReactSheeter";
import { IKeyResolver } from "../lib/keyCleanUp";

export interface IRowProps {
    availableIndexes: number[];
    data: ICellDefinition[];
    columns: IColumnDefinition[];
    index: number;
    refs: IFindKeyRefsResult[];
    handleRowChange: (_row: ICellDefinition[], _index: number, _keyResolver: IKeyResolver) => void;
}

export default class Row extends React.PureComponent<IRowProps, any> {
    public render() {
        const { data, columns } = this.props;
        return (
            <li>
                <ul className={styles.rsRow}>
                    {
                        data
                            .map((cell, index) => {
                                const column = columns.find((col) => col.uniq === cell.uniq);
                                if (!column)
                                    return "Column definition not found";

                                const targetRef = this.props.refs.find((ref) => {
                                    if (typeof ref === "undefined")
                                        return false;

                                    return ref.column.name === column.refColumn;
                                });

                                return (
                                    <Cell key={cell.uniq} data={cell} index={index} column={column} handleCellChange={this.handleCellChange} targetRef={targetRef!} />
                                );
                            })
                    }
                </ul>
            </li>
        );
    }


    handleCellChange = (_cell: ICellDefinition, _index: number, _keyResolver: IKeyResolver) => {
        const newRow = [...this.props.data];
        newRow[_index] = _cell;
        this.props.handleRowChange(newRow, this.props.index, _keyResolver);
    }
}
