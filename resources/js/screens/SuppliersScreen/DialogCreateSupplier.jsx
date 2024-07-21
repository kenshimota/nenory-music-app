import React from "react";

import Dialog from "@mui/material/Dialog";
import FormSupplier from "./FormSupplier";
import usePostAPI from "../../hooks/usePostAPI";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const DialogCreateSupplierContent = ({ onSave, onClose, ...props }) => {
    const { request, loading, error, status } = usePostAPI({
        url: "/suppliers",
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
            onSubmit={onSubmit}
            disabled={loading}
            onClose={onClose}
            errors={status === 422 && error && error.errors}
        />
    );
};

const DialogCreateSupplier = ({ open, onClose, ...props }) => (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
        <DialogTitle>Nuevo Proveedor</DialogTitle>
        <DialogContent>
            <DialogCreateSupplierContent onClose={onClose} {...props} />
        </DialogContent>
    </Dialog>
);

export default DialogCreateSupplier;
