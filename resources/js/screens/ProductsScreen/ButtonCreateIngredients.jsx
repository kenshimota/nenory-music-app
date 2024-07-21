import React, { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import IconButton from "@mui/material/IconButton";
import DialogCreateIngredients from "./DialogCreateIngredients";

function ButtonCreateIngredients({ onSave, productId, ...props }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <DialogCreateIngredients open={open} />
            <IconButton {...props} onClick={handleOpen}>
                <MenuBookIcon />
            </IconButton>
        </React.Fragment>
    );
}

export default ButtonCreateIngredients;
