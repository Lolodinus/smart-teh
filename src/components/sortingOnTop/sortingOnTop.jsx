import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterActions } from "../../store/filter";

import style from "./sortingOnTop.module.scss";

const options = [
    {id: 0, title: "По низкой цене", value: "price low"},
    {id: 1, title: "По высокой цене", value: "price high"},
]

export const SortingOnTop = () => {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState({});
    const dispatch = useDispatch();
    const { filterBy } = useSelector((store) => store.filter);

    const handleOnClick = (option) => {
        if (selection.id !== option.id || JSON.stringify(selection) === '{}') {
            setSelection(option);
            if ( filterBy !== option.value) {
                dispatch(filterActions.setFilter(option.value));
            }
        }
        setOpen(false);
    }

    useEffect(()=> {
        if (JSON.stringify(selection) !== '{}') {
            if ( filterBy !== selection.value) {
                dispatch(filterActions.setFilter(selection.value));
            }
        }
        if (filterBy === "all") {
            setSelection({});
        }
    }, [dispatch, selection, filterBy])

    const optionItems = options.map(option => {
        return (
            <li 
                className={ style.select__item }
                value={ option.value }
                key={ option.id }
                onClick={ () => handleOnClick(option) }
            >
                { option.title }
            </li>
        )
    })

    return (
        <div className={ style.select }>
            <button 
                className={ style.select__current }
                onClick={ () => setOpen(!open) }
                onKeyDown={ () => setOpen(!open) }
            >
                {JSON.stringify(selection) !== '{}' ? selection.title : "Сортировать по..."}
            </button>
            { open && 
                <ul className={ style.select__list }>
                    { optionItems }
                </ul>
            }
        </div>
    )
}