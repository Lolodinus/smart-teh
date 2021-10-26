import { getAlgoliaSearchData } from "../../utils/algolia";

export const productsActionTypes = {
    PRODUCTS_REQUEST: "PRODUCTS.PRODUCTS_REQUEST",
    PRODUCTS_SUCCESS: "PRODUCTS.PRODUCTS_SUCCESS",
    PRODUCTS_FAIL: "PRODUCTS.PRODUCTS_FAIL",
    PRODUCTS_SET_CURRENT_PAGE: "PRODUCTS.PRODUCTS_SET_CURRENT_PAGE",
}

export const productsActions = {
    productsRequest: () => ({type: productsActionTypes.PRODUCTS_REQUEST}),
    productsSuccess: (products, totalPages) => ({type: productsActionTypes.PRODUCTS_SUCCESS, payload: {products, totalPages}}),
    productsFail: (error) => ({type: productsActionTypes.PRODUCTS_FAIL, payload: error}),
    productsSetCurrentPage: (page) => ({type: productsActionTypes.PRODUCTS_SET_CURRENT_PAGE, payload: page}),

    fetchProducts: (searchText, itemsOnPage, currentPage, sorting) => async (dispatch) => {
        try {
            dispatch(productsActions.productsRequest());
            const algoliaData = await getAlgoliaSearchData(searchText, itemsOnPage, currentPage, sorting);
            const products = algoliaData.hits;
            const totalPages = +algoliaData.nbPages;
            dispatch(productsActions.productsSuccess(products, totalPages));
        } catch(error) {
            dispatch(productsActions.productsFail(error.message));
        } 
    }
}