import * as React from "react";
import styles from "../styles.css";
import { ISheetDefinition } from "../lib/Sheet";


export interface IReactSheeterProps {
    data: ISheetDefinition[];
}

export default class ReactSheeter extends React.Component<IReactSheeterProps, any> {
    render() {
        return (
            <div className={styles.reactSheeter}>
                <p>React sheeter</p>
            </div>
        );
    }
}
