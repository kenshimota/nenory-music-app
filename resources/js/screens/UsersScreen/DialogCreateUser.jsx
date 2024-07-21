import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import FormCreateUser from "./FormCreateUser";

const DialogCreateUser = ({ open, onClose, ...props }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Crear Usuario</DialogTitle>
        <DialogContent>
            <FormCreateUser {...props} onClose={onClose} />
        </DialogContent>
    </Dialog>
);

export default DialogCreateUser;
