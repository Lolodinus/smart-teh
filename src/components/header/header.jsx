import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { pageLinks} from "../../constant";
import { cartActions } from "../../store/cart";

import style from "./header.module.scss"

export const Header = () => {
    const dispatch = useDispatch();    
    const { count } = useSelector((store) => store.cart);

    useEffect(() => {
        dispatch(cartActions.countOfProducts());
    }, [dispatch, count]);

    return (
        <header className={ style.header }>
            <div className={ style.header__container }>
                <div className={ style.header__row }>
                    <Link className={ style.header__logo } to={ pageLinks.main }>
                        <h1>
                            Smart Teh
                        </h1>
                    </Link>
                    <Link className={ style.header__cart } to={ pageLinks.cart }>
                        <span>{count}</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}