<template>
  <Layout>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" v-model="firstName" required />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="lastName" required />
        </div>
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
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
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    };
  },
  methods: {
    async registerUser() {
      const toast = useToast();
      try {
        const { data } = await axios.post('/api/auth/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('token', data.token);
        toast.success('Registration successful');
        this.$router.push('/');
      } catch (error) {
        toast.error('Registration failed');
        console.error('Error registering:', error);
      }
    },
  },
};
</script>

<style scoped>
.register {
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

form input[type="text"],
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
