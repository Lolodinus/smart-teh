import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { updateDocToFirebaseDB } from "./"

// login
export const loginWithFirebase = async (email, password, dispatch, successFunc, errorHandler) => {
    console.log(email, password);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // send data to redux
        await dispatch(successFunc({
            user: user.providerData[0],
            id: user.uid,
        }));

        // update firestore
        await updateDocToFirebaseDB("users", user.uid, { authAt: new Date() });

        return true;
    } catch(error) {
        errorHandler(error.code);
        return false;
    }
}



// check auth status
export const checkStatusUser = async (dispatch, success) => {
    console.log(typeof success);
    await onAuthStateChanged(auth, (user) => {
        if (user && success) {
            dispatch(success({
                id: user.uid,
                user: user.providerData[0]
            }));
        }
    });
}