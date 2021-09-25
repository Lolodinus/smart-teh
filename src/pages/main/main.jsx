import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { pageLinks} from "../../constant";
import { productsActions } from "../../store/products";
import { cartActions } from "../../store/cart";
import { priceFormat } from "../../utils";

import style from "./main.module.scss";

export const Main = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((store) => store.products);

    const addProductToCart = (product) => {
        dispatch(cartActions.addProductToCart(product));
    }

    useEffect(() => {
        dispatch(productsActions.fetchProducts())
    }, []);

    const items = products.map((item) => {
        const { id, title, price, img } = item;
        return (
            <li 
                key={ id } 
                className={style.main__item}
            >
                <div className={style["main__item-img"]}>
                    <img src={ img } alt={ title } />
                </div>
                <div className={`${style["main__item-info"]} ${style["info"]}`}>
                    <div className={style.info__title}>
                        <Link
                            to= { `${ pageLinks.productDetail}/${id}` }
                            className={style["info__title-link"]}
                        >
                            { title }
                        </Link>
                    </div>
                    <div className={style.info__bottom}>
                        <div className={style.info__price}>{ priceFormat(price) } руб.</div>
                        <button 
                            className={style["info__add-to-cart"]}
                            onClick={() => addProductToCart(item)}
                        >
                            В корзину
                        </button>
                    </div>
                </div>
            </li>
        )
                
    })

    return (
        <ul className= {style.main__list}>
            { items }   
        </ul>
    )
}