import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import { cartItems } from './temp-data.js';
import { getProducts } from './firebase.js';
import { register, login, logout, getUser } from '../controlers/users.js';

import { firebaseConfig } from './firebase.js';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const databaseApp = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(databaseApp);

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser());
app.use(cors());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, '../assets')));

app.get('/hello', (req, res) => {
    res.send('Hello!')
})

app.post("/register", async (req, res) => register(req, res, firestoreDB));
app.post("/login", async (req, res) => login(req, res, firestoreDB));
app.post("/logout", async (req, res) => logout(req, res));
app.get("/user", async (req, res) => getUser(req, res, firestoreDB));

const products = await getProducts(firestoreDB)
app.get('/api/products', async (req, res) => {
    res.send(products)
})

app.get('/api/cart', async (req, res) => {
    // const userId=req.params.userId;
    // const user=await getUser(firestoreDB,userId)
    // if (!user) {
    //     return res.status(404).json({ message: "User not found" });
    // }
    // const populatedCart=user.cartItems;
    const populatedCart = cartItems.map(id => products.find(product => product.id === id))
    res.send(populatedCart)
})

app.get('/api/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = products.find(product => product.id === productId);
    res.send(product)
})

app.post('/api/cart', (req, res) => {
    const productId = req.body.id;
    cartItems.push(productId);
    const populatedCart = cartItems.map(id => products.find(product => product.id === id))
    res.send(populatedCart);
})
app.delete('/api/cart/:productId', (req, res) => {
    const productId = req.params.productId;
    const index = cartItems.indexOf(productId);
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    const populatedCart = cartItems.map(id => products.find(product => product.id === id));
    res.send(populatedCart);
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})