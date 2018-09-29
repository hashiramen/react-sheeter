import * as React from "react";
import { ICellDefinition } from "../lib/Cell";
import Cell from "./Cell";
import styles from "../styles.css";
import { IColumnDefinition } from "../lib/Column";

export interface IRowProps {
    availableIndexes: number[];
    data: ICellDefinition[];
    columns: IColumnDefinition[];
    index: number;
    handleRowChange: ( _row: ICellDefinition[], _index: number ) => void;
}

export default class Row extends React.Component<IRowProps, any> {
    public render() {
        const { data, columns } = this.props;
        return (
            <li>
                <ul className={styles.rsRow}>
                    {
                        data
                            .map( (cell, index) => {
                                const column = columns.find( ( col ) => col.uniq === cell.uniq);
                                if ( !column )
                                    return "Column definition not found";

                                return (
                                    <Cell key={cell.uniq} data={cell} index={index} column={column} handleCellChange={this.handleCellChange}/>
                                );
                            })
                    }
                </ul>
            </li>
        );
    }


    handleCellChange = ( _cell: ICellDefinition, _index: number ) => {
        const newRow = [ ...this.props.data ];
        newRow[_index] = _cell;
        this.props.handleRowChange( newRow, this.props.index );
    }
}
