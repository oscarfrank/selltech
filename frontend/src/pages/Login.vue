<template>
  <Layout>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios';
import Layout from '../components/Layout.vue';
import { useToast } from 'vue-toast-notification';

export default {
  components: {
    Layout,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async loginUser() {
      const toast = useToast();
      try {
        const { data } = await axios.post('/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', data.token);
        toast.success('Login successful');
        this.$router.push('/');
      } catch (error) {
        toast.error('Invalid email or password');
        console.error('Error logging in:', error);
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px;
}

form div {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 5px;
}

form input[type="email"],
form input[type="password"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}
</style>
