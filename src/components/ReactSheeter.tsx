import * as React from "react";
import styles from "../styles.css";
import { ISheetDefinition } from "..";
import Sheet from "./Sheet";
import SheetTab from "./SheetTab";
import { ICellDefinition } from "../lib/Cell";
import { ColumnRole, IColumnDefinition } from "../lib/Column";


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

    componentDidUpdate(prevProps: IReactSheeterProps) {
        const target = this.props.data.find( ( x ) => x.name === this.state.currentSheet.name);
        if(target && prevProps.data !== this.props.data) {
            this.setState({ currentSheet: target });
        }
    }

    public render() {
        const { data } = this.props;
        const { currentSheet } = this.state;

        const refs = this.findKeysForCurrentSheet();
        return (
            <div className={styles.reactSheeter}>
                <div>
                    {
                        data.map( (sheet, index: number) => (
                            <SheetTab key={index} data={sheet} handleSheetChange={this.changeCurrentSheet}/>
                        ))
                    }
                </div>
                <Sheet data={currentSheet} handleSheetRowsUpdate={this.handleSheetRowsUpdate} refs={refs}/>
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

    private findKeysForCurrentSheet = (): IFindKeyRefsResult[] => {
        const { currentSheet } = this.state;
        if(Object.keys(currentSheet).length <= 0)
            return [];

        const keyColumn: IColumnDefinition | undefined = currentSheet.columns.find( ( c ) => c.role === ColumnRole.RefKey);
        if(!keyColumn)
            return [];

        const { data } = this.props;

        // const result = data
        //     .filter( ( s ) => s.name === keyColumn.refSheet && s.columns
        //         .filter( ( c ) => c.role === ColumnRole.Key && c.refColumn === keyColumn.refColumn))
        //             .map( ( x ) => x.columns[0]);

        const results: IFindKeyRefsResult[] = data
            .map( ( s ) => {

                if( s.name !== keyColumn.refSheet )
                    return;

                const columnResultIndex = s.columns.findIndex( ( col ) => col.role === ColumnRole.Key && col.name === keyColumn.refColumn);
                if(columnResultIndex === -1)
                    return;

                return {
                    column: s.columns[columnResultIndex],
                    lookupKeys: s.rows.map( ( r ) => r[columnResultIndex] ),
                    sheetName: s.name,
                } as IFindKeyRefsResult;
            }) as IFindKeyRefsResult[];

        if(!results)
            return [];

        return results;
    }
}


export interface IFindKeyRefsResult {
    column: IColumnDefinition;
    lookupKeys: ICellDefinition[];
    sheetName: string;
}