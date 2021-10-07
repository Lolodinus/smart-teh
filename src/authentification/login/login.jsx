import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { AuthForm } from "../../components/authForm";
import { auth } from "../../config/firebase";
import { authentificationActions } from "../../store/authentication";
import { pageLinks } from "../../constant/";

import style from "./login.module.scss";


export const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formFields = [
        {name: "email", placeholder: "example@mail.com", type: "email", value: email, onChange: setEmail},
        {name: "password", placeholder: "Password", type: "password", value: password, onChange: setPassword}
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return alert("Пожлуйста заполните все поля!");
        }
        if (password.length < 8) {
            return alert("Пароль должен быть длинее 8 символов");
        }
        signInWithEmailAndPassword(auth, email, password)
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
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${ errorCode } - ${ errorMessage }`);
            });
    }

    return (
        <section className={ style.login } >
            <h1 className={ style.login__title }>
                Вход
            </h1>
            <AuthForm btnText={ "Войти" } formFields={ formFields } onSubmit= { handleSubmit }/>
        </section>
    )
}