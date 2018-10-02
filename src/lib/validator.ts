
export interface IValidateTypeResult {
    isValid: boolean;
    errorMessage: string;
}

export const validateType = (_value: any, _type: string ): IValidateTypeResult => undefinedCheck( _value, _type );

const undefinedCheck = ( _value: any, _type: string ): IValidateTypeResult => {
    if ( typeof _value === "undefined")
        return {
            errorMessage: "This field cannot be empty",
            isValid: false,
        };

    return types[ _type.toLowerCase() ]( _value === "" ? _value : (_value.toString()).toLowerCase() );
};


const parseString = ( _value: any ): IValidateTypeResult => {
    return {
        errorMessage: "",
        isValid: true,       
    };
};

const parseNumber = ( _value: any ): IValidateTypeResult => {
    if ( isNaN(_value) || _value === "")
        return {
            errorMessage: "This value should be a number like '123' or '52323' but is not",
            isValid: false,
        };

    return {
        errorMessage: "",
        isValid: true,
    };
};

const parseCurrency = ( _value: any ): IValidateTypeResult => {
    const regex  = /^\d+(?:\.\d{0,2})$/;
    if ( !regex.test(_value) )
        return {
            errorMessage: "Invalid format for currency, shoould be: '22332.23' or '10.02'",
            isValid: false,
        };

    return {
        errorMessage: "",
        isValid: true,
    };
};

const parseDate = ( _value: any ): IValidateTypeResult => {
    return {
        errorMessage: "",
        isValid: true,
    };
};

const parseBoolean = ( _value: any ): IValidateTypeResult => {
    if ( _value !== "true" || _value !== "false" )
        return {
            errorMessage: "Invalid format of a boolean, allowed types: 'true' or 'false'",
            isValid: false,
        };
    
    return {
        errorMessage: "",
        isValid: true,
    };
};

const parseKeyType = ( _value: any ): IValidateTypeResult => {
    if ( _value === "" || _value.match(/^ *$/) !== null)
        return {
            errorMessage: "Key field cannot be left empty",
            isValid: false,
        };
    
    return {
        errorMessage: "",
        isValid: true,
    };
};



interface IValidateAvailableTypes {
    string: ( value: any ) => IValidateTypeResult;
    number: ( value: any ) => IValidateTypeResult;
    currency: ( value: any ) => IValidateTypeResult;
    date: ( value: any ) => IValidateTypeResult;
    boolean: ( value: any ) => IValidateTypeResult;
    key: ( value: any ) => IValidateTypeResult;
    refkey: ( value: any ) => IValidateTypeResult;
}

const types: IValidateAvailableTypes = {
    boolean: parseBoolean,
    currency: parseCurrency,
    date: parseDate,
    key: parseKeyType,
    number: parseNumber,
    refkey: parseKeyType,
    string: parseString,
};

