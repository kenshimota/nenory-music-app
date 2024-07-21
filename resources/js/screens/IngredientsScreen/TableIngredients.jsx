import * as React from "react";

import AddBoxIcon from "@mui/icons-material/AddBox";

import Format from "../../components/Format";
import ShowListData from "../../components/ShowListData";
import ButtonEditIngredient from "./ButtonEditIngredient";
import ButtonDeleteIngredient from "./ButtonDeleteIngredient";

const columns = [
    { id: "name", title: "Nombre" },
    {
        id: "stock",
        title: "Existencia",
        props: { align: "right" },
        Provider: ({ value, row }) => (
            <React.Fragment>
                <Format.Number value={value} /> {row.measure.abreviated}
            </React.Fragment>
        ),
    },
    {
        id: "created_at",
        title: "Creación",
        props: { align: "right" },
        Provider: ({ value }) => <Format.DateTime value={value} />,
    },
    {
        id: "updated_at",
        title: "Actualización",
        props: { align: "right" },
        Provider: ({ value }) => <Format.DateTime value={value} />,
    },
];

const TableIngredientsActions = ({ row, onSave, ...props }) => (
    <React.Fragment>
        <ButtonEditIngredient ingredientId={row.id} onSave={onSave} />
        <ButtonDeleteIngredient ingredientId={row.id} onSave={onSave} />
    </React.Fragment>
);

const TableIngredients = (props) => (
    <ShowListData
        icon={<AddBoxIcon />}
        columns={columns}
        firstColumn="name"
        secondColumn="stock"
        ComponentActions={TableIngredientsActions}
        {...props}
    />
);

export default TableIngredients;
