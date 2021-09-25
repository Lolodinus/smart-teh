import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { productsActions } from "../../store/products";
import { cartActions } from "../../store/cart";
import { priceFormat } from "../../utils";

import style from "./productDetail.module.scss";

export const ProductDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading } = useSelector((store) => store.products);

    useEffect(() => {
        if (id && id!=="") {
            dispatch(productsActions.fetchSelectedProduct(id));
        }
        return () => {
            dispatch(productsActions.clearSelectedProduct());
        }
    }, []);
    
    const addProductToCart = (product) => {
        dispatch(cartActions.addProductToCart(product));
    }

    const renderItem = () => {
        const {title, price, img, category} = selectedProduct;

        return (
            <div className={ style["product-detail"] }>
                <div className={ style["product-detail__left"] }>
                    <div className={ style["product-detail__img"] }>
                        <img src={ img } alt={ title } />
                    </div>
                </div>
                <div className={ style["product-detail__right"] }>
                    <div className={ style["product-detail__container"] }>
                        <h2 className={ style["product-detail__title"] }>
                            { title }
                        </h2>
                        <ul className={ style["product-detail__discription-list"] }>
                            <li className={ style["product-detail__discription-item"] }>
                                <div className={ style["product-detail__discription-item-key"] }>
                                    Категория
                                </div>
                                <div className={ style["product-detail__discription-item-value"] }>
                                    { category }
                                </div>
                            </li>
                            <li className={ style["product-detail__discription-item"] }>
                                <div className={ style["product-detail__discription-item-key"] }>
                                    Категория
                                </div>
                                <div className={ style["product-detail__discription-item-value"] }>
                                    { category }
                                </div>
                            </li>
                            <li className={ style["product-detail__discription-item"] }>
                                <div className={ style["product-detail__discription-item-key"] }>
                                    Категория
                                </div>
                                <div className={ style["product-detail__discription-item-value"] }>
                                    { category }
                                </div>
                            </li>
                            <li className={ style["product-detail__discription-item"] }>
                                <div className={ style["product-detail__discription-item-key"] }>
                                    Категория
                                </div>
                                <div className={ style["product-detail__discription-item-value"] }>
                                    { category }
                                </div>
                            </li>
                        </ul>
                        <div className={ style["product-detail__bottom-block"] }>
                            <div className={ style["product-detail__price"] }>
                                { priceFormat(price) } руб.
                            </div>
                            <button 
                                className={ style["product-detail__add-to-cart"]}
                                onClick={() => addProductToCart(selectedProduct)}
                            >
                                Добавить в корзину
                            </button>
                        </div >
                    </div>
                </div>
            </div>
        )
    }

    const content = !loading ? renderItem() : <div>Loading...</div>;

    return (
        <>
            { content }
        </>
    )
}