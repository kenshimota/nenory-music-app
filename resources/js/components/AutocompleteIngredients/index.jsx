import React from "react";

import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import AutocompleteForm from "../AutocompleteForm";

function AutocompleteIngredients(props) {
    const [search, setSearch] = React.useState("");
    const { response, loading } = useAutoGetAPI({
        url: "/ingredients",
        query: { search },
    });
    const options = response?.data || [];

    return (
        <AutocompleteForm
            {...props}
            options={options.map((option) => ({
                label: option.name,
                value: option.id,
                id: option.id,
                measure_type_id: option.measure.measure_type_id,
            }))}
            disabled={loading}
            onInputChange={(_, newSearch) => setSearch(newSearch)}
        />
    );
}

export default AutocompleteIngredients;
