<template>
    <form @submit.prevent="handleSubmit" class="account-form">
        <p>Log in or create an account with your email address</p>

        <label for="email-input">Email address:</label>
        <input type="email" name="email" id="email-input" v-model="email" />

        <label for="password-input">Password:</label>
        <input type="password" name="password" id="password-input" v-model="password" />

        <button>Log in</button>

        <RouterLink to="/register">
            <button>Create a new account</button>
        </RouterLink>
    </form>
</template>

<script>
import axios from "axios";
export default {
    name: "LoginForm",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async handleSubmit() {
            const response = await axios.post("http://localhost:8000/login", {
                email: this.email,
                password: this.password,
            });
            console.log(response.data.jwt);
            this.$router.push("/products");
        },
    },
};
</script>
