<template>
    <h1>Create a new account!</h1>
    <RegisterForm />
  </template>
  
  <script>
  import RegisterForm from '@/components/RegisterForm.vue';
  
  export default {
    name: "RegisterPage",
    components: { RegisterForm },
  };
  </script>
  