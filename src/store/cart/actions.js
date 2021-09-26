export const cartActionTypes = {
    ADD_PRODUCT_TO_CART: "CART.ADD_PRODUCT_TO_CART",
    DELETE_PRODUCT_FROM_CART: "CART.DELETE_PRODUCT_FROM_CART",
    DELETE_TYPE_OF_PRODUCT_FROM_CART: "CART.DELETE_TYPE_OF_PRODUCT_FROM_CART",
    COUNT_OF_PRODUCTS: "CART.COUNT_OF_PRODUCTS"
}

export const cartActions = {
    addProductToCart: (product) => ({ type: cartActionTypes.ADD_PRODUCT_TO_CART, payload: product }),
    deleteProductFromCart: (id) => ({ type: cartActionTypes.DELETE_PRODUCT_FROM_CART, payload: id }),
    deleteTypeOfProductFromCart: (id) => ({ type: cartActionTypes.DELETE_TYPE_OF_PRODUCT_FROM_CART, payload: id }),
    countOfProducts: () => ({ type: cartActionTypes.COUNT_OF_PRODUCTS })
}
