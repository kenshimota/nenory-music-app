import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import Collapse from "@mui/material/Collapse";

const ListCustom = styled(List)(({ theme }) => ({
    padding: theme.spacing(1),
    overflow: "auto",
    height: "100%",
}));

const ListItemCustom = styled(ListItem)(({ theme }) => ({
    background: theme.palette.background.paper,
    borderBottom: "1px solid #ddd",
}));

const GridWithAvatar = styled(Grid)(({ theme }) => ({
    width: "calc(100% - 70px)",
    marginLeft: theme.spacing(1),
}));

const GridWithoutAvatar = styled(Grid)(({ theme }) => ({
    width: "100%",
}));

const GridContent = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));

const GridNotFound = styled(Grid)(({ theme }) => ({
    height: "100%",
}));

const ShowDataValue = ({ Provider, id, row }) => (
    <React.Fragment>
        {Provider && <Provider value={row[id] || null} row={row} />}
        {!Provider && row[id]}
    </React.Fragment>
);

const ListItemShow = ({
    columns,
    icon,
    current,
    img,
    onSave,
    firstColumn,
    secondColumn,
    ComponentActions,
}) => {
    const [open, setOpen] = useState(false);
    const ComponentTitle = icon || img ? GridWithAvatar : GridWithoutAvatar;
    const providers = new Map(
        columns.map((column) => [column.id, column.Provider])
    );

    return (
        <ListItemCustom onClick={() => setOpen(!open)}>
            <Grid container>
                {icon && <Grid item>{icon && <Avatar>{icon}</Avatar>}</Grid>}
                {img && <Grid item>{img && <Avatar src={img} />}</Grid>}

                <ComponentTitle>
                    <Typography variant="subtitle2">
                        <ShowDataValue
                            row={current}
                            id={firstColumn}
                            Provider={providers.get(firstColumn) || null}
                        />
                    </Typography>
                    <Typography variant="body2">
                        <ShowDataValue
                            row={current}
                            id={secondColumn}
                            Provider={providers.get(firstColumn) || null}
                        />
                    </Typography>
                </ComponentTitle>

                <Grid item xs={12}>
                    <Collapse in={open} unmountOnExit timeout="auto">
                        <GridContent container>
                            {columns.map(({ id, title, Provider }) => (
                                <Grid item xs={12} key={id}>
                                    <Typography
                                        component="span"
                                        variant="subtitle2"
                                    >
                                        {title}:{" "}
                                    </Typography>

                                    <Typography
                                        component="span"
                                        variant="body1"
                                    >
                                        <ShowDataValue
                                            id={id}
                                            row={current}
                                            Provider={Provider}
                                        />
                                    </Typography>
                                </Grid>
                            ))}
                        </GridContent>
                    </Collapse>
                </Grid>

                {ComponentActions && (
                    <Grid item xs={12}>
                        <Grid
                            container
                            justifyContent="flex-end"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ComponentActions row={current} onSave={onSave} />
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </ListItemCustom>
    );
};

const ShowListDataMobile = ({
    currentItems,
    isNext,
    isBack,
    onNext,
    onBack,
    ...props
}) => {
    return (
        <ListCustom>
            {currentItems.length === 0 && (
                <GridNotFound
                    container
                    alignContent="center"
                    justifyContent="center"
                >
                    <Typography variant="h6" aling="center" color="primary">
                        No hay datos
                    </Typography>
                </GridNotFound>
            )}

            {currentItems.map((current, key) => (
                <React.Fragment key={key}>
                    <ListItemShow current={current} {...props} />
                </React.Fragment>
            ))}
        </ListCustom>
    );
};

export default ShowListDataMobile;
