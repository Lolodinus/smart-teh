export const filterActionTypes = {
    SET_FILTER: "FILTER.SET_FILTER",
    SET_SEARCH_QUERY: "FILTER.SET_SEARCH_QUERY",
}

export const filterActions = {
    // setFilter: (filterBy) => ({type: filterActionTypes.SET_FILTER, payload: filterBy}),
    setSearchQuery: (searchQuery) => ({type: filterActionTypes.SET_SEARCH_QUERY, payload: searchQuery}),
}