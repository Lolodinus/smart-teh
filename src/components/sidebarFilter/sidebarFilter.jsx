import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { filterActions } from "../../store/filter"

import style from "./sidebarFilter.module.scss";

export const SidebarFilter = () => {
    const dispatch = useDispatch();
    
    const { minProductPrice, maxProductPrice } = useSelector((store) => store.products);
    // search filter
    const { minPrice, maxPrice } = useSelector((store) => store.filter);

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
        </section>
    )
}