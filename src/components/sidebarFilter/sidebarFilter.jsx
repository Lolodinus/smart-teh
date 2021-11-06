import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CustomCheckbox } from "../customCheckbox";
import { filterActions } from "../../store/filter"
import { getProductCategoryFromFirestoreDB } from "../../utils";

import style from "./sidebarFilter.module.scss";

export const SidebarFilter = () => {
    const dispatch = useDispatch();
    
    const { minProductPrice, maxProductPrice, category } = useSelector((store) => store.products);
    // search filter
    const { minPrice, maxPrice, categoryTags: filterCategoryTags } = useSelector((store) => store.filter);

    // price filter
    const [minPriceValue, setMinPrice] = useState("");
    const [maxPriceValue, setMaxPrice] = useState("");

    const priceOnChange = (e, fildName) => {
        const cleanValue = e.target.value.replace(/[^0-9]/g,"");
        if (fildName === "minPrice") {
            setMinPrice(cleanValue);
        } else {
            setMaxPrice(cleanValue);
        }
    }

    const checkMinPrice = (priceValue, filterMaxPrice, productMinPrice, productMaxPrice ) => {
        
        // check priceValue < filterMaxPrice
        function CheckPriceValueLessThenMaxPriceFilter(priceValue, filterMaxPrice) {
            return filterMaxPrice.length > 0 && +priceValue >= +filterMaxPrice ? `${+filterMaxPrice - 1}` : priceValue;
        }

        // check priceValue >= productMinPrice
        function CheckPriceValueNotLessThenProductMinPrice(priceValue, productMinPrice) {
            return +priceValue <= productMinPrice ? productMinPrice : priceValue;
        }

        // check priceValue <= productMaxPrice
        function CheckPriceValueLessThenProductMaxPrice(priceValue, productMaxPrice) {
            return +priceValue >= productMaxPrice ? productMaxPrice - 1 : priceValue;
        }

        if (priceValue.length < 1) {
            return
        }

        priceValue = CheckPriceValueLessThenMaxPriceFilter(priceValue, filterMaxPrice);
        priceValue = CheckPriceValueNotLessThenProductMinPrice(priceValue, productMinPrice);
        priceValue = CheckPriceValueLessThenProductMaxPrice(priceValue, productMaxPrice);
        return priceValue
    }

    const checkMaxPrice = (priceValue, filterMinPrice, productMinPrice, productMaxPrice ) => {
        
        // check priceValue > filterMinPrice
        function CheckPriceValueMoreThenMinPriceFilter(priceValue, filterMinPrice) {
            return filterMinPrice.length > 0 && +priceValue <= +filterMinPrice ? `${+filterMinPrice + 1}` : priceValue;
        }

        // check priceValue <= productMaxPrice
        function CheckPriceValueNotMoreThenProductMaxPrice(priceValue, productMaxPrice) {
            return +priceValue >= productMaxPrice ? productMaxPrice : priceValue;
        }

        // check priceValue >= productMinPrice
        function CheckPriceValueMoreThenProductMinPrice(priceValue, productMinPrice) {
            return +priceValue <= productMinPrice ? productMinPrice + 1 : priceValue;
        }

        if (priceValue.length < 1) {
            return
        }

        priceValue = CheckPriceValueMoreThenMinPriceFilter(priceValue, filterMinPrice);
        priceValue = CheckPriceValueNotMoreThenProductMaxPrice(priceValue, productMaxPrice);
        priceValue = CheckPriceValueMoreThenProductMinPrice(priceValue, productMinPrice);
        return priceValue
    }

    const priceOnBlur = (fildName) => {
        if (fildName === "minPrice") {
            const cleanValue = checkMinPrice(minPriceValue, maxPriceValue, minProductPrice, maxProductPrice);
            if (cleanValue) {
                setMinPrice(cleanValue);
                dispatch(filterActions.setMinPrice(cleanValue));
            } else {
                dispatch(filterActions.setMinPrice(""));
            }
        } else {
            const cleanValue = checkMaxPrice(maxPriceValue, minPriceValue, minProductPrice, maxProductPrice);
            if (cleanValue) {
                setMaxPrice(cleanValue);
                dispatch(filterActions.setMaxPrice(cleanValue));
            } else {
                dispatch(filterActions.setMaxPrice(""));
            }
        }
    }

    useEffect(() => {
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    }, [minPrice, maxPrice])

    // category filter 
    const [categoryTags, setCategoryTags] = useState("");

    useEffect(() => {
        if (filterCategoryTags.length === 0) {
            setCategoryTags("");
        }
    }, [filterCategoryTags])

    useEffect(() => {
        if (!categoryTags) {
            getProductCategoryFromFirestoreDB()
                .then((data) => {
                    setCategoryTags(data.map(tag => {
                        return {
                            id:  tag.id,
                            title: tag.title,
                            tagName: tag.value,
                            count: tag.count,
                            isChecked: false
                        }
                    }));
                }).catch(error => {
                    console.log(`${error.code} - ${error.message}`);
                })
        }
    }, [categoryTags]);

    useEffect(() => {
        if (category && Object.keys(category).length > 0 && categoryTags && categoryTags.length > 0) {
            setCategoryTags(
                categoryTags.map( tag => {
                    return {
                        ...tag,
                        count: category[tag.title] || 0,
                    }
                })
            );
        }
    }, [category]);

    const checkChangeFilterTag = async(newTagFilter, filterCategoryTags) => {
        let res = false;
        if (newTagFilter.length !== filterCategoryTags.length) {
            res = true
        } else {
            for(let i = 0; i < newTagFilter.length; i++) {
                if (newTagFilter[i].id !== filterCategoryTags[i].id) {
                    return res = true
                }
            }
        };
        if (res) {
            dispatch(filterActions.setCategoryTags(newTagFilter));
        }
    }

    useEffect(() => {
        if (categoryTags && categoryTags.length > 0) {
            const newTagFilter = categoryTags.filter(tag => {
                if (tag.isChecked === true) {
                    return true;
                }
                return false;
            });
            checkChangeFilterTag(newTagFilter, filterCategoryTags);
        }
    }, [dispatch, categoryTags])

    const checkCategoryTagsHandler = async (tagName) => {
        await setCategoryTags(items =>
            items.map(item => {
                if (item.tagName === tagName) {
                    return {
                        ...item,
                        isChecked: !item.isChecked,
                    }
                } else {
                    return item
                }
            })
        );
    }

    return (
        <section className={style["sidebar-filter"]}>
            <div className={style["sidebar-filter__price"]}>
                <h2 className={style["sidebar-filter__title"]}>
                    Цена
                </h2>
                <div className={style["sidebar-filter__field-half"]}>
                    <input
                        className={style["sidebar-filter__input-half"]}
                        type="text"
                        placeholder={`от ${ minProductPrice }`}
                        name="minPrice"
                        onChange={ (e) => priceOnChange(e, "minPrice") }
                        onBlur={ () => priceOnBlur("minPrice") }
                        value={ minPriceValue }
                    />
                    <span></span>
                    <input
                        className={style["sidebar-filter__input-half"]}
                        type="text"
                        placeholder={`до ${ maxProductPrice }`}
                        name="maxPrice"
                        onChange={(e) => priceOnChange(e, "maxPrice")}
                        onBlur={ () => priceOnBlur("maxPrice") }
                        value={ maxPriceValue }
                    />
                </div>
            </div>
            <div className={style["category"]}>
                <h2 className={style["category__title"]}>
                    Категория
                </h2>
                <ul className={style["category__list"]}>
                    { categoryTags && categoryTags.length > 0
                        ?  categoryTags.map(tag => {
                            if (tag.count < 1) {
                                return "";
                            }
                            return (
                                <li className={style["category__item"]} key={ tag.id }>
                                    <CustomCheckbox isChecked={tag.isChecked} onChange={() => checkCategoryTagsHandler(tag.tagName)} label={`${tag.tagName} (${tag.count})`}/>
                                </li>
                            );
                        })
                        : null
                    }
                </ul>
            </div>
        </section>
    )
}