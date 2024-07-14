import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@mui/material/styles/styled";

const ButtonCommon = ({ loading, children, ...props }) => (
    <Button variant="contained" {...props}>
        {!loading && children}
        {loading && (
            <CircularProgress
                size={24}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    color: "#fff",
                    marginTop: -12,
                    marginLeft: -12,
                }}
            />
        )}
    </Button>
);

export default ButtonCommon;
