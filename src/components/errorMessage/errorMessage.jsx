import React from "react";

import style from "./errorMessage.module.scss";

export const ErrorMessage = ({errorMessage}) => {
    const errorDescription = errorMessage ? errorMessage : "Что-то пошло не так...";
    return (
        <div className={ style["error-message"] }>
            <div className={ style["error-message__header"] }>
                <span></span>
                <h2>
                    Oops!..
                </h2>
            </div>
            <p className={ style["error-message__description"] }>
                { errorDescription }
                <br />
                Если проблема не устранилась, свяжитесь с нами.
            </p>
        </div>
    )
}