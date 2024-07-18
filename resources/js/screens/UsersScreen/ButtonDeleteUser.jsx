import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteAPI from "../../hooks/useDeleteAPI";

function ButtonDeleteUser({ userId, disabled, onSave, ...props }) {
    const { request, loading } = useDeleteAPI({ url: `/users/${userId}` });
    disabled = disabled || loading;

    const onClickDelete = async () => {
        const res = await request();
        if (onSave) {
            onSave(res);
        }
    };

    return (
        <React.Fragment>
            <IconButton
                disabled={disabled}
                aria-label="Delete"
                onClick={onClickDelete}
            >
                <DeleteIcon />
            </IconButton>
        </React.Fragment>
    );
}

export default ButtonDeleteUser;
