import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";

import DialogCreatePurchase from "./DialogCreatePurchase";

const ButtonEditPurchase = ({ onSave, purchaseId, ...props }) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DialogCreatePurchase
                open={open}
                onSave={onSave}
                onClose={onClose}
                purchaseId={purchaseId}
            />
            <IconButton {...props} onClick={onOpen}>
                <EditIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default ButtonEditPurchase;
