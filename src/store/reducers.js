import { combineReducers } from "redux";

import { productsReducer as products} from "./products";
import { productDetailReducer as productDetail} from "./productDetail";
import { cartReducer as cart} from "./cart";
import { filterReducer as filter} from "./filter";
import { authenticationReducer as auth } from "./authentication";

export const reducers = combineReducers({
    products,
    productDetail,
    cart,
    filter,
    auth
})
