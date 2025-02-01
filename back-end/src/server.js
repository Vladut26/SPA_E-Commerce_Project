import express from 'express';
import { cartItems, products } from './temp-data.js';


const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/hello',(req,res)=>{
    res.send('Hello!')
})

app.get('/products',(req,res)=>{
    res.send(products)
})

app.get('/cart',(req,res)=>{
    const populatedCart=cartItems.map(id=>products.find(product=>product.id===id))
    res.send(populatedCart)
})

app.get('/products/:productId',(req,res)=>{
    const productId=req.params.productId;
    const product= products.find(product=>product.id===productId);
    res.send(product)
})

app.post('/cart',(req,res)=>{
    const productId=req.body.id;
    cartItems.push(productId);
    const populatedCart=cartItems.map(id=>products.find(product=>product.id===id))
    res.send(populatedCart);
})
app.delete('/cart/:productId',(req,res)=>{
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