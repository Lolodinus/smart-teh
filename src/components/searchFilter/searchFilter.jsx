import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { filterActions } from "../../store/filter"
import style from "./searchFilter.module.scss";

export const SearchFilter = ({ classes }) => {
    const { searchQuery } = useSelector((store) => store.filter);
    const dispatch = useDispatch();


    const handleSearchQuery = (e) => {
        dispatch(filterActions.setSearchQuery(e.target.value));
    }

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <form className={ `${ classes } ${ style.search }` } onSubmit={ submitHandler }>
            <input 
                type="text"
                className={ style.search__input }
                onChange={ (e) => handleSearchQuery(e) }
                placeholder="Поиск по сайту"
                value={ searchQuery }
            />
            <button
                type="submit" 
                className={ style.search__btn }
            >
            </button>
        </form>
    )
}