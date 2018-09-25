import * as React from "react";
import { ISheetDefinition } from "../lib/Sheet";
import Column from "./Column";
import Row from "./Row";
import arraySort from 'array-sort';

export interface ISheetProps {
    data: ISheetDefinition;
}

export default class Sheet extends React.Component<ISheetProps, any> {
    public render() {
        const { data } = this.props;

        if(Object.keys(data).length === 0)
            return null;


        return (
            <div>
                <h2>{ data.name }</h2>
                <div>
                    {
                            arraySort(data.columns, 'index')
                            .map( (col, index) => (
                                <Column key={index} data={col} />
                            ))
                    }
                </div>
                <ul>
                    {
                        data.rows.map( ( row, index ) => (
                            <Row key={index} data={row} availableIndexes={[1,2.3]}/>
                        ))
                    }
                </ul>
            </div>
        );
    }
}
