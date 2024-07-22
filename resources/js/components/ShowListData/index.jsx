import React from "react";

import Hidden from "@mui/material/Hidden";

import ShowListDataMobile from "./ShowListDataMobile";
import ShowListDataDesktop from "./ShowListDataDesktop";

const ShowListData = (props) => {
    return (
        <React.Fragment>
            <Hidden smDown>
                <ShowListDataDesktop {...props} />
            </Hidden>
            <Hidden mdUp>
                <ShowListDataMobile {...props} />
            </Hidden>
        </React.Fragment>
    );
};

export default ShowListData;
