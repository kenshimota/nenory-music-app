import * as React from "react";

import Link from "@mui/material/Link";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Format from "../../components/Format";
import ShowListData from "../../components/ShowListData";
import ButtonEditSupplier from "./ButtonEditSupplier";
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
        Provider: ({ value }) => <Format.DateTime value={value} />,
    },
    {
        id: "updated_at",
        title: "Actualización",
        props: { align: "right" },
        Provider: ({ value }) => <Format.DateTime value={value} />,
    },
];

const TableSuppliersActions = ({ row, onSave, ...props }) => (
    <React.Fragment>
        <ButtonEditSupplier supplierId={row.id} onSave={onSave} />
        <ButtonDeleteSupplier supplierId={row.id} onSave={onSave} />
    </React.Fragment>
);

const TableSuppliers = ({ currentItems, ...props }) => {
    currentItems = currentItems.map((current) => ({
        ...current,
        fullName: `${current.name} ${current.last_name}`,
    }));

    return (
        <ShowListData
            icon={<AccountCircleIcon />}
            columns={columns}
            firstColumn="name"
            secondColumn="email"
            currentItems={currentItems}
            ComponentActions={TableSuppliersActions}
            {...props}
        />
    );
};

export default TableSuppliers;
