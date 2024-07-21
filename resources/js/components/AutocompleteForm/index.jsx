import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useForm } from "../Form";

function AutocompleteForm({
    disabled,
    change,
    error,
    errors: errs,
    name,
    options,
    label,
    ...props
}) {
    const formi = useForm();
    const { values, errors, handleBlur, disabled: d, handleChange } = formi;
    const value = values[name] || "";
    error =
        error || errors[name] || (errs && errs[name] && errs[name].join(","));
    disabled = disabled || d;

    const onChange = (e, newValue) => {
        handleChange({
            target: {
                name,
                value: newValue,
            },
        });

        if (change) {
            change(e);
        }
    };

    return (
        <Autocomplete
            {...props}
            options={options}
            value={value}
            disablePortal
            onChange={onChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={error && Boolean(error)}
                    helperText={error}
                    disabled={disabled}
                    label={label}
                />
            )}
        />
    );
}

export default AutocompleteForm;
