import React from "react";

import style from "./undefindedPage.module.scss";

export const UndefindedPage = () => {
    return (
        <section className={ style["undefined-page"] } >
            <h1 className={ style["undefined-page__title"] } >
                Страницы по такому адресу пока что нет.
                <br />
                Но возможно она появится! ;)
            </h1>
            <span className={ style["undefined-page__image"] }></span>
            <a className={ style["undefined-page__message"] } href="#">
                Обратитесь в службу поддержки, если вы считаете, что произошла ошибка.
            </a>
        </section>
    )
}