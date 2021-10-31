import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { cartActions } from "../../store/cart";
import { pageLinks} from "../../constant";
import { priceFormat, cutString } from "../../utils";

import style from "./productCard.module.scss";

export const ProductCard = ({product}) => {
    const dispatch = useDispatch();

    const addProductToCart = (product) => {
        dispatch(cartActions.addProductToCart(product));
    }

    const { id, title, price, img } = product;
    return (
        <li 
            key={ id } 
            className={ style["product-card"] }
        >
            <div className={ style["product-card__container"] }>
                <Link
                    to= { `${ pageLinks.productDetail}/${id}` }
                    className={ style["product-card__img"] }
                >
                    <img src={ img } alt={ title } />
                </Link>
                <div className={`${style["product-card__info"]} ${style["info"]}`}>
                    <div className={style.info__title}>
                        <Link
                            to= { `${ pageLinks.productDetail}/${id}` }
                            className={style["info__title-link"]}
                        >
                            { cutString(title, 50) }
                        </Link>
                    </div>
                    <div className={style.info__bottom}>
                        <div className={style.info__price}>{ priceFormat(price) } руб.</div>
                        <button 
                            className={style["info__add-to-cart"]}
                            onClick={() => addProductToCart(product)}
                        >
                            В корзину
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}