import * as React from "react";
import styles from "../styles.css";
import { ISheetDefinition } from "..";
import Sheet from "./Sheet";
import SheetTab from "./SheetTab";


export interface IReactSheeterProps {
    data: ISheetDefinition[];
}

interface IReactSheeterState {
    currentSheet: ISheetDefinition;
}

export default class ReactSheeter extends React.Component<IReactSheeterProps, IReactSheeterState> {
    static defaultProps: IReactSheeterProps = {
        data: [],
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
                <Sheet data={currentSheet} />
            </div>
        );
    }

    changeCurrentSheet = ( sheet: ISheetDefinition ) => {
        this.setState({ currentSheet: sheet });
    }
}
