import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux"

import { store } from "../../store/index";
import { pageLinks } from "../../constant";
import { Header } from "../header";
import { Main, Cart } from "../../pages";


import style from "./app.module.scss";

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className={style.app}>
          <Header/>
          <div className={style.app__container}>
            <Switch>
              <Route path={ pageLinks.main } exact component={ Main } />
              <Route path={ pageLinks.cart } component={ Cart } />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}
