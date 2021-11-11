import React from "react";

import { PriceFilter } from "../filter/priceFilter";
import { ProductCategoryFilter } from "../filter/productCategoryFilter";

import style from "./sidebarFilter.module.scss";

export const SidebarFilter = () => {

    return (
        <section className={style["sidebar-filter"]}>
            <div className={style["sidebar-filter__item"]}>
                <h2 className={style["sidebar-filter__title"]}>
                    Цена
                </h2>
                <PriceFilter/>
            </div>
            <div className={style["sidebar-filter__item"]}>
                <h2 className={style["sidebar-filter__title"]}>
                    Категория
                </h2>
                <ProductCategoryFilter/>
            </div>
        </section>
    )
}