import * as React from "react";
import { ICellDefinition } from "../lib/Cell";
import classnames from "classnames";
import styles from "../styles.css";
import { IColumnDefinition } from "../lib/Column";
import { validateType } from "../lib/validator";

export interface ICellProps {
    data: ICellDefinition;
    index: number;
    column: IColumnDefinition;
    handleCellChange: ( _cell: ICellDefinition, _index: number ) => void;
}

interface ICellState {
    newValue: any;
    isValidType: boolean;
    errorMessages: string[];
}

export default class Cell extends React.Component<ICellProps, ICellState> {
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
        
        if(false) {
            console.log(prevProps);
        }
    }
        
    public render() {
        const { newValue } = this.state;

        return (
            <li className={classnames(styles.rsCol, !this.state.isValidType && styles.isInvalid )}>
                <input type="text" name="" id="" value={newValue} onBlur={this.toggleEditMode} onChange={this.handleNewValueChange}/>
                { this.state.errorMessages.map( (e) => <p>{e}</p>)}
            </li>
        );
    }

    toggleEditMode = () => {
        const newCell = { ...this.props.data, value: this.state.newValue} as ICellDefinition;
        this.props.handleCellChange(
            newCell,
            this.props.index,
        );
    }

    handleNewValueChange = (e: any) => {
        this.setState({
            newValue: e.target.value,
        });
    }

    validateCell = (): void => {
        const { column  } = this.props;
        const { newValue } = this.state;
        const result = validateType( newValue, column.type );

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
