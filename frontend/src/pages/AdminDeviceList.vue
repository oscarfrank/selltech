<template>
  <div>
    <h2>All Devices</h2>
    <div v-if="devices.length === 0">No devices available.</div>
    <div v-for="device in devices" :key="device._id" class="device-card">
      <h3>{{ device.name }}</h3>
      <p>{{ device.description }}</p>
      <p>{{ device.price }}</p>
      <p>Status: {{ device.sold ? 'Sold' : 'Available' }}</p>
      <button @click="editDevice(device._id)">Edit</button>
      <button @click="confirmDelete(device._id)">Delete</button>
    </div>
    <ConfirmationDialog v-if="showDialog" @confirm="deleteDevice" @cancel="cancelDelete" />
  </div>
</template>

<script>
import axios from 'axios';
import ConfirmationDialog from '../components/ConfirmationDialog.vue';
import { useToast } from 'vue-toast-notification';

export default {
  components: {
    ConfirmationDialog,
  },
  data() {
    return {
      devices: [],
      showDialog: false,
      deviceIdToDelete: null,
    };
  },
  async created() {
    await this.fetchDevices();
  },
  methods: {
    async fetchDevices() {
      try {
        const { data } = await axios.get('/api/devices');
        this.devices = data;
      } catch (error) {
        console.error(error);
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
        console.error(error);
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
.device-card {
  margin-bottom: 20px;
}
</style>
