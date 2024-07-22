import React from "react";
import { useDebounce } from "@uidotdev/usehooks";

import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import AutocompleteForm from "../AutocompleteForm";

function AutocompleteUsers(props) {
    const [search, setSearch] = React.useState("");
    const debounceSearch = useDebounce(search, 700);

    const { response, loading } = useAutoGetAPI({
        url: "/users",
        query: { search: debounceSearch },
    });
    const options = response?.data || [];

    return (
        <AutocompleteForm
            {...props}
            loading={loading}
            options={options.map((option) => ({
                label: `(${option.username}) - ${option.name} ${option.last_name}`,
                id: option.id,
            }))}
            onInputChange={(_, newSearch) => setSearch(newSearch)}
        />
    );
}

export default AutocompleteUsers;
