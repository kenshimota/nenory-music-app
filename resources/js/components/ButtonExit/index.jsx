import React from "react";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useAuth } from "../Auth";

function ButtonExit() {
    const { clearToken } = useAuth();

    return (
        <IconButton aria-label="ExitToApp" onClick={clearToken}>
            <ExitToAppIcon />
        </IconButton>
    );
}

export default ButtonExit;
