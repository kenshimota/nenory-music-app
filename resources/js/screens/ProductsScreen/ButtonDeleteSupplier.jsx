import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteAPI from "../../hooks/useDeleteAPI";
import DialogConfirmation from "../../components/DialogConfirmation";

function ButtonDeleteSupplier({ supplierId, disabled, onSave, ...props }) {
    const [open, setOpen] = useState(false);
    const { request, loading } = useDeleteAPI({
        url: `/suppliers/${supplierId}`,
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
        <React.Fragment>
            <DialogConfirmation
                open={open}
                onConfirmation={onDelete}
                onClose={() => setOpen(false)}
                title="Eliminar Proveedor"
                content="¿Esta seguro de que desea eliminar este proveedor?"
            />
            <IconButton
                disabled={disabled}
                aria-label="Delete"
                onClick={() => setOpen(true)}
                {...props}
            >
                <DeleteIcon />
            </IconButton>
        </React.Fragment>
    );
}

export default ButtonDeleteSupplier;
