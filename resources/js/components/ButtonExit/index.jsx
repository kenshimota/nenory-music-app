import React from "react";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuth } from "../Auth";

// hola
function ButtonExit() {
    const { clearToken } = useAuth();

    return (
        <React.Fragment>
            <div style={{ flexGrow: 1 }}></div>
            <div className="ml-auto">
                <IconButton aria-label="ExitToApp" onClick={clearToken}>
                    <ExitToAppIcon />
                </IconButton>
            </div>
        </React.Fragment>
    );
}

export default ButtonExit;
