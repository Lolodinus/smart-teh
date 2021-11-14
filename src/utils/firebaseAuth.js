import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

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