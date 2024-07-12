import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const ButtonCommon = ({ loading, children, ...props }) => (
    <Button variant="contained" {...props}>
        {children}
        {loading && (
            <CircularProgress
                size={24}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -12,
                    marginLeft: -12,
                }}
            />
        )}
    </Button>
);

export default ButtonCommon;
