import React, { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import IconButton from "@mui/material/IconButton";
import DialogCreateIngredients from "./DialogCreateIngredients";

function ButtonCreateIngredients({ onSave, productId, ...props }) {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DialogCreateIngredients
                open={open}
                onClose={onClose}
                productId={productId}
            />
            <IconButton {...props} onClick={onOpen}>
                <MenuBookIcon />
            </IconButton>
        </React.Fragment>
    );
}

export default ButtonCreateIngredients;
