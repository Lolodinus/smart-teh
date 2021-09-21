import { cartActionTypes } from "./actions";

const initialState = {
    cartProducts: [],
    count: null,
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case cartActionTypes.ADD_PRODUCT_TO_CART:
            const { id, title, price, img } = action.payload;
            const newItem = {
                id: id,
                title: title,
                price: price,
                img: img
            };
            
            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts,
                    newItem
                ],
                count: state.count + 1,
            };
        case cartActionTypes.DELETE_PRODUCT_FROM_CART:
            const idx = action.payload;
            const productIndex = state.cartProducts.findIndex(product => product.id === idx);

            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts.slice(0, productIndex),
                    ...state.cartProducts.slice(productIndex + 1),
                ],
                count: state.count - 1,
            };
        case cartActionTypes.COUNT_OF_PRODUCTS:
            const count = state.cartProducts.length;

            return {
                ...state,
                count: count
            };
        default:
            return state;
    }
}