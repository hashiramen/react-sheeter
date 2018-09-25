import * as React from "react";
import styles from "../styles.css";
import { ISheetDefinition } from "..";
import Sheet from "./Sheet";


export interface IReactSheeterProps {
    data: ISheetDefinition[];
}

export default class ReactSheeter extends React.Component<IReactSheeterProps, any> {
    static defaultProps: IReactSheeterProps = {
        data: [],
    }

    public render() {
        const { data } = this.props;
        return (
            <div className={styles.reactSheeter}>
                {
                    data.map( ( sheet, index ) => (
                            <Sheet key={index} data={sheet}/>
                        ))
                }
            </div>
        );
    }
}
