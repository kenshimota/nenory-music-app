import { v4 } from "uuid";
import React, { useState } from "react";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import { useForm } from "../Form";

const SelectForm = ({
    name,
    onChange: change,
    error,
    label,
    errors: errs,
    disabled,
    children,
    ...props
}) => {
    const formi = useForm();
    const [labelId] = useState(v4());
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
        <FormControl variant="standard" fullWidth>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                disabled={disabled}
                {...props}
            >
                {children}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};

export default SelectForm;
