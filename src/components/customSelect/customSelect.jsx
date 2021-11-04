import React, { useState, useEffect  } from "react";

import style from "./customSelect.module.scss";

export const CustomSelect = ({options, defaulSelectValue, setOption, selectedOption}) => {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState("");

    

    const handleOnClick = (option) => {
        if (!selection || option.id !== selection.id) {
            setSelection(option);
            setOption(option);
        }
        setOpen(false);
    }

    // reset selected option
    useEffect(() => {
        if (selectedOption === "") {
            setSelection("");
        }
    }, [selectedOption])

    return (
        <div className={ style.select }>
            <button
                type="button"
                className={ style.select__current }
                onClick={ () => setOpen(!open) }
                onKeyDown={ (e) => {
                    if (e.currentTarget.code === "Enter" || e.currentTarget.code === "Space") {
                        setOpen(!open)
                    }
                } }
            >
                {selection ? selection.value : defaulSelectValue}
            </button>
            { open && 
                <ul className={ style.select__list }>
                    {
                        options && options.length > 0 
                            ? options.map(option => {
                                return (
                                    <li 
                                        className={ style.select__item }
                                        key={ option.id }
                                        onClick={ () => handleOnClick(option) }
                                    >
                                        { option.value }
                                    </li>
                                )
                            })
                            : null
                    }
                    {/* {allOptions} */}
                </ul>
            }
        </div>
    )
}