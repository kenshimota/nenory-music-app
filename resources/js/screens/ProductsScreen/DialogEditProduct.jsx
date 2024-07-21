import React from "react";

import Dialog from "@mui/material/Dialog";

import FormProduct from "./FormProduct";
import usePutAPI from "../../hooks/usePutAPI";
import Loading from "../../components/Loading";
import DialogTitle from "@mui/material/DialogTitle";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import DialogContent from "@mui/material/DialogContent";

const DialogEditProductForm = ({ productId, onSave, onClose, ...props }) => {
    const { request, loading, error, status } = usePutAPI({
        url: `/products/${productId}`,
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
        <FormProduct
            {...props}
            onSubmit={onSubmit}
            disabled={loading}
            onClose={onClose}
            errors={status === 422 && error && error.errors}
        />
    );
};

const DialogEditProductContent = ({ productId, ...props }) => {
    const { response: product, loading } = useAutoGetAPI({
        url: `/products/${productId}`,
    });

    return (
        <React.Fragment>
            {loading && <Loading message="Cargando..." />}
            {!loading && product && (
                <DialogEditProductForm
                    {...props}
                    productId={productId}
                    values={{
                        name: product.name,
                        code: product.code,
                    }}
                />
            )}
        </React.Fragment>
    );
};

const DialogEditProduct = ({ open, onClose, ...props }) => (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
            {open && <DialogEditProductContent onClose={onClose} {...props} />}
        </DialogContent>
    </Dialog>
);

export default DialogEditProduct;
