import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";

import DialogCreatePurchase from "./DialogCreatePurchase";
import ProtectedChild from "../../components/ProtectedChild";

const ButtonEditPurchase = ({ onSave, purchaseId, ...props }) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <ProtectedChild roles={["admin"]}>
            <DialogCreatePurchase
                open={open}
                onSave={onSave}
                onClose={onClose}
                purchaseId={purchaseId}
            />
            <IconButton {...props} onClick={onOpen}>
                <EditIcon />
            </IconButton>
        </ProtectedChild>
    );
};

export default ButtonEditPurchase;
