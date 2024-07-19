import * as React from "react";

import Format from "../../components/Format";
import ButtonDeleteUser from "./ButtonDeleteUser";
import ShowListData from "../../components/ShowListData";

const columns = [
    { id: "username", title: "Usuario" },
    { id: "email", title: "Correo Electronico" },
    { id: "name", title: "Nombre" },
    { id: "last_name", title: "Apellido" },
    {
        id: "identity_document",
        title: "Documento de identidad",
        props: { align: "right" },
    },
    {
        id: "created_at",
        title: "Fecha de creación",
        props: { align: "right" },
        Provider: ({ value }) => <Format.Date value={value} />,
    },
    {
        id: "updated_at",
        title: "Fecha de actualización",
        props: { align: "right" },
        Provider: ({ value }) => <Format.Date value={value} />,
    },
];

const TableUsersActions = ({ row, onSave }) => (
    <React.Fragment>
        <ButtonDeleteUser userId={row.id} onSave={onSave} />
    </React.Fragment>
);

const TableUsers = (props) => (
    <ShowListData
        columns={columns}
        ComponentActions={TableUsersActions}
        {...props}
    />
);

export default TableUsers;
