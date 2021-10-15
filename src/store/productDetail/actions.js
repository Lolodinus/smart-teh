import { getProductById } from "../../utils"

export const productDetailActionTypes = {
    PRODUCT_DETAIL_REQUEST: "PRODUCT_DETAIL.PRODUCT_DETAIL_REQUEST",
    PRODUCT_DETAIL_SUCCESS: "PRODUCT_DETAIL.PRODUCT_DETAIL_SUCCESS",
    PRODUCT_DETAIL_FAIL: "PRODUCT_DETAIL.PRODUCT_DETAIL_FAIL",
}

export const productDetailActions = {
    productDetailRequest: () => ({type: productDetailActionTypes.PRODUCT_DETAIL_REQUEST}),
    productDetailSuccess: (product) => ({type: productDetailActionTypes.PRODUCT_DETAIL_SUCCESS, payload: product}),
    productDetailFail: (error) => ({type: productDetailActionTypes.PRODUCT_DETAIL_FAIL, payload: error}),

    fetchProductDetail: (id) => async (dispatch) => {
        try {
            dispatch(productDetailActions.productDetailRequest());
            const product = await getProductById(id);
            dispatch(productDetailActions.productDetailSuccess(product));
        } catch(error) {
            dispatch(productDetailActions.productDetailFail(error.message));
        }
    }
}