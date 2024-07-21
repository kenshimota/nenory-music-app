import React from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import { Grid, styled } from "@mui/material";
import Typography from "@mui/material/Typography";

import AvatarCompras from "../../../../img/compras.jpg";
import AvatarUsuario from "../../../../img/usuario.png";
import AvatarProducts from "../../../../img/products.webp";
import AvatarProveedor from "../../../../img/proveedor2.png";
import AvatarIngredients from "../../../../img/ingredients.jpeg";
import ProtectedChild from "../../../components/ProtectedChild";

const GridRoot = styled(Grid)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "auto",
    padding: theme.spacing(1),
}));

const GridItem = styled(Grid)(({ theme }) => ({
    cursor: "pointer",
    margin: theme.spacing(1),
    background: theme.palette.background.paper,
    padding: theme.spacing(1),
    border: `1px solid #ddd`,
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        transition: "0.5s",
    },
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
                    src={src}
                    alt={title}
                    variant="square"
                    style={{ height: 120, width: 120 }}
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
    <GridRoot container justifyContent="center" alignContent="center">
        <ProtectedChild roles={["admin"]}>
            <ButtonMenu title="Usuarios" link="/users" src={AvatarUsuario} />
        </ProtectedChild>

        <ButtonMenu
            title={"Proveedor"}
            link="/suppliers"
            src={AvatarProveedor}
        />
        <ButtonMenu
            title="Ingredientes"
            link="/ingredients"
            src={AvatarIngredients}
        />
        <ButtonMenu title="Productos" link="/products" src={AvatarProducts} />

        <ButtonMenu title="Compras" link="/purchases" src={AvatarCompras} />
    </GridRoot>
);

export default ListaButtons;
