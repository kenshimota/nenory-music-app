import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import styled from "@mui/material/styles/styled";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import FormCreateUser from "./FormCreateUser";

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

const AddIconStyled = styled(AddIcon)(({ theme }) => ({
    color: "white",
}));

function ButtonCreate(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <IconButtonStyled aria-label="Add" onClick={handleClickOpen}>
                <AddIconStyled />
            </IconButtonStyled>
            <Dialog open={open} onClose={handleClose}>
                <FormCreateUser />
            </Dialog>
        </div>
    );
}
//<DialogTitle>Crear Usuario</DialogTitle>
export default ButtonCreate;
