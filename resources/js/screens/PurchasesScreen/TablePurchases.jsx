import React from "react";

import { Shop } from "@mui/icons-material";

import Format from "../../components/Format";
import ShowListData from "../../components/ShowListData";
import ButtonDeletePurchase from "./ButtonDeletePurchase";
import ButtonEditPurchase from "./ButtonEditPurchase";

const labels = {
    pending: "Pendiente",
    completed: "Completada",
};

const columns = [
    {
        id: "number",
        title: "N°",
        Provider: ({ value }) => <Format.FillZero value={value} />,
    },
    {
        id: "state",
        title: "Estado",
        Provider: ({ value }) => labels[value] || "Pendiente",
    },
    {
        id: "product_count",
        props: { align: "right" },
        title: "Cantidades de Productos",
        Provider: ({ value }) => <Format.Number value={value} />,
    },
    {
        id: "amount",
        props: { align: "right" },
        title: "Total de Monto",
        Provider: ({ value }) => <Format.Number value={value} />,
    },
    {
        id: "supplier",
        title: "Proveedor",
        Provider: ({ value }) => value.name,
    },
    {
        id: "user",
        title: "Creado por",
        Provider: ({ value }) => `${value.name} ${value.last_name}`,
    },
    {
        id: "created_at",
        props: { align: "right" },
        title: "Creado",
        Provider: ({ value }) => <Format.DateTime value={value} />,
    },
    {
        id: "updated_at",
        props: { align: "right" },
        title: "Actualizado",
        Provider: ({ value }) => <Format.DateTime value={value} />,
    },
];

const TablePurchaseActions = ({ row, onSave }) => (
    <React.Fragment>
        {row.state === "pending" && (
            <React.Fragment>
                <ButtonEditPurchase purchaseId={row.id} onSave={onSave} />
                <ButtonDeletePurchase purchaseId={row.id} onSave={onSave} />
            </React.Fragment>
        )}
    </React.Fragment>
);

const TablePurchases = (props) => (
    <ShowListData
        icon={<Shop />}
        firstColumn="number"
        secondColumn="created_at"
        columns={columns}
        ComponentActions={TablePurchaseActions}
        {...props}
    />
);

export default TablePurchases;
