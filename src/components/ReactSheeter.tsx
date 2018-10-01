import * as React from "react";
import styles from "../styles.css";
import { ISheetDefinition } from "..";
import Sheet from "./Sheet";
import SheetTab from "./SheetTab";
import { ICellDefinition } from "../lib/Cell";


export interface IReactSheeterProps {
    data: ISheetDefinition[];
    handleSheetUpdate: ( _sheet: ISheetDefinition ) => void;
}

interface IReactSheeterState {
    currentSheet: ISheetDefinition;
}

export default class ReactSheeter extends React.Component<IReactSheeterProps, IReactSheeterState> {
    static defaultProps: IReactSheeterProps = {
        data: [],
        handleSheetUpdate: ( _sheet: ISheetDefinition ) => null,
    };

    state: IReactSheeterState = {
        currentSheet: {} as ISheetDefinition,
    };

    public render() {
        const { data } = this.props;
        const { currentSheet } = this.state;

        return (
            <div className={styles.reactSheeter}>
                <div>
                    {
                        data.map( (sheet, index: number) => (
                            <SheetTab key={index} data={sheet} handleSheetChange={this.changeCurrentSheet}/>
                        ))
                    }
                </div>
                <Sheet data={currentSheet} handleSheetRowsUpdate={this.handleSheetRowsUpdate}/>
            </div>
        );
    }

    changeCurrentSheet = ( sheet: ISheetDefinition ) => {
        this.setState({ currentSheet: sheet });
    }

    handleSheetRowsUpdate = ( _rows: ICellDefinition[][] ) => {
        const newSheet: ISheetDefinition = { ...this.state.currentSheet, rows: [ ..._rows ] };
        this.props.handleSheetUpdate( newSheet );
    }
}
