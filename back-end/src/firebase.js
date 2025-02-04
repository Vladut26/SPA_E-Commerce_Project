import { collection, getDocs, doc, setDoc,addDoc,where,query } from 'firebase/firestore';

import dotenv from 'dotenv';
dotenv.config();

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain:process.env.FIRBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIRBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIRBASE_MEASUREMENTID
};

const seedProducts = async () => {
    try {
        for (const product of products) {
            const productDocRef = doc(firestoreDB, 'products',product.id);              
            await setDoc(productDocRef, product);
            console.log(`Product added: ${product.name}`);    
        }
        console.log('All products uploaded successfully!');
    } catch (error) {
        console.error('Error uploading products:', error);
    }
};
// seedProducts();

export async function getProducts(db) {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        if (!querySnapshot.empty) {
            const products = [];
            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                products.push({ id: doc.id, ...docData }); 
            });
            return products; 
        } else {
            console.log("Collection doesn't exist or is empty!");
            return [];
        }
    } catch (error) {
        console.error("Error querying documents:", error);
        return [];
    }
}

