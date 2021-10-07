import { authentificationActionTypes } from "./actions"

const initialState = {
    isLoginIn: false,
    user: null,
    userId: null,
};

export const authenticationReducer = (state=initialState, action) => {
    switch(action.type) {
        case authentificationActionTypes.SET_USER:
            return {
                ...state,
                isLoginIn: true,
                user: action.payload.user,
                userId: action.payload.id
            };
        case authentificationActionTypes.RESET_USER:
            return {
                ...state,
                isLoginIn: false,
                user: null,
                userId: null,
            }
        default:
            return state
    }
}