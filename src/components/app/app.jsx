import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { authentificationActions } from "../../store/authentication";
import { pageLinks } from "../../constant";
import { checkStatusUser } from "../../utils"
import { Header } from "../header";
import { Main, Cart, ProductDetail, Authentification, AddProduct, UndefindedPage } from "../../pages";

import style from "./app.module.scss";

export const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  
  useEffect(() => {
    if (!user) {
      checkStatusUser(dispatch, authentificationActions.login);
    }
  }, [user, dispatch])

  return (
    <Router>
      <div className={style.app}>
        <Header/>
        <div className={style.app__container}>
          <Switch>
            <Route path={ pageLinks.main } exact component={ Main } />
            <Route path={ pageLinks.cart } component={ Cart } />
            <Route path={ `${ pageLinks.productDetail }/:id` } component={ ProductDetail } />
            <Route path={ pageLinks.authentification } component={ Authentification } />
            <Route path={ pageLinks.addProduct } component={ AddProduct } />
            <Route component={ UndefindedPage } />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
