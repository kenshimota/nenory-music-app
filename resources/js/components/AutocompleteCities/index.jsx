import React from "react";

import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import AutocompleteForm from "../AutocompleteForm";

function AutocompleteCities(props) {
    const [search, setSearch] = React.useState("");
    const { response, loading } = useAutoGetAPI({
        url: "/cities",
        query: { search },
    });
    const options = response?.data || [];

    return (
        <AutocompleteForm
            {...props}
            options={options.map((option) => ({
                label: option.name,
                id: option.id,
            }))}
            disabled={loading}
            onInputChange={(_, newSearch) => setSearch(newSearch)}
        />
    );
}

export default AutocompleteCities;
