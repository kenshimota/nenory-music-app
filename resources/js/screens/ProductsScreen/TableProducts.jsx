import * as React from "react";

import Link from "@mui/material/Link";

import AddBoxIcon from "@mui/icons-material/AddBox";

import Format from "../../components/Format";
import ButtonEditProduct from "./ButtonEditProduct";
import ShowListData from "../../components/ShowListData";
import ButtonDeleteProduct from "./ButtonDeleteProduct";

const columns = [
    { id: "code", title: "Codigo" },
    { id: "name", title: "Nombre" },
    {
        id: "stock",
        title: "Existencia",
        props: { align: "right" },
        Provider: ({ value }) => <Format.Number value={value} />,
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

const TableProductsActions = ({ row, onSave, ...props }) => (
    <React.Fragment>
        <ButtonEditProduct productId={row.id} onSave={onSave} />
        <ButtonDeleteProduct productId={row.id} onSave={onSave} />
    </React.Fragment>
);

const TableProducts = (props) => (
    <ShowListData
        icon={<AddBoxIcon />}
        columns={columns}
        firstColumn="name"
        secondColumn="code"
        ComponentActions={TableProductsActions}
        {...props}
    />
);

export default TableProducts;
