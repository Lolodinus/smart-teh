import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { pageLinks} from "../../constant";
import { filterActions } from "../../store/filter";
import { SearchFilter } from "../searchFilter/searchFilter";

import style from "./header.module.scss"

export const Header = () => {
    const dispatch = useDispatch();    
    const { totalQuantity } = useSelector((store) => store.cart);

    const refreshPage = () => {        
        dispatch(filterActions.setSearchQuery(""));
    }

    const productInCartExist = totalQuantity ? style.active : "";

    return (
        <header className={ style.header }>
            <div className={ style.header__container }>
                <div className={ style.header__row }>
                    <SearchFilter classes={ style.header__search }/>
                    <Link 
                        className={ style.header__logo }
                        to={ pageLinks.main }
                        onClick={ refreshPage }
                    >
                        <span className={ style["header__logo-icon"] }></span>
                        <h1>
                            Smart Teh
                        </h1>
                    </Link>
                    <Link className={ style.header__cart } to={ pageLinks.cart }>
                        <span className={ productInCartExist }>{totalQuantity}</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}