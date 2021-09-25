import React from "react";
import { useSelector } from "react-redux";

import { priceFormat } from "../../utils"
import style from "./totalAmount.module.scss";

export const TotalAmount = ({ clsses }) => {
    
    const { cartProductsCount, totalPrice } = useSelector((store) => store.cart);

    return (
        
        <section className={ `${ clsses } ${ style["total-amount"] }` }>
            <div className={ style["total-amount__info"] }>
                В корзине { cartProductsCount } товара...
                <div className={ style["total-amount__price"] }>{ priceFormat(totalPrice) } руб.</div>
            </div>
            <button className={ style["total-amount__btn"] }>
                Оформать заказ
            </button>
        </section>
    )
}
