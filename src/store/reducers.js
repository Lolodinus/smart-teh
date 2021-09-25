import { combineReducers } from "redux";

import { productsReducer as products} from "./products";
import { productDetailReducer as productDetail} from "./productDetail";
import { cartReducer as cart} from "./cart";

export const reducers = combineReducers({
    products,
    productDetail,
    cart
})
