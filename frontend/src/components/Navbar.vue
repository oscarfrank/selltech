<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">
        <img src="https://oscarmini.com/wp-content/uploads/2021/08/logo-black@2x.png" alt="Logo" class="logo" />
      </router-link>
    </div>
    <div class="navbar-links">
      <router-link to="/">Home</router-link>
      <router-link to="/used">Used Devices</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
      <router-link v-if="isAuthenticated && isAdmin" to="/admin">Admin</router-link>
      <router-link v-if="isAuthenticated" to="/dashboard">Dashboard</router-link>
    </div>
    <div v-if="isAuthenticated" class="navbar-profile">
      <span class="username">Hello, {{ user.name }}</span>
      <div class="dropdown">
        <button class="dropbtn" @click="toggleDropdown">
          &#9776; {{ user.name }}
        </button>
        <div class="dropdown-content" v-show="dropdownVisible">
          <router-link to="/settings">Settings</router-link>
          <router-link to="/change-password">Change Password</router-link>
          <a @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from '../store';

export default {
  name: 'Navbar',
  data() {
    return {
      dropdownVisible: false,
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    isAdmin() {
      const userStore = useUserStore();
      return userStore.user?.role === 'admin';
    },
    user() {
      const userStore = useUserStore();
      return userStore.user || {};
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
  watch: {
    $route() {
      this.dropdownVisible = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #333;
  color: white;
}

.navbar-brand .logo {
  height: 40px;
}

.navbar-links {
  display: flex;
  gap: 15px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
}

.navbar-links a:hover {
  text-decoration: underline;
}

.navbar-profile {
  position: relative;
  display: flex;
  align-items: center;
}

.username {
  margin-right: 15px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-links {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .navbar-profile {
    width: 100%;
    text-align: right;
  }
}
</style>
