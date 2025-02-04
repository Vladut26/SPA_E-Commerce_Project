<template>
    <div class="nav-bar">
      <router-link to="/products" class="products-link">
        <div class="logo-wrap">
          <img :src="logo" />
        </div>
      </router-link>
      <div class="navbar-links">
        <router-link to="/login" class="myaccount-link">
          <button>My Account</button>
        </router-link>
        <router-link to="/cart" class="cart-link">
         <button>Shopping Cart</button>
        </router-link>
      </div>
     </div>
  </template>
  
  <script>
  import logo from '@/assets/logo.svg';
  
  export default {
    name: "NavBar",
    data() {
      return {
        logo,
      }
    }
  }
  </script>