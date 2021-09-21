import { ProductService } from "../../services"

export const productsActionTypes = {
    SET_PRODUCTS: "PRODUCT.SET_PRODUCTS",
    CLEAR_PRODUCTS: "PRODUCT.CLEAR_PRODUCTS",
    SET_LOADING: "PRODUCT.SET_LOADING"
}

export const productsActions = {
    setProducts: (products) => ({type: productsActionTypes.SET_PRODUCTS, payload: products}),
    clearProducts: () => ({type: productsActionTypes.CLEAR_PRODUCTS}),
    setLoading: (loading) => ({type: productsActionTypes.SET_LOADING, payload: loading}),

    fetchProducts: () => async (dispatch) => {
        dispatch(productsActions.setLoading(true));
        const product = new ProductService();
        try {
            const products = await product.getProducts();
            
            dispatch(productsActions.setProducts(products));
        } catch(error) {
            console.log(error.message);
        } finally {
            dispatch(productsActions.setLoading(false));
        }
    }
}