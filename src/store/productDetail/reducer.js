import { productDetailActionTypes } from "./actions";

const initialState = {
    productDetail: {},
    loading: false,
    error: null
}

export const productDetailReducer = (state = initialState, action) => {
    switch(action.type) {
        case productDetailActionTypes.PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                productDetail: {},
                loading: true,
                error: null
            };
        case productDetailActionTypes.PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                productDetail: action.payload,
                loading: false
            };
        case productDetailActionTypes.PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}