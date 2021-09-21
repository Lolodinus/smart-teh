import { combineReducers } from "redux";

import { productsReducer as products} from "./products";
import { cartReducer as cart} from "./cart";

export const reducers = combineReducers({
    products,
    cart
})
