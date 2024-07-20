import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import styled from "@mui/material/styles/styled";

import AddIcon from "@mui/icons-material/Add";

import DialogCreateUser from "./DialogCreateUser";

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

const AddIconStyled = styled(AddIcon)(({ theme }) => ({
    color: "white",
}));

function ButtonCreate({ onSave, ...props }) {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <IconButtonStyled aria-label="Add" onClick={onOpen} {...props}>
                <AddIconStyled />
            </IconButtonStyled>
            <DialogCreateUser open={open} onSave={onSave} onClose={onClose} />
        </React.Fragment>
    );
}
//<DialogTitle>Crear Usuario</DialogTitle>
export default ButtonCreate;
