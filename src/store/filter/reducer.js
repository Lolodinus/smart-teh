import { filterActionTypes } from "./actions";

const initialState = {
    searchQuery: "",
    // filterBy: "all",
}

export const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        // case filterActionTypes.SET_FILTER:
        //     return {
        //         ...state,
        //         filterBy: action.payload
        //     };
        case filterActionTypes.SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };
        default:
            return state;
    }
}