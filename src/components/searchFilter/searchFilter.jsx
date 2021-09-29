import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { filterActions } from "../../store/filter"
import style from "./searchFilter.module.scss";

export const SearchFilter = ({ classes }) => {
    const { searchQuery } = useSelector((store) => store.filter);
    const dispatch = useDispatch();
    let [keyword, setKeyword] = useState("");

    
    useEffect(() => {
        setKeyword(searchQuery)
    }, [searchQuery]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(filterActions.setSearchQuery(keyword));
    }

    return (
        <form className={ `${ classes } ${ style.search }` } onSubmit={ submitHandler }>
            <input 
                type="text"
                className={ style.search__input }
                onChange={ (e) => setKeyword(e.target.value) }
                placeholder="Поиск по сайту"
                value={ keyword }
            />
            <button
                type="submit" 
                className={ style.search__btn }
            >
            </button>
        </form>
    )
}