import { productsActionTypes } from "./actions";

const initialState = {
    products: [],
    totalPages: 0,
    currentPage: 1,
    productsOnPage: 5,
    loading: false,
    error: null,
    minProductPrice: null,
    maxProductPrice: null,
}

export const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case productsActionTypes.PRODUCTS_REQUEST:
            return {
                ...state,
                products: [],
                totalProduct: 0,
                loading: true,
                error: null
            };
        case productsActionTypes.PRODUCTS_SUCCESS:
            const chackCurrentPage = state.currentPage && state.currentPage > action.payload.totalPages 
                ? 1 
                : state.currentPage;
            return {
                ...state,
                products: action.payload.products,
                currentPage: chackCurrentPage,
                totalPages: action.payload.totalPages,
                loading: false
            };
        case productsActionTypes.PRODUCTS_FAIL:
            return {
                ...state,
                currentPage: 1,
                loading: false,
                error: action.payload
            };
        case productsActionTypes.PRODUCTS_SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case productsActionTypes.PRODUCTS_SET_MIN_PRICE:
            return {
                ...state,
                minProductPrice: action.payload,
            };
        case productsActionTypes.PRODUCTS_SET_MAX_PRICE:
            return {
                ...state,
                maxProductPrice: action.payload,
            };
        default:
            return state;
    }
}