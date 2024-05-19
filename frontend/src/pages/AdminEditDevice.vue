<template>
  <Layout>
    <div class="admin-layout">
      <h2>Edit Device</h2>
      <form @submit.prevent="updateDevice">
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="device.name" id="name" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea v-model="device.description" id="description" required></textarea>
        </div>
        <div>
          <label for="price">Price:</label>
          <input type="number" v-model="device.price" id="price" required />
        </div>
        <div>
          <label for="photos">Photos:</label>
          <input type="file" id="photos" multiple @change="handleFileUpload" />
        </div>
        <div>
          <label>
            <input type="checkbox" v-model="device.sold" />
            Mark as Sold
          </label>
        </div>
        <button type="submit">Update Device</button>
      </form>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import Layout from '../components/Layout.vue';

export default {
  components: {
    Layout,
  },
  data() {
    return {
      device: {
        name: '',
        description: '',
        price: '',
        photos: [],
        sold: false,
      },
      newPhotos: [],
    };
  },
  async created() {
    await this.fetchDevice();
  },
  methods: {
    async fetchDevice() {
      const { id } = this.$route.params;
      try {
        const { data } = await axios.get(`/api/devices/${id}`);
        this.device = data;
        console.log('Fetched device:', this.device); // Add this line for debugging
      } catch (error) {
        console.error('Error fetching device:', error);
      }
    },
    handleFileUpload(event) {
      this.newPhotos = Array.from(event.target.files);
    },
    async updateDevice() {
      const toast = useToast();
      const formData = new FormData();
      formData.append('name', this.device.name);
      formData.append('description', this.device.description);
      formData.append('price', this.device.price);
      formData.append('sold', this.device.sold);
      this.newPhotos.forEach(file => {
        formData.append('photos', file);
      });

      try {
        const { id } = this.$route.params;
        await axios.put(`/api/devices/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        toast.success("Device updated successfully");
        this.$router.push('/admin/used');
      } catch (error) {
        console.error('Error updating device:', error);
        toast.error("Failed to update device");
      }
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

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 600px;
}

form div {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 5px;
}

form input[type="text"],
form input[type="number"],
form textarea,
form input[type="file"] {
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
