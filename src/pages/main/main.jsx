import React from "react";

import { SearchAlgolia } from "../../components/searchAlgolia";
import { SortingOnTop } from "../../components/sortingOnTop/";
import { SidebarFilter } from "../../components/sidebarFilter";

import style from "./main.module.scss";


export const Main = () => {    
    return (
        <section className={ style.main }>
            <SortingOnTop/>
            <div className={ style.main__container }>
                <SidebarFilter/>
                <SearchAlgolia/>
            </div>
        </section>
    )
}
