import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { TextField } from "@mui/material";

const TextFieldC = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const InputSearch = (props) => (
    <TextFieldC
        variant="outlined"
        InputProps={{ endAdornment: <SearchIcon /> }}
        {...props}
    />
);

export default InputSearch;
