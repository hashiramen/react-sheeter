import * as React from 'react';
import styles from '../styles.css';


export interface IReactSheeterProps {
    data: any[]
}

export default class ReactSheeter extends React.Component<IReactSheeterProps, any> {
    public render() {
        return (
            <div className={styles.reactSheeter}>
                <p>React sheeter</p>
            </div>
        );
    }
}
