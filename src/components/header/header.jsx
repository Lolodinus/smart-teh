import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { pageLinks} from "../../constant";
import { cartActions } from "../../store/cart";

import style from "./header.module.scss"

export const Header = () => {
    const dispatch = useDispatch();    
    const { cartProductsCount } = useSelector((store) => store.cart);

    useEffect(() => {
        dispatch(cartActions.countOfProducts());
    }, []);

    const productInCartExist = cartProductsCount ? style.active : "";

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
                        <span className={ productInCartExist }>{cartProductsCount}</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}