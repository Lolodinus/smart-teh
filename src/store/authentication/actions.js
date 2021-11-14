export const authentificationActionTypes = {
    SET_USER: "AUTHENTIFICATION.SET_USER",
    RESET_USER: "AUTHENTIFICATION.RESET_USER",
}

export const authentificationActions = {
    setUser: (payload) => ({ type: authentificationActionTypes.SET_USER, payload }),
    resetUser: () => ({ type: authentificationActionTypes.RESET_USER }),

    login: (payload) => async (dispatch) => {
        await dispatch(authentificationActions.setUser(payload));
    },
}