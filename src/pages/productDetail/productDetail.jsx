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
    }, [dispatch, id]);
    
    const addProductToCart = (product) => {
        dispatch(cartActions.addProductToCart(product));
    }

    const renderDiscription = (description) => {
        return description && description.length > 0
            ? description.map((specification, index) => {
                return <li 
                    className={ style["product-detail__discription-item"] }
                    key={ index }
                >
                    <div className={ style["product-detail__discription-item-key"] }>
                        {specification.specification}
                    </div>
                    <div className={ style["product-detail__discription-item-value"] }>
                        { specification.specificationValue }
                    </div>
                </li>
            })
            : <li className={ style["product-detail__discription-item"] }>
                У нас нет детальной информации по этому товару :(
            </li>
    }

    const errorMessage = error ? <ErrorMessage errorMessage={ error }/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View productDetail={ productDetail } renderDiscription={ renderDiscription } addProductToCart={ addProductToCart } /> : null;

    return (
        <>
            { spinner }
            { errorMessage }
            { content }
        </>
    )
}

const View = ({ productDetail, renderDiscription, addProductToCart}) => {
    const {title, price, img, detail} = productDetail;
    const productDiscription = renderDiscription(detail);
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