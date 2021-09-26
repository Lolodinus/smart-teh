import { ProductService } from "../../services"

export const productsActionTypes = {
    PRODUCTS_REQUEST: "PRODUCTS.PRODUCTS_REQUEST",
    PRODUCTS_SUCCESS: "PRODUCTS.PRODUCTS_SUCCESS",
    PRODUCTS_FAIL: "PRODUCTS.PRODUCTS_FAIL",
}

export const productsActions = {
    productsRequest: () => ({type: productsActionTypes.PRODUCTS_REQUEST}),
    productsSuccess: (products) => ({type: productsActionTypes.PRODUCTS_SUCCESS, payload: products}),
    productsFail: (error) => ({type: productsActionTypes.PRODUCTS_FAIL, payload: error}),

    fetchProducts: () => async (dispatch) => {
        const service = new ProductService();
        try {
            dispatch(productsActions.productsRequest());
            const products = await service.getProducts();
            dispatch(productsActions.productsSuccess(products));
        } catch(error) {
            dispatch(productsActions.productsFail(error.message));
        } 
    }
}