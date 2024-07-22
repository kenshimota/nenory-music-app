import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";

import DialogEditIngredient from "./DialogEditIngredient";

const ButtonEditIngredient = ({ onSave, ingredientId, ...props }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DialogEditIngredient
                open={open}
                ingredientId={ingredientId}
                onClose={handleClose}
                onSave={onSave}
            />
            <IconButton {...props} onClick={handleOpen}>
                <EditIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default ButtonEditIngredient;
