import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function NativeSelectDemo() {
    return (
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Tipo de usuario
            </InputLabel>
            <NativeSelect defaultValue={3}>
                <option value={3}></option>
                <option value={1}>Administrador</option>
                <option value={2}>Empleado</option>
            </NativeSelect>
        </FormControl>
    );
}
