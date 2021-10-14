import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { authentificationActions } from "../../store/authentication";
import { auth, database } from "../../config/firebase";
import { useInput, useFirebaseErrorHandler } from "../../components/formValidation";

import style from "./register.module.scss";


export const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // form validatin
    const login = useInput("", {isEmpty: true, minLength: 5, maxLength: 20, checkSpecialChar: false});
    const email = useInput("", {isEmpty: true, minLength: 3, isEmail: true, maxLength: 50});
    const password = useInput("", {isEmpty: true, minLength: 5, maxLength: 50});
    const passwordConfirm = useInput("", {isEmpty: true, minLength: 5, maxLength: 50, confirmValue: password.value});
    const [validForm, setValidForm] = useState("");

    useEffect(() => {
        login.inputValid && email.inputValid && password.inputValid && passwordConfirm.inputValid ? setValidForm(false) : setValidForm(true);
    }, [login.inputValid, email.inputValid, password.inputValid, passwordConfirm.inputValid])


    // firebase submit validation
    const [errorForm, setErrorForm] = useState("");
    const errorFirebase = useFirebaseErrorHandler (errorForm);

    const handleSubmit = (e) => {
        e.preventDefault();

        // registration the user
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateProfile(user, {
                displayName: login.value,
            })
            .then(() => {                    
                // add data to redux
                const data = {
                    user: user.providerData[0],
                    id: user.uid
                };

                dispatch(authentificationActions.setUser(data));
                history.push("/");
            });
            return user
        })
        .then(async (user) => {
            const userData = {
                username: login.value,
                email: email.value,
                createdAt: new Date(),
            }

            await setDoc(doc(database, "users", user.uid), userData);
              console.log("Document written with ID: ", user.uid);
        })
        .catch((error) => {
            console.log(error.code);
            setErrorForm(error.code);
        });
    }


    return (
        <section className={ style.register } >
            <h1 className={ style.register__title }>
                Регистрация
            </h1>
            <form 
                className={style["auth-form"]}
                onSubmit={ (e) => handleSubmit(e) }
            >
                <div 
                    className={style["auth-form__field"]}
                >
                    { errorFirebase && errorFirebase.fieldType === "all" ? <div className={ `${style["auth-form__error"]} ${style["_farebase"]}` }>{ errorFirebase.message }</div> : null }
                </div>
                <div 
                    className={style["auth-form__field"]}
                >
                    { (login.isDirty && login.isEmpty) && <div className={ style["auth-form__error"] }>{ login.errorMessage.isEmpty }</div>}
                    { (login.isDirty && login.minLengthError) && <div className={ style["auth-form__error"] }>{ login.errorMessage.minLengthError }</div> }
                    { (login.isDirty && login.maxLengthError) && <div className={ style["auth-form__error"] }>{ login.errorMessage.maxLengthError }</div> }
                    { (login.isDirty && login.specialCharError) && <div className={ style["auth-form__error"] }>{ login.errorMessage.specialCharError }</div> }
                    <input 
                        className={style["auth-form__input"]} 
                        type="text" 
                        placeholder="Имя пользователя"
                        name="username"
                        value={ login.value }
                        onChange= { (e) => {
                            login.onChange(e);
                            setErrorForm("");
                        } }
                        onBlur={ (e) => login.onBlur(e) }
                    />
                </div>
                <div 
                    className={style["auth-form__field"]}
                >
                    { (email.isDirty && email.isEmpty) && <div className={ style["auth-form__error"] }>{ email.errorMessage.isEmpty }</div>}
                    { (email.isDirty && email.minLengthError) && <div className={ style["auth-form__error"] }>{ email.errorMessage.minLengthError }</div> }
                    { (email.isDirty && email.maxLengthError) && <div className={ style["auth-form__error"] }>{ email.errorMessage.maxLengthError }</div> }
                    { (email.isDirty && email.emailError) && <div className={ style["auth-form__error"] }>{ email.errorMessage.emailError }</div> }
                    { errorFirebase && errorFirebase.fieldType === "email" ? <div className={ `${style["auth-form__error"]} ${style["_farebase"]}` }>{ errorFirebase.message }</div> : null }
                    <input 
                        className={style["auth-form__input"]} 
                        type="email" 
                        placeholder="example@mail.com"
                        name="email"
                        value={ email.value }
                        onChange= { (e) => {
                            email.onChange(e);
                            setErrorForm("");
                        } }
                        onBlur={ (e) => email.onBlur(e) }
                    />
                </div>
                <div 
                    className={style["auth-form__field"]}
                >
                    { (password.isDirty && password.isEmpty) && <div className={ style["auth-form__error"] }>{ password.errorMessage.isEmpty }</div>}
                    { (password.isDirty && password.minLengthError) && <div className={ style["auth-form__error"] }>{ password.errorMessage.minLengthError }</div> }
                    { (password.isDirty && password.maxLengthError) && <div className={ style["auth-form__error"] }>{ password.errorMessage.maxLengthError }</div> }
                    { errorFirebase && errorFirebase.fieldType === "password" ? <div className={ `${style["auth-form__error"]} ${style["_farebase"]}` }>{ errorFirebase.message }</div> : null }
                    <input 
                        className={style["auth-form__input"]} 
                        type="password" 
                        placeholder="Введите пароль"
                        name="password"
                        value={ password.value }
                        onChange= { (e) => {
                            password.onChange(e);
                            setErrorForm("");
                        } }
                        onBlur={ (e) => password.onBlur(e) }
                    />
                </div>
                <div 
                    className={style["auth-form__field"]}
                >
                    { (passwordConfirm.isDirty && passwordConfirm.isEmpty) && <div className={ style["auth-form__error"] }>{ passwordConfirm.errorMessage.isEmpty }</div>}
                    { (passwordConfirm.isDirty && passwordConfirm.minLengthError) && <div className={ style["auth-form__error"] }>{ passwordConfirm.errorMessage.minLengthError }</div> }
                    { (passwordConfirm.isDirty && passwordConfirm.maxLengthError) && <div className={ style["auth-form__error"] }>{ passwordConfirm.errorMessage.maxLengthError }</div> }
                    { (passwordConfirm.isDirty && passwordConfirm.confirmPasswordError) && <div className={ style["auth-form__error"] }>{ passwordConfirm.errorMessage.confirmPasswordError }</div> }
                    <input 
                        className={style["auth-form__input"]} 
                        type="password" 
                        placeholder="Подтвердите пароль"
                        name="passwordConfirm"
                        value={ passwordConfirm.value }
                        onChange= { (e) => {
                            passwordConfirm.onChange(e);
                            setErrorForm("");
                        } }
                        onBlur={ (e) => passwordConfirm.onBlur(e) }
                    />
                </div>
                <button 
                    className={style["auth-form__submit-btn"]} 
                    type="submit"
                    disabled={ validForm }
                >
                    Зарегистрация
                </button>
            </form>
        </section>
    )
}