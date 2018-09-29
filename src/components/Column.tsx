import * as React from "react";
import { IColumnDefinition } from "../lib/Column";
import classnames from "classnames";
import styles from "../styles.css";

export interface IColumnProps {
    data: IColumnDefinition;
}

export default class Column extends React.Component<IColumnProps, any> {
    public render() {
        const { data } = this.props;
        return (
            <div className={classnames(styles.rsHeader, styles.rsCol)}>
                <span>{ data.name }</span>
            </div>
        );
    }
}
