import { doc, collection, query, getDoc, getDocs, startAt, limit, orderBy} from "firebase/firestore";
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

export const getProductOnPage = async (page, numberOfItems) => {
    const documentSnapshots  = await getDocs(query(collection(database, "product"), orderBy("title")));
    const totalProduct = documentSnapshots.docs.length;
    const startPoint = documentSnapshots.docs[(page - 1) * numberOfItems]
    const itemsOnPage = query(collection(database, "product"),
    orderBy("title"),
    startAt(startPoint),
    limit(numberOfItems));
    
    const products = [];
    const querySnapshot = await getDocs(itemsOnPage);

    await querySnapshot.forEach((doc) => {
        products.push({
            ...doc.data(),
            id: doc.id
        });
    });
    return {products, totalProduct}

}