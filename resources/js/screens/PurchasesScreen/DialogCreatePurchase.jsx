import React from "react";

import Dialog from "@mui/material/Dialog";
import MainPage from "../../components/MainPage";
import PurchaseContent from "./PurchaseContent";

const DialogCreatePurchaseContent = ({
    open,
    onClose,
    isEdit,
    onSave,
    ...props
}) => {
    const handleClose = () => {
        onClose();

        if (onSave) {
            onSave();
        }
    };

    console.log(onSave);

    return (
        <MainPage
            title={`${isEdit ? "Editar" : "Creat"} Nueva Compra`}
            onBack={handleClose}
            isBack
        >
            {open && (
                <PurchaseContent
                    onSave={onSave}
                    onClose={handleClose}
                    {...props}
                />
            )}
        </MainPage>
    );
};
const DialogCreatePurchase = ({ open, onClose, ...props }) => (
    <Dialog open={open} fullScreen onClose={onClose}>
        <DialogCreatePurchaseContent open={open} onClose={onClose} {...props} />
    </Dialog>
);

export default DialogCreatePurchase;
