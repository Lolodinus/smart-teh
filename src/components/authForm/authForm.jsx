import React from "react";

import style from "./authForm.module.scss";

export const AuthForm = ({ btnText, formFields, onSubmit }) => {
    const submitBtnText = btnText || "Text";

    const setFormField = fields => fields.map(field => {
            return (
                <div 
                    className={style["auth-form__field"]}
                    key={ field.name }
                >
                    <input 
                        className={style["auth-form__input"]} 
                        type={ field.type } 
                        placeholder={ field.placeholder } 
                        name={ field.name }
                        value={ field.value ? field.value : "" }
                        onChange= {field.onChange ? (e) => field.onChange(e.target.value) : ""}
                    />
                </div>
            )
        })
    
    return (
        <form 
            className={style["auth-form"]}
            onSubmit={ (e) => onSubmit(e) }
        >
            { setFormField(formFields) }
            <button 
                className={style["auth-form__submit-btn"]} 
                type="submit"
            >
                { submitBtnText }
            </button>
        </form>
    )
}