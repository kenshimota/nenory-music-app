import React from "react";
import Dialog from "@mui/material/Dialog";
import MainPage from "../../components/MainPage";
import ProductsIngredientsContents from "./ProductsIngredientsContent.jsx";

function DialogCreateIngredientsContent({ open, onClose, ...props }) {
    return (
        <MainPage subtitle="Ingredientes de producto" isBack onBack={onClose}>
            {open && (
                <ProductsIngredientsContents {...props} onClose={onClose} />
            )}
        </MainPage>
    );
}

function DialogCreateIngredients({ open, onClose, ...props }) {
    return (
        <Dialog open={open} fullScreen onClose={onClose}>
            <DialogCreateIngredientsContent
                open={open}
                onClose={onClose}
                {...props}
            />
        </Dialog>
    );
}

export default DialogCreateIngredients;
