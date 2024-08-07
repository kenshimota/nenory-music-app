import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";

import DialogEditProduct from "./DialogEditProduct";

const ButtonEditProduct = ({ onSave, productId, ...props }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DialogEditProduct
                open={open}
                productId={productId}
                onClose={handleClose}
                onSave={onSave}
            />
            <IconButton {...props} onClick={handleOpen}>
                <EditIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default ButtonEditProduct;
