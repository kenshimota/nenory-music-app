import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import ButtonDeleteUser from "./ButtonDeleteUser";

import Format from "../../components/Format";

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
    position: "relative",
}));

const TableContainerCustom = styled(TableContainer)(() => ({
    maxWidth: 1200,
    width: "100%",
    borderRadius: "10",
    maxHeight: 900,
}));

function TableUsers({ currentItems, onSave, ...props }) {
    return (
        <GridContent container justifyContent="center">
            <TableContainerCustom
                component={Paper}
                style={{ overflow: "auto" }}
            >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <Table stickyHeader>
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
                                <StyledTableCell align="right">
                                    Acciones
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {currentItems.map((row, key) => (
                                <StyledTableRow key={key} Format={Format}>
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
                                        <Format.Number
                                            value={row.identity_document}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Format.Date value={row.created_at} />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Format.Date value={row.updated_at} />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <ButtonDeleteUser
                                            userId={row.id}
                                            onSave={onSave}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Table>
            </TableContainerCustom>
        </GridContent>
    );
}

export default TableUsers;
