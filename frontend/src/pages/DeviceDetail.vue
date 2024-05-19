<template>
    <Layout>
      <div class="device-detail">
        <h2>{{ device.name }}</h2>
        <Carousel :perPage="1" :navigationEnabled="true">
          <Slide v-for="photo in device.photos" :key="photo">
            <img :src="photoUrl(photo)" alt="Device photo" class="carousel-image" />
          </Slide>
        </Carousel>
        <p><strong>Description:</strong> {{ device.description }}</p>
        <p><strong>Price:</strong> {{ device.price }}</p>
        <p><strong>Status:</strong> {{ device.sold ? 'Sold' : 'Available' }}</p>
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
        device: {},
        loading: true,
      };
    },
    async created() {
      await this.fetchDevice();
    },
    methods: {
      async fetchDevice() {
        this.loading = true;
        try {
          const { data } = await axios.get(`/api/devices/${this.$route.params.id}`);
          this.device = data;
        } catch (error) {
          console.error('Error fetching device:', error);
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
  .device-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .carousel-image {
    width: 100%;
    height: auto;
  }
  
  p {
    margin: 10px 0;
  }
  </style>
  