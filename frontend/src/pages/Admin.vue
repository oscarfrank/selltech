<template>
  <Layout>
    <div class="admin-layout">
      <h2>Admin Dashboard</h2>
      <div class="admin-links">
        <router-link to="/admin/used" class="admin-link">Manage Used Devices</router-link>
        <router-link to="/admin/add" class="admin-link">Add New Device</router-link>
        <router-link to="/admin/edit/:id" class="admin-link">Edit Device</router-link>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '../components/Layout.vue';

export default {
  components: {
    Layout,
  },
  name: "Admin",
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.admin-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.admin-link {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  width: 200px;
}

.admin-link:hover {
  background-color: #0056b3;
}
</style>
