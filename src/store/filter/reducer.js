import { filterActionTypes } from "./actions";

const initialState = {
    searchQuery: "",
    filterBy: "all",
    minPrice: "",
    maxPrice: "",
    categoryTags: [],
}

export const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case filterActionTypes.SET_FILTER:
            return {
                ...state,
                filterBy: action.payload,
            };
        case filterActionTypes.SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };
        case filterActionTypes.RESET_FILTER:
            return {
                ...state,
                searchQuery: "",
                filterBy: "all",
                minPrice: "",
                maxPrice: "",
                categoryTags: [],
            };
        case filterActionTypes.SET_MIN_PRICE:
            return {
                ...state,
                minPrice: action.payload,
            };
        case filterActionTypes.SET_MAX_PRICE:
            return {
                ...state,
                maxPrice: action.payload,
            };
        case filterActionTypes.SET_CATEGORY_TAGS:
            return {
                ...state,
                categoryTags: action.payload || [],
            };
        default:
            return state;
    }
}