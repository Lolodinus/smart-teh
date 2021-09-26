import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ProductCard } from "../../components/productCard";
import { Spinner } from "../../components/spinner";
import { ErrorMessage } from "../../components/errorMessage";
import { productsActions } from "../../store/products";

import style from "./main.module.scss";

export const Main = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((store) => store.products);

    useEffect(() => {
        dispatch(productsActions.fetchProducts())
    }, []);

    const productItems = products.map((product) => {
        const { id } = product;
        return (
            <ProductCard 
                product={ product }
                key={ id }
            />
        )
                
    })
    
    const errorMessage = error ? <ErrorMessage errorMessage={ error }/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? productItems : null;

    return (
        <ul className= {style.main__list}>
            { spinner }
            { errorMessage }
            { content }
        </ul>
    )
}