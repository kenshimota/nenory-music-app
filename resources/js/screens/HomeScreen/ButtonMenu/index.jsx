import React from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import { Grid, styled } from "@mui/material";
import Typography from "@mui/material/Typography";

import AvatarUsuario from "../../../../img/usuario.png";
import AvatarProveedor from "../../../../img/proveedor2.png";

const GridItem = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(1),
    cursor: "pointer",
    background: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: 100,
    border: "1px solid #ddd",
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        transition: "2s",
    },
}));

const GridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}));

function ButtonMenu({ title, src, link }) {
    let navegate = useNavigate();

    function handleClick() {
        navegate(link);
    }

    return (
        <GridItem item onClick={handleClick}>
            <Grid container justifyContent="center">
                <Avatar
                    alt={title}
                    src={src}
                    style={{ height: 100, width: 100 }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography align="center" variant="h5">
                    {title}
                </Typography>
            </Grid>
        </GridItem>
    );
}

const ListaButtons = () => (
    <GridContainer container justifyContent="center">
        <ButtonMenu title={"usuarios"} link="/users" src={AvatarUsuario} />
        <ButtonMenu
            title={"proveedor"}
            link="/suppliers"
            src={AvatarProveedor}
        />
    </GridContainer>
);

export default ListaButtons;