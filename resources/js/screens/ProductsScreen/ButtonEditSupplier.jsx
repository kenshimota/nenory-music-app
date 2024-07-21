import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";

import DialogEditSupplier from "./DialogEditSupplier";

const ButtonEditSupplier = ({ onSave, supplierId, ...props }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DialogEditSupplier
                open={open}
                supplierId={supplierId}
                onClose={handleClose}
                onSave={onSave}
            />
            <IconButton {...props} onClick={handleOpen}>
                <EditIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default ButtonEditSupplier;
