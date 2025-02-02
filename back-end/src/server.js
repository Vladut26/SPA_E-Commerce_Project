import express from 'express';
import { cartItems, products } from './temp-data.js';
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors';

import { firebaseConfig } from './firebase.js';
import { collection, getDocs, doc, setDoc,addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const databaseApp = initializeApp(firebaseConfig);
const firestoreDB=getFirestore(databaseApp);

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors());

const seedProducts = async () => {
    try {
        for (const product of products) {
            const productDocRef = collection(firestoreDB, 'products');              
            await addDoc(productDocRef, product);
            console.log(`Product added: ${product.name}`);    
        }
        console.log('All products uploaded successfully!');
    } catch (error) {
        console.error('Error uploading products:', error);
    }
};

seedProducts();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, '../assets')));

app.get('/hello',(req,res)=>{
    res.send('Hello!')
})

app.get('/api/products',(req,res)=>{
    res.send(products)
})

app.get('/api/cart',(req,res)=>{
    const populatedCart=cartItems.map(id=>products.find(product=>product.id===id))
    res.send(populatedCart)
})

app.get('/api/products/:productId',(req,res)=>{
    const productId=req.params.productId;
    const product= products.find(product=>product.id===productId);
    res.send(product)
})

app.post('/api/cart',(req,res)=>{
    const productId=req.body.id;
    cartItems.push(productId);
    const populatedCart=cartItems.map(id=>products.find(product=>product.id===id))
    res.send(populatedCart);
})
app.delete('/api/cart/:productId',(req,res)=>{
    const productId = req.params.productId;
    const index = cartItems.indexOf(productId);
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    const populatedCart = cartItems.map(id => products.find(product => product.id === id));
    res.send(populatedCart);
})

app.listen(8000,()=>{
    console.log("Server is listening on port 8000")
})