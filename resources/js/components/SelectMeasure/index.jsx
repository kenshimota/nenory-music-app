import * as React from "react";
import MenuItem from "@mui/material/MenuItem";

import SelectForm from "../Select";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";

function SelectMeasure({ measure_type_id, ...props }) {
    const { response } = useAutoGetAPI({
        url: "/measures",
    });
    const measures = response || [];

    return (
        <SelectForm {...props}>
            {measures &&
                measures.map((measure) => (
                    <MenuItem
                        key={measure.id}
                        disabled={
                            measure_type_id &&
                            measure.measure_type_id !== measure_type_id
                        }
                        value={measure.id}
                    >
                        ({measure.abreviated}) - {measure.name}
                    </MenuItem>
                ))}
        </SelectForm>
    );
}

export default SelectMeasure;
