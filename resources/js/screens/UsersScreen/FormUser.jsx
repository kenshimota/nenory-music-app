import React from "react";

import { Grid } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import Form from "../../components/Form";
import Input from "../../components/Input";
import InputPass from "../../components/InputPass";
import ButtonCommon from "../../components/ButtonCommon";
import SelectRole from "../../components/SelectRole";

const FormUser = ({
    onClose,
    disabled,
    errors,
    hidePasssword,
    hideEmail,
    hideUsername,
    ...props
}) => (
    <Form disabled={disabled} {...props}>
        <Grid container spacing={1} justifyContent="Center">
            {!hideUsername && (
                <Grid item xs={12}>
                    <Input
                        name="username"
                        label="Usuario"
                        type="text"
                        errors={errors}
                    />
                </Grid>
            )}
            <Grid item xs={12}>
                <SelectRole label="Tipo de Usuario" name="role_id" />
            </Grid>
            <Grid item xs={12}>
                <Input name="name" label="Nombre" type="text" errors={errors} />
            </Grid>
            <Grid item xs={12}>
                <Input
                    name="last_name"
                    label="Apellido"
                    type="text"
                    errors={errors}
                />
            </Grid>
            {!hideEmail && (
                <Grid item xs={12}>
                    <Input
                        name="email"
                        label="Correo Electronico"
                        type="text"
                        errors={errors}
                    />
                </Grid>
            )}
            <Grid item xs={12}>
                <Input
                    name="identity_document"
                    label="Cedula de identidad"
                    type="text"
                    errors={errors}
                />
            </Grid>
            {!hidePasssword && (
                <Grid item xs={12}>
                    <InputPass
                        name="password"
                        label="Contraseña"
                        type="text"
                        errors={errors}
                    />
                </Grid>
            )}
            <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                    <ButtonCommon
                        startIcon={<CloseIcon />}
                        disabled={disabled}
                        onClick={onClose}
                    >
                        Cancelar
                    </ButtonCommon>
                    <ButtonCommon
                        endIcon={<SaveIcon />}
                        disabled={disabled}
                        type="submit"
                    >
                        Guardar
                    </ButtonCommon>
                </Grid>
            </Grid>
        </Grid>
    </Form>
);

export default FormUser;
