<template>
  <Layout>
    <div class="user-storefront">
      <h2>My Devices</h2>
      <div v-if="devices.length === 0">No devices available.</div>
      <div v-for="device in devices" :key="device._id" class="device-card">
        <h3>{{ device.name }}</h3>
        <p>{{ device.description }}</p>
        <p>{{ device.price }}</p>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios';
import Layout from '../components/Layout.vue';

export default {
  components: {
    Layout,
  },
  data() {
    return {
      devices: [],
    };
  },
  async created() {
    await this.fetchDevices();
  },
  methods: {
    async fetchDevices() {
      try {
        const { data } = await axios.get('/api/user/devices', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.devices = data;
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    },
  },
};
</script>

<style scoped>
.user-storefront {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.device-card {
  background: #f4f4f4;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
