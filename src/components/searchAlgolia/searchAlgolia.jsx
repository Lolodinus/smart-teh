import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ProductCard } from "../../components/productCard";
import { Pages } from "../../components/pagenation";
import { Spinner } from "../spinner";
import { ErrorMessage } from "../errorMessage";
import { productsActions } from "../../store/products";

import style from "./searchAlgolia.module.scss";

export const SearchAlgolia = () => {
    const dispatch = useDispatch();

    const { products, totalPages, currentPage, productsOnPage, loading, error } = useSelector((store) => store.products);

    // search filter
    const { searchQuery, filterBy, minPrice, maxPrice } = useSelector((store) => store.filter);

    useEffect(() => {
        const filters = {minPrice, maxPrice};
        dispatch(productsActions.fetchProducts(searchQuery, productsOnPage, currentPage, filterBy, filters));
    }, [dispatch, currentPage, searchQuery, productsOnPage, filterBy, minPrice, maxPrice]);

    useEffect(() => {
        if (products && products.length > 0) {
            const newProducts = products.slice();
            dispatch(productsActions.productsSetMinPrice(newProducts.sort((a,b) => a.price > b.price)[0].price));
            dispatch(productsActions.productsSetMaxPrice(newProducts.sort((a,b) => a.price < b.price)[0].price));
        } else {
            dispatch(productsActions.productsSetMinPrice(0));
            dispatch(productsActions.productsSetMaxPrice(0));
        }
    }, [dispatch, products, searchQuery])

    const renderProduct = () => {
        return products && products.length > 0
        ? products.map(product => {
            const { id } = product;
            return (
                <ProductCard 
                    product={ product }
                    key={ id }
                />
            )
        })
        : <div> Ничего не найдено </div>
    }

    const errorMessage = error ? <ErrorMessage errorMessage={ error }/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? renderProduct() : null;

    return (
        <section className={ style["algolia-search"] } >
            <ul className={ style["algolia-search__list"] }>
                { errorMessage }
                { spinner }
                { content }
            </ul>
            <Pages totalPages={ totalPages } currentPage= { currentPage} setCurrentPage={ productsActions.productsSetCurrentPage } />
        </section>
    )
}
