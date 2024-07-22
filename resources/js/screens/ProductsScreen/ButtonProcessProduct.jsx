import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";

import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";

import DialogProcessProduct from "./DialogProcessProduct";

const ButtonProcessProduct = ({ productId, onSave, ...props }) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DialogProcessProduct
                open={open}
                onClose={onClose}
                productId={productId}
                onSave={onSave}
            />
            <IconButton onClick={onOpen} {...props}>
                <SoupKitchenIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default ButtonProcessProduct;
