<template>
  <h1>Time to log into your account!</h1>
  <LoginForm />
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  name: "LoginPage",
  components: { LoginForm },
};
</script>
