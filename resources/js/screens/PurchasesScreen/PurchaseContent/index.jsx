import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";
import FooterPagination from "../../../components/FooterPagination";
import Loading from "../../../components/Loading";
import {
    FormPurchaseSupplierCreate,
    FormPurchaseSupplierEdit,
} from "./FormSupplier";
import useAutoGetAPI from "../../../hooks/useAutoGetAPI";
import TablePurchaseItems from "./TablePurchaseItem";
import ButtonAddItem from "./ButtonAddItem";
import ButtonSendPurchase from "./ButtonSendPurchase";

const GridRoot = styled(Grid)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    margin: theme.spacing(0),
}));

const GridContent = styled(Grid)(() => ({
    height: "calc(100% - 140px)",
    width: "100%",
    overflow: "hidden",
    position: "relative",
}));

const GridItemToolbar = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        marginBottom: theme.spacing(1),
    },
}));

const factorySupplier = {
    new: FormPurchaseSupplierCreate,
    edit: FormPurchaseSupplierEdit,
};

const PurchaseContentItem = ({ purchaseId, onClose, ...props }) => {
    const [page, setPage] = useState(1);
    const { response, loading, reload } = useAutoGetAPI({
        url: `/purchase_items`,
        query: { purchase_id: purchaseId, page },
    });

    return (
        <React.Fragment>
            <GridContent item xs={12}>
                {loading && <Loading />}
                {!loading && response && (
                    <TablePurchaseItems
                        currentItems={response.data}
                        onSave={reload}
                        isBack={response.current_page !== 1}
                        isNext={response.current_page !== response.last_page}
                        onBack={() => setPage(page - 1)}
                        onNext={() => setPage(page + 1)}
                    />
                )}
            </GridContent>
            <Grid item xs={12}>
                <FooterPagination
                    onSave={reload}
                    isBack={response && response.current_page !== 1}
                    isNext={
                        response && response.current_page !== response.last_page
                    }
                    onBack={() => setPage(page - 1)}
                    onNext={() => setPage(page + 1)}
                >
                    <ButtonAddItem purchaseId={purchaseId} onSave={reload} />
                    <ButtonSendPurchase
                        onSave={onClose}
                        purchaseId={purchaseId}
                    />
                </FooterPagination>
            </Grid>
        </React.Fragment>
    );
};

const PurchaseContent = ({ purchaseId, ...props }) => {
    const [purchase, setPurchase] = useState(null);
    const FormSupplier = purchaseId
        ? factorySupplier.edit
        : factorySupplier.new;

    return (
        <GridRoot container alignContent="center" justifyContent="center">
            <GridItemToolbar item xs={12}>
                <FormSupplier
                    purchaseId={purchaseId}
                    onSave={(newPurchase) => setPurchase(newPurchase)}
                />
            </GridItemToolbar>
            {(purchaseId || purchase) && (
                <PurchaseContentItem
                    purchaseId={purchaseId || (purchase && purchase.id)}
                    {...props}
                />
            )}
        </GridRoot>
    );
};

export default PurchaseContent;
