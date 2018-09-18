import * as React from 'react';

export interface IReactSheeterProps {
    data: any[]
}

export default class ReactSheeter extends React.Component<IReactSheeterProps, any> {
    public render() {
        return (
            <div>
                <p>React sheeter</p>
            </div>
        );
    }
}
