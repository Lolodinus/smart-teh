import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productsActions } from "../../store/products";
import { cartActions } from "../../store/cart"

import style from "./main.module.scss";

export const Main = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((store) => store.products);

    const addProductToCart = (id, title, price, img) => {
        const product = { id, title, price, img }
        dispatch(cartActions.addProductToCart(product));
    }

    useEffect(() => {
        dispatch(productsActions.fetchProducts())
    }, []);

    const items = products.map(({ id, title, price, img }) => {
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
                        <a className={style["info__title-link"]} href="#">
                            { title }
                        </a>
                    </div>
                    <div className={style.info__bottom}>
                        <div className={style.info__price}>{ price } руб.</div>
                        <button 
                            className={style["info__add-to-cart"]}
                            onClick={() => addProductToCart(id, title, price, img)}
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