import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Spinner } from "../../components/spinner";
import { ErrorMessage } from "../../components/errorMessage";
import { productDetailActions } from "../../store/productDetail";
import { cartActions } from "../../store/cart";
import { priceFormat } from "../../utils";

import style from "./productDetail.module.scss";

export const ProductDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { productDetail, loading, error } = useSelector((store) => store.productDetail);

    useEffect(() => {
        if (id && id!=="") {
            dispatch(productDetailActions.fetchProductDetail(id));
        }
        // return () => {
        //     dispatch(productsActions.clearSelectedProduct());
        // }
    }, [id]);
    
    const addProductToCart = (product) => {
        dispatch(cartActions.addProductToCart(product));
    }

    const renderDiscription = (description) => {
        if (description && description !== "") {
            return Object.keys(description).map(key => (
                <li 
                    className={ style["product-detail__discription-item"] }
                    key={ key }
                >
                    <div className={ style["product-detail__discription-item-key"] }>
                        {key}
                    </div>
                    <div className={ style["product-detail__discription-item-value"] }>
                        { description[key] }
                    </div>
                </li>
            ))
        }
    }

    const errorMessage = error ? <ErrorMessage errorMessage={ error }/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View productDetail={ productDetail } renderDiscription={ renderDiscription } addProductToCart={ addProductToCart } /> : null;
    // const content = !loading ? <View productDetail={ productDetail } renderDiscription={ renderDiscription } addProductToCart={ addProductToCart } /> : null;

    return (
        <>
            { spinner }
            { errorMessage }
            { content }
        </>
    )
}

const View = ({ productDetail, renderDiscription, addProductToCart}) => {
    const {title, price, img, description} = productDetail;
    const productDiscription = renderDiscription(description);
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
                        { productDiscription }
                    </ul>
                    <div className={ style["product-detail__bottom-block"] }>
                        <div className={ style["product-detail__price"] }>
                            { priceFormat(price) } руб.
                        </div>
                        <button 
                            className={ style["product-detail__add-to-cart"]}
                            onClick={() => addProductToCart(productDetail)}
                        >
                            Добавить в корзину
                        </button>
                    </div >
                </div>
            </div>
        </div>
    )
}