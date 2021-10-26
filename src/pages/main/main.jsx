import React from "react";

import { SearchAlgolia } from "../../components/searchAlgolia";
import { SortingOnTop } from "../../components/sortingOnTop/";

import style from "./main.module.scss";


export const Main = () => {    
    return (
        <section className={ style.main }>
            <SortingOnTop/>
            <SearchAlgolia/>
        </section>
    )
}
