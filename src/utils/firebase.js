import { doc, collection, query, getDoc, getDocs, addDoc, updateDoc, startAt, limit, orderBy, where} from "firebase/firestore";
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

export const getCountProductByCategory = (category) => {

    const countCategory = query(collection(database, "product"), where("category", "==", category)).count;
    return countCategory;
}

export const getProductCategoryFromFirestoreDB = async () => {
    const docRef = collection(database, "category");
    const querySnapshot = await getDocs(docRef);

    let productCatygory = [];
    await querySnapshot.forEach((doc) => {
        productCatygory.push({
            ...doc.data(),
            id: doc.id
        });
    });

    return productCatygory
}

export const updateСategoryCount = async(categoryRef, addProduct=true) => {
    const operation = addProduct ? (count) => {return count + 1} : (count) => {return count - 1};

    const categorySnap = await getDoc(categoryRef);
    let count;
    if (categorySnap.exists()) {
        count = categorySnap.data().count;
        try {
            await updateDoc(categoryRef, {
                count: operation(count),
            });
        } catch(error) {
            console.log(`${error.code} - ${error.message}`);
        }
    } else {
        console.log("No such document!");
        return;
    }
}

export const addProductToFirebaseDB = async (title, price, img, category, detail) => {
    const categoryRef = doc(database, "category", category.id);
    await updateСategoryCount(categoryRef);
    try {
        const productRef = await addDoc(collection(database, "product"), {
            title: title,
            price: +price,
            img: img,
            category: categoryRef,
            detail: detail,
        });
        return productRef.id;
    } catch(error) {
        console.log(`${error.code} - ${error.message}`);
    }
}


// add user to database
export const updateDocToFirebaseDB = async(DBTable, docId, newData) => {
    const docRef = await doc(database, DBTable, docId);
    
    await updateDoc(docRef, {
        ...newData,
    });

    // const userRef = doc(database, "users", user.uid);

    // await updateDoc(userRef, {
    //     authAt: new Date(),
    //   });
}