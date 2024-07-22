import * as yup from "yup";
import React, { useEffect } from "react";

import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";

import Form from "../../../components/Form";
import Loading from "../../../components/Loading";
import usePostAPI from "../../../hooks/usePostAPI";
import usePutAPI from "../../../hooks/usePutAPI";
import useAutoGetAPI from "../../../hooks/useAutoGetAPI";
import ButtonCommon from "../../../components/ButtonCommon";
import AutocompleteSuppliers from "../../../components/AutocompleteSuppliers";

const schema = yup.object().shape({
    supplier: yup
        .object()
        .required("debes seleccionar proveedor")
        .typeError("seleccionar proveedor"),
});

const GridContainer = styled(Grid)(({ theme }) => ({
    maxWidth: 350,
    width: "100%",
    margin: "0px auto",
}));

const FormSupplier = ({ onSubmit: submit, errors, ...props }) => {
    const onSubmit = ({ supplier }) => {
        if (submit) {
            submit({ supplier_id: (supplier && supplier.id) || null });
        }
    };

    return (
        <Form {...props} schema={schema} onSubmit={onSubmit}>
            <GridContainer container spacing={1} justifyContent="center">
                <Grid item xs={12}>
                    <AutocompleteSuppliers
                        errors={errors}
                        label="Proveedor"
                        name="supplier"
                    />
                </Grid>
                <Grid item xs={12}>
                    <ButtonCommon type="submit" fullWidth>
                        Guardar Proveedor
                    </ButtonCommon>
                </Grid>
            </GridContainer>
        </Form>
    );
};

export const FormPurchaseSupplierCreate = ({ onSave, ...props }) => {
    const { request, loading, status, error } = usePostAPI({
        url: "/purchases",
    });

    const onSubmit = async (values) => {
        const res = await request(values);
        if (!res) {
            return;
        }

        if (onSave) {
            onSave(res);
        }
    };

    return (
        <FormSupplier
            onSubmit={onSubmit}
            disabled={loading}
            errors={status === 422 && error && error.errors}
        />
    );
};

export const FormPurchaseSupplierEdit = ({ onSave, purchaseId, ...props }) => {
    const {
        response: purchase,
        loading: ldg1,
        reload,
    } = useAutoGetAPI({
        url: `/purchases/${purchaseId}`,
    });
    const { request, loading, status, error } = usePutAPI({
        url: "/purchases",
    });

    const onSubmit = async (values) => {
        const res = await request(values);
        if (!res) {
            return;
        }

        reload();
    };

    useEffect(() => {
        onSave(purchase);
    }, [JSON.stringify(purchase)]);

    return (
        <React.Fragment>
            {ldg1 && <Loading />}
            {!ldg1 && purchase && (
                <FormSupplier
                    onSubmit={onSubmit}
                    disabled={loading}
                    values={{
                        supplier: {
                            id: purchase.supplier.id,
                            label: purchase.supplier.name,
                        },
                    }}
                    errors={status === 422 && error && error.errors}
                />
            )}
        </React.Fragment>
    );
};
