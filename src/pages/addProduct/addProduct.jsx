import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

import { database } from "../../config/firebase";
import { indexAlgolia } from "../../config/algolia";

import style from "./addProduct.module.scss";

export const AddProduct = () => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState("");
    const [category, setCategory] = useState("");
    const [detail, setDetail] = useState([
        {
            specification: "",
            specificationValue: ""
        },
    ]);

    const resetForm = () => {
        setTitle("");
        setPrice("");
        setImg("");
        setCategory("");
        setDetail([
            {
                specification: "",
                specificationValue: ""
            },
        ])
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const docRef = await addDoc(collection(database, "product"), {
            title,
            "price": +price,
            img,
            category,
            detail
        });
        
        await indexAlgolia.saveObject({
            objectID: docRef.id,
            title,
            price: +price,
            img,
            category
        }).then(() => {
            resetForm();
        }).catch(error => {
            console.log(error)
        });
    }
    
    const handleChangeDetailField = (index, event) => {
        setDetail([
            ...detail.slice(0, index),
            {
                ...detail[index], 
                [event.target.name]: event.target.value,
            },
            ...detail.slice(index + 1)
        ]);
    }

    const addDetailField = (index) => {
        setDetail([
            ...detail.slice(0, index + 1),
            {
                specification: "",
                specificationValue: ""
            },
            ...detail.slice(index + 1)
        ])
    }

    const deleteDetailField = (index) => {
        setDetail([
            ...detail.slice(0, index),
            ...detail.slice(index + 1)
        ])
    }

    const detailFields = detail.map((specification, index) => {
        return (
            <div key={index} className={ style["add-product__field"] }>
                <input 
                    type="text"
                    name="specification"
                    placeholder="Характеристика"
                    value= { specification.specification }
                    className={ style["add-product__half-input"] }
                    onChange={event => handleChangeDetailField(index, event)}
                />
                <input 
                    type="text"
                    name="specificationValue"
                    placeholder="Значение характеристики"
                    value= { specification.specificationValue }
                    className={ style["add-product__half-input"] }
                    onChange={event => handleChangeDetailField(index, event)}
                />
                <button type="button" className={ style["add-product__add-field-btn"] } onClick={() => addDetailField(index)}>
                    +
                </button>
                <button type="button" className={ style["add-product__delete-field-btn"] } onClick={() => deleteDetailField(index)}>
                    -
                </button>
            </div>
        )
    })

    return (
        <section className={style["add-product"]}>
            <h1 className={style["add-product__title"]} >
                Добавить товар
            </h1>
            <form 
                onSubmit={ (e) => onSubmitHandler(e) }
                className={ style["add-product__form"] }
            >
                <div className={ style["add-product__field"] }>
                    <input 
                        type="text"
                        name="title"
                        placeholder="Введите название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={ style["add-product__input"] }
                    />
                </div>
                <div className={ style["add-product__field"] }>
                    <input 
                        type="text"
                        name="price"
                        placeholder="Введите цену"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={ style["add-product__input"] }
                    />
                </div>
                <div className={ style["add-product__field"] }>
                    <input
                        type="text"
                        name="img"
                        placeholder="Ссылка на изображение"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        className={ style["add-product__input"] }
                    />
                </div>
                <div className={ style["add-product__field"] }>
                    <input 
                        type="text"
                        name="category"
                        placeholder="Введите категорию"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={ style["add-product__input"] }
                    />
                </div>
                <hr/>
                <h2 className={ style["add-product__heading"] }>
                    Детали продукта
                </h2>
                { detailFields }
                <button 
                    type="submit"
                    className={ style["add-product__btn"] }
                >
                    Создать
                </button>
            </form>
        </section>
    )
}