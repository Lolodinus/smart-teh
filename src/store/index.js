import { createStore } from "redux";

import { reducers } from "./reducers"
import { middlewares } from "./middlewares"
import { setLocalStorage } from "../utils"


function saveToLocalStorage(state) {
    try {
        setLocalStorage("cartProducts", state.cart);
    } catch (error) {
        console.warn(error);
    }
}

export const store = createStore(reducers, middlewares)


store.subscribe(() => saveToLocalStorage(store.getState()));