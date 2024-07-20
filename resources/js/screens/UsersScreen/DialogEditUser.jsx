import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import FormUser from "./FormUser";
import Loading from "../../components/Loading";
import usePutAPI from "../../hooks/usePutAPI";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";

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
        <FormUser
            hideEmail
            hideUsername
            hidePasssword
            disabled={loading}
            onSubmit={onSubmit}
            onClose={onClose}
            errors={status === 422 && error && error.errors}
            {...props}
        />
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
