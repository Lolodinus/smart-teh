import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { cartActions } from "../../store/cart";

import style from "./cart.module.scss";

export const Cart = () => {
    const dispatch = useDispatch();
    const { cartProducts } = useSelector((store) => store.cart);

    const deleteProductFromCart = (id) => {
        dispatch(cartActions.deleteProductFromCart(id))
    }

    const cartItems = cartProducts.map(({ id, title, price, img }) => {
        return (
            <li 
                className={ style.cart__item }
                key = { id }
            >
                <div className={ style["cart__item-left"] }>
                    <img src={ img } alt={ title } />
                </div>
                <div className={ style["cart__item-midle"] }>
                    <div className={ style["cart__item-title"] }>
                        <a className={ style["cart__item-title-link"] } href="#">
                            { title }
                        </a>
                    </div>
                </div>
                <div className={ style["cart__item-right"] }>
                    <div className={ style["cart__item-price"] }>
                        { price } руб.
                    </div>
                </div>
                <button 
                    className={ style["cart__item-delete"] }
                    onClick={() => deleteProductFromCart(id)}
                >
                </button>
            </li>
        )
    });

    return (
            <>
                <h2 className={ style.cart__heading }>Моя корзина</h2>
                <ul className={ style.cart__list }>
                    { cartItems }
                </ul>
            </>
        )
}