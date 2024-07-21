import * as yup from "yup";
import * as React from "react";

import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import FormUser from "./FormUser";
import Loading from "../../components/Loading";
import usePutAPI from "../../hooks/usePutAPI";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";

const schema = yup.object().shape({
    role_id: yup
        .number()
        .required("Debe selecccionar un tipo de usuario")
        .typeError("Valor seleccionado es invalido"),
    last_name: yup.string().required("El campo es requerido"),
    name: yup.string().required("El campo es requerido"),
    identity_document: yup
        .number()
        .positive("el valor ingresado debe de ser positivo")
        .required("El campo es requerido"),
});

const DialogEditUserContentForm = ({ userId, onSave, onClose, ...props }) => {
    const { request, loading, status, error } = usePutAPI({
        url: `/users/${userId}`,
    });

    const onSubmit = async (values) => {
        const res = await request({ ...values });
        if (!res) {
            return;
        }

        onClose();

        if (onSave) {
            onSave(res);
        }
    };

    return (
        <Grid container>
            {status === 500 && (
                <Grid item xs={12}>
                    <Typography variant="body1" color="error">
                        Ha ocurrido un error inhesperado, por favor contacte al
                        proveedor
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                <FormUser
                    // schema={schema}
                    hideEmail
                    hideUsername
                    hidePasssword
                    disabled={loading}
                    onSubmit={onSubmit}
                    onClose={onClose}
                    errors={status === 422 && error && error.errors}
                    {...props}
                />
            </Grid>
        </Grid>
    );
};

const DialogEditUserContent = ({ userId, ...props }) => {
    const { response, loading } = useAutoGetAPI({
        url: `/users/${userId}`,
    });

    return (
        <React.Fragment>
            {loading && <Loading message="Cargando..." />}
            {!loading && response && (
                <DialogEditUserContentForm
                    {...props}
                    userId={userId}
                    values={{
                        name: response.name,
                        last_name: response.last_name,
                        role_id: response.role_id,
                        identity_document: response.identity_document,
                    }}
                />
            )}
        </React.Fragment>
    );
};

const DialogEditUser = ({ open, onClose, ...props }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
            <DialogEditUserContent {...props} onClose={onClose} />
        </DialogContent>
    </Dialog>
);

export default DialogEditUser;
