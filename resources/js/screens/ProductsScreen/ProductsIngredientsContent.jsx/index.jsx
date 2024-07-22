import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";

import Loading from "../../../components/Loading";
import useAutoGetAPI from "../../../hooks/useAutoGetAPI";
import FooterPagination from "../../../components/FooterPagination";
import ButtonAddIngredient from "./ButtonAddIngredient";
import TableProductIngredients from "./TableProductIngredients";

const GridRoot = styled(Grid)(({ theme }) => ({
    height: "100%",
    width: "100%",
    position: "relative",
    margin: theme.spacing(0),
}));

const GridContent = styled(Grid)(({ theme }) => ({
    height: "calc(100% - 60px)",
}));

function ProductsIngredientsContents({ productId, ...props }) {
    const [page, setPage] = useState(1);
    const { response, loading, reload } = useAutoGetAPI({
        url: `/product_ingredients`,
        query: { page, product_id: productId },
    });

    console.log(response);

    return (
        <GridRoot container spacing={1}>
            <GridContent item xs={12}>
                {loading && <Loading />}
                {!loading && response && (
                    <TableProductIngredients
                        onSave={reload}
                        currentItems={response.data}
                        isBack={response && response.current_page !== 1}
                        isNext={
                            response &&
                            response.current_page !== response.last_page
                        }
                        onBack={() => setPage(page - 1)}
                        onNext={() => setPage(page + 1)}
                    />
                )}
            </GridContent>
            <Grid item xs={12}>
                <FooterPagination
                    isBack={response && response.current_page !== 1}
                    isNext={
                        response && response.current_page !== response.last_page
                    }
                    onBack={() => setPage(page - 1)}
                    onNext={() => setPage(page + 1)}
                >
                    <ButtonAddIngredient
                        onSave={reload}
                        productId={productId}
                    />
                </FooterPagination>
            </Grid>
        </GridRoot>
    );
}

export default ProductsIngredientsContents;
