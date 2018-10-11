import * as React from "react";
import { ISheetDefinition } from "../lib/Sheet";
import Column from "./Column";
import Row from "./Row";
import styles from "../styles.css";
import classnames from "classnames";
import { ICellDefinition } from "../lib/Cell";
import { IFindKeyRefsResult } from "./ReactSheeter";

export interface ISheetProps {
    data: ISheetDefinition;
    refs: IFindKeyRefsResult[];
    handleSheetRowsUpdate: ( _rows: ICellDefinition[][] ) => void;
}

export default class Sheet extends React.Component<ISheetProps, any> {
    public render() {
        const { data } = this.props;

        if(Object.keys(data).length === 0)
            return null;

        return (
            <div className={styles.rsWrapper}>
                <ul className={classnames(styles.rsHeaders, styles.rsRow)}>
                    {
                        data.columns.map( (col) => (
                            <Column key={col.uniq} data={col} />
                        ))
                    }z
                </ul>
                <ul className={styles.rsContainer}>
                    {
                        data.rows.map( ( row, index ) => (
                            <Row key={index} data={row} availableIndexes={[1,2.3]} columns={data.columns} index={index} handleRowChange={this.handleRowChange} refs={this.props.refs}/>
                        ))
                    }
                </ul>
            </div>
        );
    }

    handleRowChange = ( _row: ICellDefinition[], _index: number ): void => {
        const newRows = [ ...this.props.data.rows ];
        newRows[_index] = _row;
        this.props.handleSheetRowsUpdate( newRows );
    }
}
