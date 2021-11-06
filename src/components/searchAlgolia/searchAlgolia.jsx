import React, { useEffect, useState } from "react";
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

    // filter
    const { searchQuery, filterBy, minPrice, maxPrice, categoryTags } = useSelector((store) => store.filter);
    const [allFilters, setAllFilter] = useState([]);

    useEffect(() => {
        let newFilter = {
            sortByFilter: "",
            searchFilter: "",
            priceFilter: {},
            categoryTagsFilter: [],
        };

        // sort by filter
        newFilter ={
            ...newFilter,
            sortByFilter: filterBy,
        };

        // search filter
        newFilter ={
            ...newFilter,
            searchFilter: searchQuery,
        };
        
        // price filter
        if (minPrice || maxPrice) {
            if (minPrice && maxPrice) {
                newFilter ={
                    ...newFilter,
                    priceFilter: {
                        minPrice,
                        maxPrice,
                    },
                };
            } else if (minPrice) {
                newFilter ={
                    ...newFilter,
                    priceFilter: {
                        minPrice,
                    },
                };
            } else {
                newFilter ={
                    ...newFilter,
                    priceFilter: {
                        maxPrice,
                    },
                };
            };
        };
        
        // category tags filter
        if (categoryTags && categoryTags.length > 0) {
            newFilter ={
                ...newFilter,
                categoryTagsFilter: categoryTags.map(tag => tag.title),
            };
        }

        setAllFilter(newFilter);
    }, [filterBy, searchQuery, minPrice, maxPrice, categoryTags])

    useEffect(() => {
        dispatch(productsActions.fetchProducts(
            productsOnPage, 
            currentPage,
            allFilters,
        ));
    }, [dispatch, currentPage, productsOnPage, minPrice, maxPrice, allFilters]);

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
