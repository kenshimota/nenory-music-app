import React from "react";
import { useDebounce } from "@uidotdev/usehooks";

import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import AutocompleteForm from "../AutocompleteForm";

function AutocompleteCities(props) {
    const [search, setSearch] = React.useState("");
    const debounceSearch = useDebounce(search, 700);
    const { response, loading } = useAutoGetAPI({
        url: "/cities",
        query: { search: debounceSearch },
    });
    const options = response?.data || [];

    return (
        <AutocompleteForm
            {...props}
            loading={loading}
            options={options.map((option) => ({
                label: option.name,
                id: option.id,
            }))}
            onInputChange={(_, newSearch) => setSearch(newSearch)}
        />
    );
}

export default AutocompleteCities;
