import { cartActionTypes } from "./actions";

const initialState = {
    cartProducts: [],
    cartProductsCount: null,
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case cartActionTypes.ADD_PRODUCT_TO_CART:
            const { id, title, price, img } = action.payload;
            let newItem = {
                id: id,
                title: title,
                price: price,
                img: img,
                quantity: 1
            };

            // Убирает дубли добавляет количество
            let matchProduct = state.cartProducts.find(product => product.id === id);
            if (matchProduct) {
                const matchProductId = state.cartProducts.findIndex(product => product.id === id);
                newItem = {
                    ...newItem,
                    quantity: matchProduct.quantity + 1
                };
                
                return {
                    ...state,
                    cartProducts: [
                        ...state.cartProducts.slice(0, matchProductId),
                        newItem,
                        ...state.cartProducts.slice(matchProductId + 1)
                    ],
                    cartProductsCount: state.cartProductsCount + 1,
                };
            }
            
            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts,
                    newItem
                ],
                cartProductsCount: state.cartProductsCount + 1,
            };
        case cartActionTypes.DELETE_PRODUCT_FROM_CART:
            const idx = action.payload;
            const productIndex = state.cartProducts.findIndex(product => product.id === idx);
            
            if (state.cartProducts[productIndex].quantity > 1) {
                const newItem = {
                    ...state.cartProducts[productIndex],
                    quantity: state.cartProducts[productIndex].quantity - 1
                }

                return {
                    ...state,
                    cartProducts: [
                        ...state.cartProducts.slice(0, productIndex),
                        newItem,
                        ...state.cartProducts.slice(productIndex + 1),
                    ],
                    cartProductsCount: state.cartProductsCount - 1,
                }
            }

            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts.slice(0, productIndex),
                    ...state.cartProducts.slice(productIndex + 1),
                ],
                cartProductsCount: state.cartProductsCount - 1,
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