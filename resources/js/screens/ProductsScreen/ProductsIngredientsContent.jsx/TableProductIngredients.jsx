import React from "react";

import FoodBankIcon from "@mui/icons-material/FoodBank";

import Format from "../../../components/Format";
import ShowListData from "../../../components/ShowListData";
import ButtonRemoveIngredient from "./ButtonRemoveIngredient";

const columns = [
    {
        id: "ingredient",
        title: "Ingrediente",
        Provider: ({ value }) => value.name,
    },
    {
        id: "quantity",
        title: "Cantidad",
        Provider: ({ value }) => <Format.Number value={value} />,
    },
    {
        id: "measure",
        title: "Medida",
        Provider: ({ value }) => value.abreviated,
    },
    {
        id: "created_at",
        title: "Creado",
        Provider: ({ value }) => <Format.DateTime value={value} />,
    },
    {
        id: "updated_at",
        title: "Actualizado",
        Provider: ({ value }) => <Format.DateTime value={value} />,
    },
];

const TableProductIngredientsActions = ({ row, onSave }) => (
    <React.Fragment>
        <ButtonRemoveIngredient ingredientId={row.id} onSave={onSave} />
    </React.Fragment>
);

const TableProductIngredients = (props) => (
    <ShowListData
        columns={columns}
        icon={<FoodBankIcon />}
        firstColumn="ingredient"
        secondColumn="quantity"
        ComponentActions={TableProductIngredientsActions}
        {...props}
    />
);

export default TableProductIngredients;
