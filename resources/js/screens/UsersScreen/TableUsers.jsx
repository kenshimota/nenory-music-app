import * as React from "react";
import Link from "@mui/material/Link";

import Format from "../../components/Format";
import ButtonDeleteUser from "./ButtonDeleteUser";
import ShowListData from "../../components/ShowListData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonEditUser from "./ButtonEditUser";

const columns = [
    {
        id: "role",
        title: "Tipo de usuario",
        Provider: ({ value }) => value.description,
    },
    { id: "username", title: "Usuario" },
    {
        id: "email",
        title: "Correo Electronico",

        Provider: ({ value }) => <Link href={`mailto:${value}`}>{value}</Link>,
    },
    { id: "name", title: "Nombre" },
    { id: "last_name", title: "Apellido" },
    {
        id: "identity_document",
        title: "Documento de identidad",
        props: { align: "right" },
        Provider: ({ value }) => <Format.DocumentIdentity value={value} />,
    },
    {
        id: "created_at",
        title: "Fecha de creación",
        props: { align: "right" },
        Provider: ({ value }) => <Format.DateTime value={value} />,
    },
    {
        id: "updated_at",
        title: "Fecha de actualización",
        props: { align: "right" },
        Provider: ({ value }) => <Format.DateTime value={value} />,
    },
];

const TableUsersActions = ({ row, onSave }) => (
    <React.Fragment>
        <ButtonEditUser userId={row.id} onSave={onSave} />
        <ButtonDeleteUser userId={row.id} onSave={onSave} />
    </React.Fragment>
);

const TableUsers = ({ currentItems, ...props }) => {
    currentItems = currentItems.map((current) => ({
        ...current,
        fullName: `${current.name} ${current.last_name}`,
    }));

    return (
        <ShowListData
            icon={<AccountCircleIcon />}
            columns={columns}
            firstColumn="fullName"
            secondColumn="username"
            currentItems={currentItems}
            ComponentActions={TableUsersActions}
            {...props}
        />
    );
};

export default TableUsers;
