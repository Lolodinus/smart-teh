import { getAlgoliaSearchData } from "../../utils/algolia";

export const productsActionTypes = {
    PRODUCTS_REQUEST: "PRODUCTS.PRODUCTS_REQUEST",
    PRODUCTS_SUCCESS: "PRODUCTS.PRODUCTS_SUCCESS",
    PRODUCTS_FAIL: "PRODUCTS.PRODUCTS_FAIL",
    PRODUCTS_SET_CURRENT_PAGE: "PRODUCTS.PRODUCTS_SET_CURRENT_PAGE",
    PRODUCTS_SET_MIN_PRICE: "PRODUCTS.PRODUCTS_SET_MIN_PRICE",
    PRODUCTS_SET_MAX_PRICE: "PRODUCTS.PRODUCTS_SET_MAX_PRICE",
}

export const productsActions = {
    productsRequest: () => ({type: productsActionTypes.PRODUCTS_REQUEST}),
    productsSuccess: (payload) => ({type: productsActionTypes.PRODUCTS_SUCCESS, payload}),
    productsFail: (error) => ({type: productsActionTypes.PRODUCTS_FAIL, payload: error}),
    productsSetCurrentPage: (page) => ({type: productsActionTypes.PRODUCTS_SET_CURRENT_PAGE, payload: page}),
    productsSetMinPrice: (payload) => ({type: productsActionTypes.PRODUCTS_SET_MIN_PRICE, payload}),
    productsSetMaxPrice: (payload) => ({type: productsActionTypes.PRODUCTS_SET_MAX_PRICE, payload}),

    fetchProducts: (itemsOnPage, currentPage, allFilters) => async (dispatch) => {
        try {
            dispatch(productsActions.productsRequest());
            const {minPrice, maxPrice, availableCatygory, products, totalPages} = await getAlgoliaSearchData(itemsOnPage, currentPage, allFilters);
            dispatch(productsActions.productsSuccess({minPrice, maxPrice, availableCatygory, products, totalPages}));
        } catch(error) {
            dispatch(productsActions.productsFail(error.message));
        } 
    },
    fetchProductsCategory: () => async (dispatch) => {
        
    }
}