import * as React from "react";
import { ICellDefinition } from "../lib/Cell";
import classnames from "classnames";
import styles from "../styles.css";
import { IColumnDefinition, ColumnRole } from "../lib/Column";
import { validateType } from "../lib/validator";
import { IFindKeyRefsResult } from "./ReactSheeter";
import { IKeyResolver } from "../lib/keyCleanUp";

export interface ICellProps {
    data: ICellDefinition;
    index: number;
    column: IColumnDefinition;
    targetRef: IFindKeyRefsResult;
    handleCellChange: ( _cell: ICellDefinition, _index: number, _keyResolver: IKeyResolver ) => void;
}

interface ICellState {
    newValue: any;
    isValidType: boolean;
    errorMessages: string[];
}

export default class Cell extends React.PureComponent<ICellProps, ICellState> {
    state: ICellState = {
        errorMessages: [],
        isValidType: true,
        newValue: "",
    };

    componentDidMount() {
        this.setState({
            newValue: this.props.data.value,
        });

        this.validateCell();
    }

    componentDidUpdate(prevProps: ICellProps, prevState: ICellState) {
        if ( prevState.newValue !== this.state.newValue ) {
            this.validateCell();
        }
        
        if(false) 
            console.log(prevProps);
    }
        
    public render() {
        const { column, targetRef } = this.props;
        const { newValue } = this.state;
        
        const value = newValue ? newValue : "";
        if(column.role === ColumnRole.RefKey) {
            return (
                <li className={classnames(styles.rsCol, !this.state.isValidType && styles.isInvalid )}>
                    <select 
                        name="value" 
                        id="" 
                        value={value} 
                        onChange={this.handleDropDownChange}>
                        <option value="">None</option>
                        {
                            targetRef.lookupKeys.map( ( key, index ) => {
                                if(!key.value) return null;

                                return (
                                    <option key={index} value={key.value}>{key.value}</option>
                                );
                            })
                        }
                    </select>
                    <div className={styles.rsErrors}>
                        {
                            this.state.errorMessages.length > 0 
                            && <p className={styles.rsErrorsIcon}>!</p>
                            // : this.state.errorMessages.map( (e, index) => <p key={index}>{e}</p>)
                        }
                    </div>
                </li>
            );
        }

        return (
            <li className={classnames(styles.rsCol, !this.state.isValidType && styles.isInvalid )}>
                <input 
                    type="text" 
                    value={value} 
                    onBlur={this.handleCellUpdate} 
                    onChange={this.handleNewValueChange}/>
                <div className={styles.rsErrors}>
                    {
                        this.state.errorMessages.length > 0 
                        && <p className={styles.rsErrorsIcon}>!</p>
                        // : this.state.errorMessages.map( (e, index) => <p key={index}>{e}</p>)
                    }
                </div>
            </li>
        );
    }

    handleCellUpdate = () => {
        const { newValue } = this.state;
        const newCell = { ...this.props.data, value: newValue } as ICellDefinition;
        const keyResolver: IKeyResolver = this.createKeyResolver(newValue);
        this.props.handleCellChange(
            newCell,
            this.props.index,
            keyResolver,
        );
    }

    handleNewValueChange = (e: any) => {
        this.setState({
            newValue: e.target.value,
        });
    }

    handleDropDownChange = (e: any) => {
        const newValue = e.target.value;
        this.setState({
            newValue,
        });

        const newCell = { ...this.props.data, value: newValue} as ICellDefinition;
        const keyResolver: IKeyResolver = this.createKeyResolver(newValue);
        this.props.handleCellChange(
            newCell,
            this.props.index,
            keyResolver,
        );
    }

    createKeyResolver = ( newValue: any ): IKeyResolver => {
        const keyWasUpdated: boolean = this.props.column.role === ColumnRole.Key;
        return {
            column: this.props.column,
            keyWasUpdated,
            lastValue: this.props.data.value,
            newValue,
        };
    }

    validateCell = (): void => {
        const { column, targetRef } = this.props;
        const { newValue } = this.state;
        const result = validateType( newValue, column.type );

        if(targetRef) {
            if(!targetRef.lookupKeys.some( (c) => {
                if( c.value ) {
                    return c.value.toString() === newValue;
                }

                return false;
            })) {
                this.setState({
                    errorMessages: [`This key does not exists on the sheet: ${targetRef.column.parentSheet}`],
                    isValidType: false,
                });
                return;
            }
        }

        if ( !result.isValid ) {
            this.setState({ isValidType: result.isValid,  errorMessages: [ result.errorMessage ] });
            return;
        } else {
            if ( column.specificValidations.length === 0) {
                this.setState({ isValidType: true,  errorMessages: [ ] });
                return;
            }
            
            for (const validationFunction of column.specificValidations) {
                const customValidationResult = validationFunction( newValue );
                if ( !customValidationResult.isValid ) {
                    this.setState({ isValidType: customValidationResult.isValid,  errorMessages: [ customValidationResult.errorMessage ] });
                    return;
                } else {
                    this.setState({ isValidType: true,  errorMessages: [ ] });
                }
            }
        }
    }
}
