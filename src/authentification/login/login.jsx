import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../config/firebase";
import { authentificationActions } from "../../store/authentication";
import { pageLinks } from "../../constant/";
import { useInput, useFirebaseErrorHandler } from "../../components/formValidation";

import style from "./login.module.scss";


export const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // form validatin
    const email = useInput("", {isEmpty: true, minLength: 3, maxLength: 50, isEmail: true});
    const password = useInput("", {isEmpty: true, minLength: 5, maxLength: 50});
    const [validForm, setValidForm] = useState("");

    useEffect(() => {
        email.inputValid && password.inputValid ? setValidForm(false) : setValidForm(true);
    }, [email.inputValid, password.inputValid])

    // firebase submit validation
    const [errorForm, setErrorForm] = useState("");
    const errorFirebase = useFirebaseErrorHandler (errorForm);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                // add data to redux
                const data = {
                    user: user.providerData[0],
                    id: user.uid
                };

                dispatch(authentificationActions.setUser(data));
                history.push(pageLinks.main);
            })
            .catch((error) => {
                setErrorForm(error.code);
            });
    }

    return (
        <section className={ style.login } >
            <h1 className={ style.login__title }>
                Вход
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
                    { (password.isDirty && password.isEmpty) && <div className={ style["auth-form__error"] }>{ password.errorMessage.isEmpty }</div> }
                    { (password.isDirty && password.minLengthError) && <div className={ style["auth-form__error"] }>{ password.errorMessage.minLengthError }</div> }
                    { (password.isDirty && password.maxLengthError) && <div className={ style["auth-form__error"] }>{ password.errorMessage.maxLengthError }</div> }
                    { errorFirebase && errorFirebase.fieldType === "password" ? <div className={ `${style["auth-form__error"]} ${style["_farebase"]}` }>{ errorFirebase.message }</div> : null }
                    <input 
                        className={style["auth-form__input"]} 
                        type="password" 
                        placeholder="password"
                        name="password"
                        value={ password.value }
                        onChange= { (e) => { 
                            password.onChange(e);
                            setErrorForm("");
                        } }
                        onBlur={ (e) => password.onBlur(e) }
                    />
                </div>
                <button 
                    className={style["auth-form__submit-btn"]} 
                    type="submit"
                    disabled={ validForm }
                >
                    Войти
                </button>
            </form>
            <hr/>
            <Link className={ style.login__link } to={ `${ pageLinks.authentification }${ pageLinks.register }` }>
                Зарегистрироваться
            </Link>
        </section>
    )
}