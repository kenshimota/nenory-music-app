import * as React from "react";

import Link from "@mui/material/Link";

import AddBoxIcon from "@mui/icons-material/AddBox";

import Format from "../../components/Format";
import ButtonEditSupplier from "./ButtonEditSupplier";
import ShowListData from "../../components/ShowListData";
import ButtonDeleteSupplier from "./ButtonDeleteSupplier";

const columns = [
    { id: "name", title: "Nombre" },
    {
        id: "email",
        title: "Correo Electronico",
        Provider: ({ value }) => <Link href={`mailto:${value}`}>{value}</Link>,
    },
    {
        id: "identity_document",
        title: "Documento de identidad",
        props: { align: "right" },
        Provider: ({ value }) => <Format.DocumentIdentity value={value} />,
    },
    {
        id: "city",
        title: "Ciudad",
        Provider: ({ value }) => value.name,
    },
    {
        id: "created_at",
        title: "Creación",
        props: { align: "right" },
        Provider: ({ value }) => <Format.Date value={value} />,
    },
    {
        id: "updated_at",
        title: "Actualización",
        props: { align: "right" },
        Provider: ({ value }) => <Format.Date value={value} />,
    },
];

const TableProductsActions = ({ row, onSave, ...props }) => (
    <React.Fragment>
        {/*<ButtonEditSupplier supplierId={row.id} onSave={onSave} />
        <ButtonDeleteSupplier supplierId={row.id} onSave={onSave} />*/}
    </React.Fragment>
);

const TableProducts = (props) => (
    <ShowListData
        icon={<AccountCircleIcon />}
        columns={columns}
        firstColumn="name"
        secondColumn="code"
        currentItems={currentItems}
        ComponentActions={TableProductsActions}
        {...props}
    />
);

export default TableProducts;
