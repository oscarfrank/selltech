<template>
    <div class="layout">
      <Navbar />
      <button class="hamburger" @click="toggleSidebar">&#9776;</button>
      <aside class="sidebar" :class="{ visible: sidebarVisible }">
        <nav>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/used">Used Devices</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/register">Register</router-link></li>
            <li><router-link to="/admin">Admin</router-link></li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <slot></slot>
      </main>
    </div>
  </template>
  
  <script>
  import Navbar from './Navbar.vue';
  
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        sidebarVisible: false,
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
      },
    },
  };
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
  }
  
  .sidebar {
    width: 200px;
    background-color: #333;
    color: white;
    padding: 15px;
    position: fixed;
    height: 100%;
    display: none;
    z-index: 1000;
  }
  
  .sidebar.visible {
    display: block;
  }
  
  .hamburger {
    font-size: 30px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1100;
  }
  
  nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  nav li {
    margin: 15px 0;
  }
  
  .content {
    margin-left: 220px;
    padding: 20px;
    width: calc(100% - 220px);
    transition: margin-left 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .sidebar {
      display: none;
    }
    .sidebar.visible {
      display: block;
    }
    .content {
      margin-left: 0;
      width: 100%;
    }
  }
  </style>
  