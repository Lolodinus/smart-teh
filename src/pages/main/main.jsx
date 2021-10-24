import React from "react";
import { SearchAlgolia } from "../../components/searchAlgolia";

import style from "./main.module.scss";


export const Main = () => {    
    return (
        <section className={ style.main }>
            <SearchAlgolia/>
        </section>
    )
}
