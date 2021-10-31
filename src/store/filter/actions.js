export const filterActionTypes = {
    SET_FILTER: "FILTER.SET_FILTER",
    SET_SEARCH_QUERY: "FILTER.SET_SEARCH_QUERY",
    RESET_FILTER: "FILTER.RESET_FILTER",
    SET_MIN_PRICE: "FILTER.SET_MIN_PRICE",
    SET_MAX_PRICE: "FILTER.SET_MAX_PRICE",
}

export const filterActions = {
    setFilter: (filterBy) => ({type: filterActionTypes.SET_FILTER, payload: filterBy}),
    setSearchQuery: (searchQuery) => ({type: filterActionTypes.SET_SEARCH_QUERY, payload: searchQuery}),
    resetFilter: () => ({type: filterActionTypes.RESET_FILTER}),
    setMinPrice: (payload) => ({type: filterActionTypes.SET_MIN_PRICE, payload}),
    setMaxPrice: (payload) => ({type: filterActionTypes.SET_MAX_PRICE, payload}),
}