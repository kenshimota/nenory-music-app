import React from "react";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useForm } from "../Form";

const Input = ({ name, onChange: change, error: r, ...props }) => {
    const formi = useForm();
    const { values, errors, handleBlur, handleChange } = formi;
    const value = values[name] || "";
    const error = errors[name] || r || null;

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
                {...props}
            />
        </FormControl>
    );
};

export default Input;
