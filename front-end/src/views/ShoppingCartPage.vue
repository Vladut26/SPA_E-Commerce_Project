<template>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <ShoppingCartList @remove-from-cart="removeFromCart($event)" :products="cartItems" />
      <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-if="cartItems.length === 0">
      You current have no items in your cart!
    </div>
  </template>
  
  <script>
  import ShoppingCartList from '@/components/ShoppingCartList.vue';
  import axios from 'axios'
  
  export default {
    name: "ShoppingCartPage",
    components: {
      ShoppingCartList,
    },
    data() {
      return {
        cartItems:[],
      }
    },
    methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(`/api/cart/${productId}`);
      const updatedCart = response.data;
      this.cartItems = updatedCart;
      },
    },
    async created(){
      const response= await axios.get(`/api/cart`)
      const cartItems=response.data;
      this.cartItems=cartItems
    }
  }
  </script>