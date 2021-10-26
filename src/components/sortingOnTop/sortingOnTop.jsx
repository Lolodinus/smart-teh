import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterActions } from "../../store/filter";

import style from "./sortingOnTop.module.scss";

const options = [
    {id: 0, title: "По низкой цене", value: "priceLow"},
    {id: 1, title: "По высокой цене", value: "priceHigh"},
]

export const SortingOnTop = () => {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState({});
    const dispatch = useDispatch();
    const { filterBy } = useSelector((store) => store.filter);

    const handleOnClick = (option) => {
        if (selection.id !== option.id || JSON.stringify(selection) === '{}') {
            setSelection(option);
        }
        setOpen(false);
    }

    useEffect(()=> {
        if (selection.value === "priceLow") {
            dispatch(filterActions.setFilter(selection.value));
        } else if (selection.value === "priceHigh") {
            dispatch(filterActions.setFilter(selection.value));
        }
    }, [dispatch, selection])

    useEffect(()=> {
        switch(filterBy) {
            case "priceLow":
                return setSelection({
                    id: 0,
                    title: "По низкой цене",
                    value: "priceLow"
                });
            case "priceHigh":
                return setSelection({
                    id: 0,
                    title: "По высокой цене",
                    value: "priceHigh"
                });
            default:
                return setSelection({});
        }
    }, [filterBy])

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
                // onKeyDown={ () => setOpen(!open) }
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