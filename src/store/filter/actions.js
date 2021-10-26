export const filterActionTypes = {
    SET_FILTER: "FILTER.SET_FILTER",
    SET_SEARCH_QUERY: "FILTER.SET_SEARCH_QUERY",
    RESET_FILTER: "FILTER.RESET_FILTER",
}

export const filterActions = {
    setFilter: (filterBy) => ({type: filterActionTypes.SET_FILTER, payload: filterBy}),
    setSearchQuery: (searchQuery) => ({type: filterActionTypes.SET_SEARCH_QUERY, payload: searchQuery}),
    resetFilter: () => ({type: filterActionTypes.RESET_FILTER}),
}