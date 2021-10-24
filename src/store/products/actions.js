// import { getAllProduct, getProductOnPage } from "../../utils";
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

    // fetchProducts: () => async (dispatch) => {
    //     try {
    //         dispatch(productsActions.productsRequest());
    //         const products = await getAllProduct();
    //         dispatch(productsActions.productsSuccess(products));
    //     } catch(error) {
    //         dispatch(productsActions.productsFail(error.message));
    //     } 
    // },
    // fetchProductOnPage: (page, itemsOnPage) => async (dispatch) => {
    //     try {
    //         dispatch(productsActions.productsRequest());
    //         const {products, totalProduct} = await getProductOnPage(page, itemsOnPage);
    //         dispatch(productsActions.productsSuccess({
    //             products, 
    //             totalProduct
    //         }));
    //     } catch(error) {
    //         dispatch(productsActions.productsFail(error.message));
    //     } 
    // },
    fetchProducts: (searchText, itemsOnPage, currentPage) => async (dispatch) => {
        try {
            dispatch(productsActions.productsRequest());
            const algoliaData = await getAlgoliaSearchData("product", searchText, itemsOnPage, currentPage);
            const products = algoliaData.hits;
            // console.log(products);
            const totalPages = +algoliaData.nbPages;
            // console.log(totalPages);
            dispatch(productsActions.productsSuccess(products, totalPages));
        } catch(error) {
            dispatch(productsActions.productsFail(error.message));
        } 
    }
}