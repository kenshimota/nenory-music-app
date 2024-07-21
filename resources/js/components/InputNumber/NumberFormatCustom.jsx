import React from "react";
import * as ReactNumberFormat from "react-number-format";

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    const handleChange = (values) =>
        onChange({ target: { name: props.name, value: values.value || null } });

    return (
        <ReactNumberFormat.NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            onValueChange={handleChange}
            {...other}
        />
    );
}

export default NumberFormatCustom;
