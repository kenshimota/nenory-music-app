import dayjs from "dayjs";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useForm } from "../Form";

const DatePickerForm = ({
    name,
    onChange: change,
    error,
    label,
    errors: errs,
    disabled,
    ...props
}) => {
    const formi = useForm();

    const { values, errors, handleBlur, disabled: d, handleChange } = formi;
    const value = values[name] || undefined;
    error =
        error || errors[name] || (errs && errs[name] && errs[name].join(","));
    disabled = disabled || d;
    const [valueAux, setValueAux] = useState(
        (value && dayjs(new Date(value))) || null
    );

    const onChange = (e) => {
        handleChange(e);
        if (change) {
            change(e);
        }
    };

    return (
        <FormControl fullWidth variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                        label={label}
                        name={name}
                        format="DD/MM/YYYY"
                        value={valueAux}
                        onChange={(newValue) => {
                            setValueAux(newValue);
                            onChange({ target: { name, value: newValue.$d } });
                        }}
                        onBlur={handleBlur}
                        error={error && Boolean(error)}
                        helperText={error}
                        disabled={disabled}
                        {...props}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </FormControl>
    );
};

export default DatePickerForm;
