import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { AuthForm } from "../../components/authForm";
import { authentificationActions } from "../../store/authentication";
import { auth } from "../../config/firebase";

import style from "./register.module.scss";


export const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const formFields = [
        {name: "username", placeholder: "Login", type: "text", value: login, onChange: setLogin},
        {name: "email", placeholder: "example@email.com", type: "email", value: email, onChange: setEmail},
        {name: "password", placeholder: "Password", type: "password", value: password, onChange: setPassword},
        {name: "passwordConfirm", placeholder: "Confirm Password", type: "password", value: confirmPassword, onChange: setConfirmPassword},
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!login || !email || !password || !confirmPassword) {
            alert("Пожлуйста заполните все поля!");
        }
        if (password.length < 8) {
            alert("Пароль должен быть длинее 8 символов");
        }
        if (password !== confirmPassword) {
            alert("Пароль не совпадает");
        }

        // registration the user
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateProfile(user, {
                displayName: login,
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
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${ errorCode } - ${ errorMessage }`);
        });




    }

    return (
        <section className={ style.register } >
            <h1 className={ style.register__title }>
                Регистрация
            </h1>
            <AuthForm btnText={ "Зарегестрироваться" } formFields={ formFields } onSubmit= { handleSubmit }/>
        </section>
    )
}