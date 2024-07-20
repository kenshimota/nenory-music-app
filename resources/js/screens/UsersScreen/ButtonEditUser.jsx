import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import styled from "@mui/material/styles/styled";

import EditIcon from "@mui/icons-material/Edit";

import DialogEditUser from "./DialogEditUser";

function ButtonEditUser({ onSave, userId, ...props }) {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton onClick={onOpen} {...props}>
                <EditIcon />
            </IconButton>
            <DialogEditUser
                open={open}
                userId={userId}
                onSave={onSave}
                onClose={onClose}
            />
        </React.Fragment>
    );
}

export default ButtonEditUser;
