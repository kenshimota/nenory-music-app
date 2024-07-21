import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteAPI from "../../hooks/useDeleteAPI";
import DialogConfirmation from "../../components/DialogConfirmation";
import ProtectedChild from "../../components/ProtectedChild";

function ButtonDeletePurchase({ purchaseId, disabled, onSave, ...props }) {
    const [open, setOpen] = useState(false);
    const { request, loading } = useDeleteAPI({
        url: `/purchases/${purchaseId}`,
    });
    disabled = disabled || loading;

    const onDelete = async () => {
        const res = await request();

        setOpen(false);

        if (onSave) {
            onSave(res);
        }
    };

    return (
        <ProtectedChild roles={["admin"]}>
            <DialogConfirmation
                open={open}
                onConfirmation={onDelete}
                onClose={() => setOpen(false)}
                title="Eliminar Compra"
                content="¿Esta seguro de que desea eliminar la siguiente compra?"
            />
            <IconButton
                disabled={disabled}
                aria-label="Delete"
                onClick={() => setOpen(true)}
                {...props}
            >
                <DeleteIcon />
            </IconButton>
        </ProtectedChild>
    );
}

export default ButtonDeletePurchase;
