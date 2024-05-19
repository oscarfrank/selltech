<template>
    <Layout>
      <div class="dashboard">
        <h2>Dashboard</h2>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/used">Used Devices</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/admin">Admin Dashboard</router-link></li>
          <li><router-link to="/admin/used">Manage Devices</router-link></li>
          <li><router-link to="/admin/add">Add Device</router-link></li>
          <li><router-link to="/settings">Settings</router-link></li>
          <li><router-link to="/change-password">Change Password</router-link></li>
          <li><router-link to="/my-devices">My Devices</router-link></li>
          <li><router-link to="/add-device">Add Device</router-link></li>
          <!-- Add more links as needed -->
        </ul>
      </div>
    </Layout>
  </template>
  
  <script>
  import Layout from '../components/Layout.vue';
  
  export default {
    components: {
      Layout,
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
  }
  
  a {
    text-decoration: none;
    color: #007BFF;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  