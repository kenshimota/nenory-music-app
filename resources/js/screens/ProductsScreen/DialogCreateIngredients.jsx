import React from "react";
import Dialog from "@mui/material/Dialog";
import MainPage from "../../components/MainPage";

function DialogCreateIngredientsContent({ open, onClose, ...props }) {
    return (
        <MainPage title={"Agregar Ingredientes"}>
            {open && <p>Hola soy el contenido</p>}
        </MainPage>
    );
}

function DialogCreateIngredients({ open, onClose, ...props }) {
    return (
        <Dialog open={open} fullScreen onClose={onClose}>
            <DialogCreateIngredientsContent />
            <p>Hola soy un Dialog</p>
        </Dialog>
    );
}

export default DialogCreateIngredients;
