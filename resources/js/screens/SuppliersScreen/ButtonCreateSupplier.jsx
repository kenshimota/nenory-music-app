import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";

import AddIcon from "@mui/icons-material/Add";

import DialogCreateSupplier from "./DialogCreateSupplier";

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

const AddIconStyled = styled(AddIcon)(({ theme }) => ({
    color: "white",
}));

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
            <IconButtonStyled {...props} onClick={handleOpen}>
                <AddIconStyled />
            </IconButtonStyled>
        </React.Fragment>
    );
};

export default ButtonCreateSupplier;
