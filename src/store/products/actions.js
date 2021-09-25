import { ProductService } from "../../services"

export const productsActionTypes = {
    SET_PRODUCTS: "PRODUCT.SET_PRODUCTS",
    CLEAR_PRODUCTS: "PRODUCT.CLEAR_PRODUCTS",
    SET_LOADING: "PRODUCT.SET_LOADING",
    GET_SELECTED_PRODUCT: "PRODUCT.GET_SELECTED_PRODUCT",
    CLEAR_SELECTED_PRODUCT: "PRODUCT.CLEAR_SELECTED_PRODUCT",
}

export const productsActions = {
    setProducts: (products) => ({type: productsActionTypes.SET_PRODUCTS, payload: products}),
    clearProducts: () => ({type: productsActionTypes.CLEAR_PRODUCTS}),
    setLoading: (loading) => ({type: productsActionTypes.SET_LOADING, payload: loading}),
    getSelectedProduct: (product) => ({type: productsActionTypes.GET_SELECTED_PRODUCT, payload: product}),
    clearSelectedProduct: () => ({type: productsActionTypes.CLEAR_SELECTED_PRODUCT}),

    fetchProducts: () => async (dispatch) => {
        dispatch(productsActions.setLoading(true));
        const service = new ProductService();
        try {
            const products = await service.getProducts();
            
            dispatch(productsActions.setProducts(products));
        } catch(error) {
            console.log(error.message);
        } finally {
            dispatch(productsActions.setLoading(false));
        }
    },
    fetchSelectedProduct: (id) => async (dispatch) => {
        dispatch(productsActions.setLoading(true));
        const service = new ProductService();
        try {
            const product = await service.getSelectedProduct(id);
            dispatch(productsActions.getSelectedProduct(product));
        } catch(error) {
            console.log(error.message);
        } finally {
            dispatch(productsActions.setLoading(false));
        }
    }
}