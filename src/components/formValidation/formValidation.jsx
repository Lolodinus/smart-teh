import { useState, useEffect } from "react";

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [specialCharError, setSpecialCharError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [inputValid, setInputValid] = useState(true);
    
    useEffect(() => {
        setErrorMessage({});
        let message = {};
        for (const validation in validations) {
            switch (validation) {
                case "isEmpty":
                    if (value) {
                        setEmpty(false);
                    } else {
                        setEmpty(true);
                        message = {
                            ...message,
                            "isEmpty": "Поле обязательно к заполнению"
                        };
                    }
                    break;
                case "minLength":
                    if (value.length < validations[validation]) {
                        setMinLengthError(true);
                        message = {
                            ...message,
                            "minLengthError": `Минимальная длина ${validations[validation]}`,
                        };
                    } else {
                        setMinLengthError(false);
                    }
                    break;
                case "maxLength":
                    if (value.length > validations[validation]) {
                        setMaxLengthError(true);
                        message = {
                            ...message,
                            "maxLengthError": `Максимальная длина ${validations[validation]}`,
                        };
                    } else {
                        setMaxLengthError(false);
                    }
                    break;
                case "isEmail":
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (re.test(String(value).toLowerCase())) {
                        setEmailError(false)
                    } else {
                        setEmailError(true);
                        message = {
                            ...message,
                            "emailError": "Некорректный email"
                        };
                    }
                    break;
                case "confirmValue":
                    if (value !== validations[validation]) {
                        setConfirmPasswordError(true);
                        message = {
                            ...message,
                            "confirmPasswordError": "Пароль не совпадает",
                        };
                    } else {
                        setConfirmPasswordError(false);
                    }
                    break;
                case "checkSpecialChar":
                    // eslint-disable-next-line
                    const reSpecialChar = /[\!\@#\$\%\^\&\*\(\)\+\=\-\[\]\\\'\;\,\/\{\}\|\"\:\<\>\?]/;
                    if (value.match(reSpecialChar)) {
                        setSpecialCharError(true);
                        message = {
                            ...message,
                            "specialCharError": "Запрещено использовать специальные символы",
                        };
                    } else {
                        setSpecialCharError(false);
                    }
                    break;
                default:
                    break
            }
        }
        setErrorMessage(message);
        // eslint-disable-next-line
    }, [value])

    useEffect(() => {
        isEmpty || minLengthError || maxLengthError || confirmPasswordError || emailError || specialCharError ? setInputValid(false) : setInputValid(true);
    }, [isEmpty, minLengthError, maxLengthError, confirmPasswordError, emailError, specialCharError ])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        confirmPasswordError,
        specialCharError,
        errorMessage,
        inputValid
    }
}

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onBlur = (e) => {
        setDirty(true);
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export const useFirebaseErrorHandler = (error) => {
    const [errorMessage, setErrorMessage] = useState({});

    useEffect(() => {
        switch (error) {
            // email error
            case "auth/user-not-found":
                return setErrorMessage({
                    fieldType: "email",
                    message: `Пользователя с таким email не существует`
                });
            case "auth/email-already-in-use":
                return setErrorMessage({
                    fieldType: "email",
                    message: "Пользователь с таким email уже существует"
                });
            case "auth/missing-email":
                return setErrorMessage({
                    fieldType: "email",
                    message: "Поле обязательно к заполнению"
                });
                
            // password error
            case "auth/wrong-password":
                return setErrorMessage({
                    fieldType: "password",
                    message: "Пароль введёт неверно"
                });
            case "auth/weak-password":
                return setErrorMessage({
                    fieldType: "password",
                    message: "Ненадёжный пароль. Пароль должен состоять минимум из 6 символов"
                });
                
            // other error
            case "auth/too-many-requests":
                return setErrorMessage({
                    fieldType: "all",
                    message: "Вы привысили количество попыток войти в аккаунт. Попробуйте позже."
                });
            default:
                return setErrorMessage({});
        }
    }, [error])

    return errorMessage;
}