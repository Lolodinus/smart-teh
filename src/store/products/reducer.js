import { productsActionTypes } from "./actions";

const initialState = {
    products: [],
    loading: false,
    error: null
}

export const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case productsActionTypes.PRODUCTS_REQUEST:
            return {
                ...state,
                products: [],
                loading: true,
                error: null
            };
        case productsActionTypes.PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case productsActionTypes.PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}