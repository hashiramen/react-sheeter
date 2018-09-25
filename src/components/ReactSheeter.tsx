import * as React from "react";
import styles from "../styles.css";
import { ISheetDefinition } from "..";
import Sheet from "./Sheet";
import SheetTab from "./SheetTab";


export interface IReactSheeterProps {
    data: ISheetDefinition[];
}

interface IReactSheeterState {
    currentSheet: ISheetDefinition
}

export default class ReactSheeter extends React.Component<IReactSheeterProps, IReactSheeterState> {
    state: IReactSheeterState = {
        currentSheet: {} as ISheetDefinition
    }

    static defaultProps: IReactSheeterProps = {
        data: [],
    }

    public render() {
        const { data } = this.props;
        const { currentSheet } = this.state;

        return (
            <div className={styles.reactSheeter}>
                <ul>
                    {
                        data.map( (sheet, index: number) => (
                            <SheetTab key={index} data={sheet} handleSheetChange={this.changeCurrentSheet}/>
                        ))
                    }
                </ul>
                <Sheet data={currentSheet} />
            </div>
        );
    }

    changeCurrentSheet = ( sheet: ISheetDefinition ) => {
        this.setState({ currentSheet: sheet })
    }
}
