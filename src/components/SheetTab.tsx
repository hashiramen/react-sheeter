import * as React from "react";
import { ISheetDefinition } from "../lib/Sheet";
import styles from "../styles.css";
import classnames from "classnames";

export interface ISheetTabProps {
    data: ISheetDefinition;
    handleSheetChange: ( sheet: ISheetDefinition ) => void; 
}

export default class SheetTab extends React.PureComponent<ISheetTabProps, any> {
    public render() {
        const { data } = this.props;
        return (
            <button 
                className={classnames(styles.rsCol, styles.rsButton)}
                onClick={this.handleSheetChange}>
                { data.name }
            </button>
        );
    }

    handleSheetChange = () => {
        this.props.handleSheetChange( this.props.data );
    }
}
