import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./pagination.module.scss";


export const Pages = ({totalPages, currentPage, setCurrentPage}) => {
    const dispatch = useDispatch();
    const [activePage, setActivePage] = useState(1);

    const clickOnPage = (e) => {
        if (e.target.innerHTML === activePage) {
            return
        }
        dispatch(setCurrentPage(e.target.innerHTML));
    }

    const getPages = () => {
        let content = [];
        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            const active = activePage && +activePage === pageNumber ? style._active : null;
            content.push(
                <li
                    key={pageNumber}
                    className={`${ style.pages__item } ${active}`}
                    onClick={(e) => clickOnPage(e)}
                >
                    {pageNumber}
                </li>
            );
        };
        return content;
    }

    useEffect(() => {
        setActivePage(currentPage);
    }, [currentPage])

    return (
        <section className={style.pages}>
            <ul className={style.pages__list}>
                { totalPages && totalPages >= 1 ? getPages() : null }
            </ul>
        </section>
    )
}