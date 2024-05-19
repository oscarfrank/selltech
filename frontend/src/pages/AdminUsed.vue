<template>
  <Layout>
    <div class="admin-layout">
      <h2>Manage Used Devices</h2>
      <div v-if="devices.length === 0">No devices available.</div>
      <div v-for="device in devices" :key="device._id" class="device-card">
        <h3>{{ device.name }}</h3>
        <p>{{ device.description }}</p>
        <p>{{ device.price }}</p>
        <p>Status: {{ device.sold ? 'Sold' : 'Available' }}</p>
        <button @click="editDevice(device._id)">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button @click="confirmDelete(device._id)">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </div>
      <ConfirmationDialog v-if="showDialog" @confirm="deleteDevice" @cancel="cancelDelete" />
    </div>
  </Layout>
</template>

<script>
import axios from 'axios';
import ConfirmationDialog from '../components/ConfirmationDialog.vue';
import { useToast } from 'vue-toast-notification';
import Layout from '../components/Layout.vue';

export default {
  components: {
    ConfirmationDialog,
    Layout,
  },
  data() {
    return {
      devices: [],
      showDialog: false,
      deviceIdToDelete: null,
    };
  },
  async created() {
    console.log('AdminUsed component created. Fetching devices...');
    await this.fetchDevices();
  },
  methods: {
    async fetchDevices() {
      console.log('Fetching devices in AdminUsed...');
      try {
        const { data } = await axios.get('/api/devices');
        console.log('Fetched devices:', data);
        this.devices = data.devices;
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    },
    editDevice(id) {
      this.$router.push(`/admin/edit/${id}`);
    },
    confirmDelete(id) {
      this.deviceIdToDelete = id;
      this.showDialog = true;
    },
    async deleteDevice() {
      const toast = useToast();
      try {
        await axios.delete(`/api/devices/${this.deviceIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.showDialog = false;
        this.deviceIdToDelete = null;
        await this.fetchDevices();
        toast.success("Device deleted successfully");
      } catch (error) {
        console.error('Error deleting device:', error);
        toast.error("Failed to delete device");
      }
    },
    cancelDelete() {
      this.showDialog = false;
      this.deviceIdToDelete = null;
    },
  },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.device-card {
  background: #f4f4f4;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.device-card button {
  margin-right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 16px;
}

.device-card button:hover {
  color: #007BFF;
}

.device-card i {
  margin-right: 5px;
}
</style>
