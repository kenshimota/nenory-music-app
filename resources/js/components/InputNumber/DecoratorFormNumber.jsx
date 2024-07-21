import React from "react";
import NumberFormatCustom from "./NumberFormatCustom";

const DecoratorFormatNumber =
    (Component) =>
    ({
        decimalScale,
        prefix,
        suffix,
        fixedDecimalScale,
        InputProps = {},
        ...props
    }) => {
        InputProps.inputComponent = NumberFormatCustom;
        InputProps.inputProps = {
            prefix,
            suffix,
            decimalScale,
            fixedDecimalScale,
            ...InputProps.inputProps,
        };

        return <Component {...props} InputProps={InputProps} />;
    };

export default DecoratorFormatNumber;
