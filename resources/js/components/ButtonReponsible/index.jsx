import * as React from "react";
import Hidden from "@mui/material/Hidden";

import ButtonCommon from "../ButtonCommon";
import IconButton from "@mui/material/IconButton";

const ButtonReponsible = ({ icon, fullWidth, children, ...props }) => (
    <React.Fragment>
        <Hidden mdUp>
            <ButtonCommon {...props} endIcon={icon} fullWidth={fullWidth}>
                {children}
            </ButtonCommon>
        </Hidden>
        <Hidden smDown>
            <IconButton {...props}>{icon}</IconButton>
        </Hidden>
    </React.Fragment>
);

export default ButtonReponsible;
