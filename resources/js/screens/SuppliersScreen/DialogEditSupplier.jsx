import React from "react";

import Dialog from "@mui/material/Dialog";
import FormSupplier from "./FormSupplier";
import usePutAPI from "../../hooks/usePutAPI";
import Loading from "../../components/Loading";
import DialogTitle from "@mui/material/DialogTitle";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import DialogContent from "@mui/material/DialogContent";

const DialogEditSupplierForm = ({ supplierId, onSave, onClose, ...props }) => {
    const { request, loading, error, status } = usePutAPI({
        url: `/suppliers/${supplierId}`,
    });

    const onSubmit = async (values) => {
        const res = await request(values);
        if (!res) {
            return;
        }

        onClose();

        if (onSave) {
            onSave(res);
        }
    };

    return (
        <FormSupplier
            {...props}
            onSubmit={onSubmit}
            disabled={loading}
            onClose={onClose}
            errors={status === 422 && error && error.errors}
        />
    );
};

const DialogEditSupplierContent = ({ supplierId, ...props }) => {
    const { response: supplier, loading } = useAutoGetAPI({
        url: `/suppliers/${supplierId}`,
    });

    return (
        <React.Fragment>
            {loading && <Loading message="Cargando..." />}
            {!loading && supplier && (
                <DialogEditSupplierForm
                    {...props}
                    supplierId={supplierId}
                    values={{
                        ...supplier,
                        city: {
                            id: supplier.city.id,
                            label: supplier.city.name,
                        },
                    }}
                />
            )}
        </React.Fragment>
    );
};

const DialogEditSupplier = ({ open, onClose, ...props }) => (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
        <DialogTitle>Editar Proveedor</DialogTitle>
        <DialogContent>
            {open && <DialogEditSupplierContent onClose={onClose} {...props} />}
        </DialogContent>
    </Dialog>
);

export default DialogEditSupplier;
