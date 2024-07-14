import React from "react";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useAuth } from "../Auth";

function ButtonExit(props) {
    const { clearToken } = useAuth();

    return (
        <React.Fragment>
            <IconButton aria-label="ExitToApp" onClick={clearToken} {...props}>
                <ExitToAppIcon />
            </IconButton>
        </React.Fragment>
    );
}

export default ButtonExit;
