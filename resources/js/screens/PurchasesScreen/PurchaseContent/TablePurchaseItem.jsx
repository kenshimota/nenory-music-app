import React from "react";

import Format from "../../../components/Format";
import ShowListData from "../../../components/ShowListData";
import ButtonRemoveItem from "./ButtonRemoveItem";

const columns = [
    {
        id: "ingredient",
        title: "Producto",
        Provider: ({ value }) => value.name,
    },
    {
        id: "quantity",
        title: "Cantidad",
        Provider: ({ value }) => <Format.Number value={value} />,
    },
    {
        id: "measure",
        title: "Unidad",
        Provider: ({ value }) => value.abreviated,
    },
    {
        id: "cost",
        title: "Costo",
        Provider: ({ value }) => <Format.Number value={value} />,
    },
];

const TablePurchaseItemsActions = ({ row, onSave }) => (
    <React.Fragment>
        <ButtonRemoveItem productId={row.id} onSave={onSave} />
    </React.Fragment>
);

const TablePurchaseItems = (props) => (
    <ShowListData
        firstColumn="ingredient"
        secondColumn="cost"
        columns={columns}
        ComponentActions={TablePurchaseItemsActions}
        {...props}
    />
);

export default TablePurchaseItems;
