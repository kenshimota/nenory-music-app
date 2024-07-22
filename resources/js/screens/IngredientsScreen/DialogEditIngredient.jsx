import React from "react";

import Dialog from "@mui/material/Dialog";

import FormIngredient from "./FormIngredient";
import usePutAPI from "../../hooks/usePutAPI";
import Loading from "../../components/Loading";
import DialogTitle from "@mui/material/DialogTitle";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import DialogContent from "@mui/material/DialogContent";

const DialogEditIngredientForm = ({
    ingredientId,
    onSave,
    onClose,
    ...props
}) => {
    const { request, loading, error, status } = usePutAPI({
        url: `/ingredients/${ingredientId}`,
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
        <FormIngredient
            {...props}
            onSubmit={onSubmit}
            disabled={loading}
            onClose={onClose}
            errors={status === 422 && error && error.errors}
        />
    );
};

const DialogEditIngredientContent = ({ ingredientId, ...props }) => {
    const { response: ingredient, loading } = useAutoGetAPI({
        url: `/ingredients/${ingredientId}`,
    });

    return (
        <React.Fragment>
            {loading && <Loading message="Cargando..." />}
            {!loading && ingredient && (
                <DialogEditIngredientForm
                    {...props}
                    ingredientId={ingredientId}
                    values={{
                        name: ingredient.name,
                        measure_id: ingredient.measure_id,
                    }}
                />
            )}
        </React.Fragment>
    );
};

const DialogEditIngredient = ({ open, onClose, ...props }) => (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
            {open && (
                <DialogEditIngredientContent onClose={onClose} {...props} />
            )}
        </DialogContent>
    </Dialog>
);

export default DialogEditIngredient;
