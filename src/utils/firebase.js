import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { database } from "../config/firebase";


export const getAllProduct = async () => {
    const products = [];
    const querySnapshot = await getDocs(collection(database, "product"));

    await querySnapshot.forEach((doc) => {
        products.push({
            ...doc.data(),
            id: doc.id
        });
    });

    return products
}

export const getProductById = async (id) => {
    const docRef = doc(database, "product", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            ...docSnap.data(),
            id: id
        }
    } else {
        console.log("No such document!");
    }
}