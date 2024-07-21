import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";

import AddIcon from "@mui/icons-material/Add";

import DialogAddItem from "./DialogAddItem";

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

const AddIconStyled = styled(AddIcon)(({ theme }) => ({
    color: "white",
}));

const ButtonAddItem = ({ onSave, purchaseId, ...props }) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DialogAddItem
                open={open}
                onClose={onClose}
                purchaseId={purchaseId}
                onSave={onSave}
            />
            <IconButtonStyled {...props} onClick={onOpen}>
                <AddIconStyled />
            </IconButtonStyled>
        </React.Fragment>
    );
};

export default ButtonAddItem;
