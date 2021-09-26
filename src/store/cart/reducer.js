import { cartActionTypes } from "./actions";

const initialState = {
    cartProducts: [],
    totalQuantity: null,
    totalPrice: 0,
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case cartActionTypes.ADD_PRODUCT_TO_CART:
            const productInCart = state.cartProducts.findIndex(product => product.id === action.payload.id);

            if (productInCart >= 0) {
                const newItem = {
                    ...state.cartProducts[productInCart],
                    quantity: state.cartProducts[productInCart].quantity + 1
                }
                return {
                        ...state,
                        cartProducts: [
                            ...state.cartProducts.slice(0, productInCart),
                            newItem,
                            ...state.cartProducts.slice(productInCart + 1)
                        ],
                        totalQuantity: state.totalQuantity + 1,
                        totalPrice: state.totalPrice + newItem.price,
                }
            } else {
                const newItem = {
                    ...action.payload,
                    quantity: 1
                }
                return {
                    ...state,
                    cartProducts: [
                        ...state.cartProducts,
                        newItem
                    ],
                    totalQuantity: state.totalQuantity + 1,
                    totalPrice: state.totalPrice + newItem.price,
                }
            };
        case cartActionTypes.DELETE_PRODUCT_FROM_CART:
            const productIndex = state.cartProducts.findIndex(product => product.id === action.payload);
            
            if (state.cartProducts[productIndex].quantity > 1) {
                const newItem = {
                    ...state.cartProducts[productIndex],
                    quantity: state.cartProducts[productIndex].quantity - 1,
                }

                return {
                    ...state,
                    cartProducts: [
                        ...state.cartProducts.slice(0, productIndex),
                        newItem,
                        ...state.cartProducts.slice(productIndex + 1),
                    ],
                    totalQuantity: state.totalQuantity - 1,
                    totalPrice: state.totalPrice - state.cartProducts[productIndex].price
                }
            }

            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts.slice(0, productIndex),
                    ...state.cartProducts.slice(productIndex + 1),
                ],
                totalQuantity: state.totalQuantity - 1,
                totalPrice: state.totalPrice - state.cartProducts[productIndex].price
            };
        case cartActionTypes.DELETE_TYPE_OF_PRODUCT_FROM_CART:
            const typeOfProductIndex = state.cartProducts.findIndex(product => product.id === action.payload);
            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts.slice(0, typeOfProductIndex),
                    ...state.cartProducts.slice(typeOfProductIndex + 1),
                ],
                totalQuantity: state.totalQuantity - state.cartProducts[typeOfProductIndex].quantity,
                totalPrice: state.totalPrice - (state.cartProducts[typeOfProductIndex].price * state.cartProducts[typeOfProductIndex].quantity)
            };
        case cartActionTypes.COUNT_OF_PRODUCTS:
            const count = state.cartProducts.length;

            return {
                ...state,
                cartProductsCount: count
            };
        default:
            return state;
    }
}