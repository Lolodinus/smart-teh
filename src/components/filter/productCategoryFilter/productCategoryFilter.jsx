import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CustomCheckbox } from "../../customCheckbox";
import { filterActions } from "../../../store/filter";
import { getProductCategoryFromFirestoreDB, isEqual } from "../../../utils";

import style from "./productCategoryFilter.scss";

export const ProductCategoryFilter = () => {
    const dispatch = useDispatch();    
    const { category: productCategory } = useSelector((store) => store.products);
    const { categoryTags: filterCategoryTags } = useSelector((store) => store.filter);

    const [categoryTags, setCategoryTags] = useState("");

    // reset category teg
    useEffect(() => {
        if (filterCategoryTags.length === 0 && categoryTags) {
            if ( categoryTags.filter(tag => tag.isChecked === true ? true : false).length > 0 ) {
                setCategoryTags( items =>
                    items.map(item => {
                        return {
                            ...item,
                            isChecked: false
                        }
                    })
                );
            }
        }
    }, [categoryTags, filterCategoryTags])

    // set category teg
    useEffect(() => {
        if (!categoryTags) {
            getProductCategoryFromFirestoreDB().then((allProductCategory) => {
                setCategoryTags(
                    allProductCategory.map(
                        tag => {
                            return {
                                id:  tag.id,
                                title: tag.title,
                                tagName: tag.value,
                                count: tag.count,
                                isChecked: false,
                            }
                        }
                    )
                )
            }).catch(error => {
                console.log(error);
            })
        }
    }, [categoryTags, filterCategoryTags]);

    // check available tags
    useEffect(() => {
        if (productCategory && Object.keys(productCategory).length > 0 && categoryTags && categoryTags.length > 0) {
            const newTags = categoryTags.map( tag => {
                return {
                    ...tag,
                    count: productCategory[tag.title] || 0,
                }
            });
            if (!isEqual(newTags, categoryTags)) {
                setCategoryTags(newTags);
            }
        }
    }, [productCategory, categoryTags]);

    // check settled tag filters
    useEffect(() => {
        if (filterCategoryTags && filterCategoryTags.length > 0 && categoryTags && categoryTags.length > 0) {
            const newTags = categoryTags.map( tag => {
                return {
                    ...tag,
                    isChecked: filterCategoryTags.filter(
                        filterTag => {
                            return filterTag.id === tag.id ? true : false;
                        }
                    ).length > 0 ? true : false
                }
            });
            if (!isEqual(newTags, categoryTags)) {
                setCategoryTags(newTags);
            }
        }
    }, [filterCategoryTags, categoryTags]);

    // uncheck unavailable product category
    useEffect(() => {
        if (categoryTags && categoryTags.length > 0) {
            const newTags = categoryTags.map(tag => {
                return {
                    ...tag,
                    isChecked: tag.count === 0 ? false : tag.isChecked
                }
            })
            if (!isEqual(newTags, categoryTags)) {
                setCategoryTags(newTags);
                dispatch(filterActions.setCategoryTags(
                    newTags.filter(
                        tag => {
                            if (tag.isChecked === true) {
                                return true;
                            }
                            return false;
                        }
                    )
                ));
            }
        }
    }, [categoryTags, dispatch])

    const checkCategoryTagsHandler = async (tagName) => {
        const newCategoryTags = await categoryTags.map(item => {
            if (item.tagName === tagName) {
                return {
                    ...item,
                    isChecked: !item.isChecked,
                }
            } else {
                return item
            }
        });
        await setCategoryTags(newCategoryTags);
        
        dispatch(filterActions.setCategoryTags(
            newCategoryTags.filter(
                tag => {
                    if (tag.isChecked === true) {
                        return true;
                    }
                    return false;
                }
            )
        ));
    }

    return (
        <ul className={style["category__list"]}>
            { categoryTags && categoryTags.length > 0
                ?  categoryTags.map(tag => {
                    if (tag.count < 1) {
                        return "";
                    }
                    return (
                        <li className={style["category__item"]} key={ tag.id }>
                            <CustomCheckbox isChecked={tag.isChecked} onChange={() => checkCategoryTagsHandler(tag.tagName)} label={`${tag.tagName} (${tag.count})`}/>
                        </li>
                    );
                })
                : null
            }
        </ul>
    )
}