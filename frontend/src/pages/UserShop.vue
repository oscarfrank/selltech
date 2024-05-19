<template>
  <Layout>
    <div class="user-shop">
      <h2>{{ username }}'s Shop</h2>
      <div v-if="loading">Loading devices...</div>
      <div v-if="!loading && devices.length === 0">No devices available.</div>
      <div v-if="!loading && devices.length > 0">
        <div v-for="device in devices" :key="device._id" class="device-card">
          <h3>{{ device.name }}</h3>
          <p>{{ device.description }}</p>
          <p>{{ device.price }}</p>
          <Carousel :perPage="1" :navigationEnabled="true">
            <Slide v-for="photo in device.photos" :key="photo">
              <img :src="photoUrl(photo)" alt="Device photo" class="carousel-image" />
            </Slide>
          </Carousel>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import Layout from '../components/Layout.vue';

export default {
  components: {
    Layout,
    Carousel,
    Slide,
  },
  data() {
    return {
      username: this.$route.params.username,
      devices: [],
      loading: true,
    };
  },
  async created() {
    await this.fetchDevices();
  },
  methods: {
    async fetchDevices() {
      this.loading = true;
      try {
        const { data } = await axios.get(`/api/shop/${this.username}`);
        this.devices = data;
      } catch (error) {
        console.error('Error fetching devices:', error);
        this.devices = [];
      } finally {
        this.loading = false;
      }
    },
    photoUrl(photo) {
      return `/uploads/${photo.split('/').pop()}`;
    },
  },
};
</script>

<style scoped>
.user-shop {
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
  width: 100%;
  max-width: 600px;
}

.carousel-image {
  width: 100%;
  height: auto;
}
</style>
