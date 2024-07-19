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

const ShowListDataDesktop = ({
    currentItems,
    onSave,
    ComponentActions,
    columns,
    ...props
}) => (
    <GridContent container justifyContent="center">
        <TableContainerCustom component={Paper} style={{ overflow: "auto" }}>
            <Table
                stickyHeader
                sx={{ minWidth: 700 }}
                aria-label="customized table"
            >
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
                                <StyledTableCell align="right">
                                    <ComponentActions
                                        row={row}
                                        onSave={onSave}
                                    />
                                </StyledTableCell>
                            )}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainerCustom>
    </GridContent>
);

export default ShowListDataDesktop;
