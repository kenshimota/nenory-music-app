import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { useForm } from "../Form";

const Input = ({
    name,
    onChange: change,
    error,
    errors: errs,
    disabled,
    ...props
}) => {
    const formi = useForm();
    const { values, errors, handleBlur, disabled: d, handleChange } = formi;
    const value = values[name] || "";
    error =
        error || errors[name] || (errs && errs[name] && errs[name].join(","));
    disabled = disabled || d;

    const onChange = (e) => {
        handleChange(e);
        if (change) {
            change(e);
        }
    };

    return (
        <FormControl fullWidth>
            <TextField
                variant="standard"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                error={error && Boolean(error)}
                helperText={error}
                disabled={disabled}
                {...props}
            />
        </FormControl>
    );
};

export default Input;
