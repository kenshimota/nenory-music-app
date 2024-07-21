import * as React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import styled from "@mui/material/styles/styled";

import { ArrowForward, ArrowBack } from "@mui/icons-material";

import ShowNotData from "./ShowNotData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const GridContent = styled(Grid)(({ theme }) => ({
    height: "100%",
    width: "100%",
    position: "relative",
}));

const GridPagination = styled(Grid)(({ theme }) => ({
    maxWidth: 1200,
    width: "100%",
    position: "relative",
}));

const TableContainerCustom = styled(TableContainer)(() => ({
    maxWidth: 1200,
    width: "100%",
    borderRadius: "10",
    maxHeight: "calc(100% - 60px)",
    overflow: "auto",
}));

const ShowListDataDesktop = ({
    currentItems,
    onSave,
    ComponentActions,
    columns,
    isNext,
    isBack,
    onBack,
    onNext,
    ...props
}) => (
    <GridContent container justifyContent="center">
        <TableContainerCustom component={Paper} style={{ overflow: "auto" }}>
            <Table stickyHeader aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map(({ id, title, props }) => (
                            <StyledTableCell key={id} {...props}>
                                {title}
                            </StyledTableCell>
                        ))}
                        {ComponentActions && (
                            <StyledTableCell align="right">
                                Acciones
                            </StyledTableCell>
                        )}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {currentItems.map((row, key) => (
                        <StyledTableRow key={key}>
                            {columns.map(({ id, props, Provider }) => (
                                <StyledTableCell key={id} {...props}>
                                    {Provider && (
                                        <Provider
                                            value={row[id] || null}
                                            row={row}
                                        />
                                    )}
                                    {!Provider && row[id]}
                                </StyledTableCell>
                            ))}
                            {ComponentActions && (
                                <StyledTableCell
                                    align="right"
                                    style={{ minWidth: 150 }}
                                >
                                    <Grid container justifyContent="flex-end">
                                        <ComponentActions
                                            row={row}
                                            onSave={onSave}
                                        />
                                    </Grid>
                                </StyledTableCell>
                            )}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainerCustom>
        {currentItems.length !== 0 && (
            <GridPagination item>
                <Grid container justifyContent="flex-end">
                    <IconButton disabled={!isBack} onClick={onBack}>
                        <ArrowBack />
                    </IconButton>

                    <IconButton disabled={!isNext} onClick={onNext}>
                        <ArrowForward />
                    </IconButton>
                </Grid>
            </GridPagination>
        )}
        {currentItems.length === 0 && <ShowNotData />}
    </GridContent>
);

export default ShowListDataDesktop;
