<template>
    <Layout>
      <div class="add-device">
        <h2>Add New Device</h2>
        <form @submit.prevent="addDevice">
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
          <button type="submit">Add Device</button>
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
        device: {
          name: '',
          description: '',
          price: '',
        },
        photos: [],
      };
    },
    methods: {
      handleFileUpload(event) {
        this.photos = Array.from(event.target.files);
      },
      async addDevice() {
        const toast = useToast();
        const formData = new FormData();
        formData.append('name', this.device.name);
        formData.append('description', this.device.description);
        formData.append('price', this.device.price);
        this.photos.forEach(file => {
          formData.append('photos', file);
        });
  
        try {
          await axios.post('/api/devices', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          toast.success("Device added successfully");
          this.$router.push('/my-devices');
        } catch (error) {
          console.error('Failed to add device:', error);
          toast.error("Failed to add device");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .add-device {
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
  