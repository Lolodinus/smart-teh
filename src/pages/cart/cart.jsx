import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { cartActions } from "../../store/cart";
import { priceFormat } from "../../utils";
import { TotalAmount } from "../../components/totalAmount";
import { pageLinks} from "../../constant/index";

import style from "./cart.module.scss";

export const Cart = () => {
    const { cartProducts } = useSelector((store) => store.cart);

    const cartItems = cartProducts.map((product) => {
        const { id } = product;
        return (
            <CartProductCard
                product={ product }
                key={ id }
            />
        )
    });
    console.log(cartItems);
    const content = cartItems.length > 0 ? <View cartItems={ cartItems } clsses={ style["cart__total-amount"] }/> : <div className={ style.cart__empty }>Корзина пуста...</div>;

    return (
            <>
                <section className={ style.cart }>
                    <h2 className={ style.cart__heading }>Моя корзина</h2>
                    <div className={ style.cart__body }>
                        { content }
                    </div>
                </section>
            </>
        )
}

const CartProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const deleteProductFromCart = (id) => {
        dispatch(cartActions.deleteProductFromCart(id))
    }
    
    const deleteTypeofProductFromCart = (id) => {
        dispatch(cartActions.deleteTypeOfProductFromCart(id))
    }

    const addProductToCart = (product) => {
        dispatch(cartActions.addProductToCart(product));
    }
    
    const { id, title, price, img, quantity } = product;
    return (
        <li 
            className={ style.cart__item }
            key = { id }
        >
            <Link
                to= { `${ pageLinks.productDetail}/${id}` }
                className={ style["cart__item-left"] }
            >
                <img src={ img } alt={ title } />
            </Link>
            <div className={ style["cart__item-midle"] }>
                <div className={ style["cart__item-title"] }>
                <Link
                    to= { `${ pageLinks.productDetail}/${id}` }
                    className={ style["cart__item-title-link"] }
                >
                    { title }
                </Link>
                </div>
            </div>
            <div className={ style["cart__item-right"] }>
                <div className={ style["cart__item-price"] }>
                    { priceFormat(price * quantity) } руб.
                </div>
                <div className={ style["cart__item-quantity"] }>
                    <button 
                        className={ style["cart__item-remove"] }
                        onClick={ () => deleteProductFromCart(id) }
                    >
                        -
                    </button>
                    <input type="text" value={ quantity } disabled/>
                    <button 
                        className={ style["cart__item-add"] }
                        onClick={ () => addProductToCart(product) }
                    >
                        +
                    </button>
                </div>
            </div>
            <button 
                className={ style["cart__item-delete"] }
                onClick={ () => deleteTypeofProductFromCart(id) }
            >
            </button>
        </li>
    )
}

const View = ({cartItems, clsses}) => {
    return (
        <div className={ style.cart__body }>
            <ul className={ style.cart__list }>
                { cartItems }
            </ul>
            <TotalAmount clsses={ clsses }/>
        </div>
    )
}