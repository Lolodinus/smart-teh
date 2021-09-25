import { productsActionTypes } from "./actions";

const initialState = {
    products: [],
    selectedProduct: {},
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
        case productsActionTypes.GET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload
            };
        case productsActionTypes.CLEAR_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: {}
            };
        default:
            return state;
    }
}