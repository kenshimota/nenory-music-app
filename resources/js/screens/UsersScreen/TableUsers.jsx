import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Grid } from "@mui/material";

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
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const GridContent = styled(Grid)(({ theme }) => ({
    height: "100%",
    width: "100%",
    backgroundColor: "pink",
    position: "relative",
}));

function createData(
    username,
    email,
    password,
    name,
    last_name,
    identity_document,
    created_at,
    update_at
) {
    return {
        username,
        email,
        password,
        name,
        last_name,
        identity_document,
        created_at,
        update_at,
    };
}

const TableContainerCustom = styled(TableContainer)(() => ({
    maxWidth: 1200,
    width: "100%",
}));

function TableUsers({ currentItems, ...props }) {
    return (
        <GridContent container justifyContent="center">
            <TableContainerCustom component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">
                                Usuario
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                Correo
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                Nombre
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                Apellido
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Documento de identidad
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Fecha de creado
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Fecha de actualizado
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((row, key) => (
                            <StyledTableRow key={key}>
                                <StyledTableCell component="th" scope="row">
                                    {row.username}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.email}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.last_name}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.identity_document}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.created_at}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.updated_at}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainerCustom>
        </GridContent>
    );
}

export default TableUsers;
