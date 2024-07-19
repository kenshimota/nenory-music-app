import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonCommon from "../ButtonCommon";

function DialogConfirmation({
    title,
    content,
    onConfirmation,
    onClose,
    open,
    ...props
}) {
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonCommon onClick={onConfirmation}>Sí</ButtonCommon>
                <ButtonCommon onClick={onClose}>No</ButtonCommon>
            </DialogActions>
        </Dialog>
    );
}

export default DialogConfirmation;
