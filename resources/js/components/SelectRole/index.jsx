import * as React from "react";
import MenuItem from "@mui/material/MenuItem";

import SelectForm from "../Select";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";

function SelectRole(props) {
    const { response } = useAutoGetAPI({
        url: "/roles",
    });
    const roles = response || [];

    return (
        <SelectForm {...props}>
            {roles &&
                roles.map((rol) => (
                    <MenuItem key={rol.id} value={rol.id}>
                        {rol.description}
                    </MenuItem>
                ))}
        </SelectForm>
    );
}

export default SelectRole;
