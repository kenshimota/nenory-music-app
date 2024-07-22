import React from "react";
import { useDebounce } from "@uidotdev/usehooks";

import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import AutocompleteForm from "../AutocompleteForm";

function AutocompleteIngredients(props) {
    const [search, setSearch] = React.useState("");
    const debounceSearch = useDebounce(search, 700);

    const { response, loading } = useAutoGetAPI({
        url: "/ingredients",
        query: { search: debounceSearch },
    });
    const options = response?.data || [];

    return (
        <AutocompleteForm
            {...props}
            loading={loading}
            options={options.map((option) => ({
                label: option.name,
                value: option.id,
                id: option.id,
                measure_type_id: option.measure.measure_type_id,
            }))}
            onInputChange={(_, newSearch) => setSearch(newSearch)}
        />
    );
}

export default AutocompleteIngredients;
