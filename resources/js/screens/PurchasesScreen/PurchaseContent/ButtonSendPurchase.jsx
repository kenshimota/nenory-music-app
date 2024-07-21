import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";

import SendIcon from "@mui/icons-material/Send";

import usePutAPI from "../../../hooks/usePutAPI";
import DialogConfirmation from "../../../components/DialogConfirmation";

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

const SendIconStyled = styled(SendIcon)(({ theme }) => ({
    color: "white",
}));

const ButtonSendPurchase = ({ onSave, disabled, purchaseId, ...props }) => {
    const [open, setOpen] = useState(false);
    const { request, loading } = usePutAPI({
        url: `/purchases/${purchaseId}`,
    });

    disabled = disabled || loading;

    const onSend = async () => {
        const res = await request({});
        if (!res) {
            return;
        }

        setOpen(false);

        if (onSave) {
            onSave(res);
        }
    };

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <DialogConfirmation
                open={open}
                onConfirmation={onSend}
                onClose={onClose}
                title="Completar Compra"
                content="¿Esta seguro de que desea terminar esta compra?"
            />
            <IconButtonStyled disabled={disabled} {...props} onClick={onOpen}>
                <SendIconStyled />
            </IconButtonStyled>
        </React.Fragment>
    );
};

export default ButtonSendPurchase;
