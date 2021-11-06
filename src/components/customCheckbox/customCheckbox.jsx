import React from "react";

import style from "./customCheckbox.module.scss";

export const CustomCheckbox = ({isChecked, onChange, label}) => {
    return (
        <div className={ style.checkbox }>
            <label className={ style.checkbox__label }>
                <input 
                    type="checkbox"
                    onChange={() => {
                        onChange();
                    }}
                    className={ `${style.checkbox__input} ${isChecked ? style._active : ""}` }
                />
                <span
                    className={ `${ style.checkbox__fake} ${isChecked ? style._active : ""}` }
                    aria-hidden="true"
                />
                { label }
            </label>
        </div>
    )
}