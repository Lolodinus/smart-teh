import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";

import { authentificationActions } from "../../store/authentication"
import { Login, Register } from "../../authentification/";
import { pageLinks } from "../../constant/";
import { auth } from "../../config/firebase";

export const Authentification = () => {
    const { isLoginIn } = useSelector((store) => store.auth);
    
    const location = useLocation();
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (location.pathname !== "/authentification") {
            return
        }
        if (!isLoginIn) {
            history.push(`${path}${pageLinks.login}`);
        } else {
            // Signed out 
            signOut(auth).then(() => {
                dispatch(authentificationActions.resetUser());
                history.push(pageLinks.main);
              }).catch((error) => {
                  console.log(error);
              });
        }
    }, [location])


    return (
        <>
            <Switch>
                <Route path={`${path}${pageLinks.login}`} component={ Login } />
                <Route path={`${path}${pageLinks.register}`} component={ Register } />
            </Switch>
        </>
    )
}