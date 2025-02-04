<template>
  <form class="account-form" @submit.prevent="handleSubmit">
    <p>Create a new account</p>

    <label for="username-input">Username:</label>
    <input type="text" id="username-input" v-model="username" />

    <label for="email-input">Email address:</label>
    <input type="email" id="email-input" v-model="email" />

    <label for="password-input">Password:</label>
    <input type="password" id="password-input" v-model="password" />

    <button >Register</button>

    <RouterLink to="/login">
      <button>Log in with an existing account</button>
    </RouterLink>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterForm",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("http://localhost:8000/register", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      console.log(response);
      this.$router.push("/products");
    },
  },
};
</script>
