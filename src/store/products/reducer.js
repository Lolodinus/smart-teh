import { productsActionTypes } from "./actions";

const initialState = {
    products: [],
    loading: false
}

export const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case productsActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case productsActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case productsActionTypes.CLEAR_PRODUCTS:
            return {
                ...state,
                products: []
            };
        default:
            return state;
    }
}