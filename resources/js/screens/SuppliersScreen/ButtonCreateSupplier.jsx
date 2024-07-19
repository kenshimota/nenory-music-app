import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";

import DialogCreateSupplier from "./DialogCreateSupplier";

const ButtonCreateSupplier = ({ onSave, ...props }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DialogCreateSupplier
                open={open}
                onClose={handleClose}
                onSave={onSave}
            />
            <IconButton {...props} onClick={handleOpen}>
                <AddIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default ButtonCreateSupplier;
