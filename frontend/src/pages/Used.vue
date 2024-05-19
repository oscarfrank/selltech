<template>
  <Layout>
    <div class="user-layout">
      <h2>My Devices for Sale</h2>
      <div class="controls">
        <input type="text" v-model="search" @input="fetchDevices" placeholder="Search devices..." />
        <select v-model="sortBy" @change="fetchDevices">
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Date Added</option>
        </select>
        <select v-model="order" @change="fetchDevices">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <input type="number" v-model="minPrice" @input="fetchDevices" placeholder="Min Price" />
        <input type="number" v-model="maxPrice" @input="fetchDevices" placeholder="Max Price" />
      </div>
      <div v-if="loading">Loading devices...</div>
      <div v-if="!loading && devices.length === 0">No devices available.</div>
      <div v-if="!loading && devices.length > 0">
        <div v-for="device in devices" :key="device._id" class="device-card">
          <router-link :to="`/devices/${device._id}`">
            <h3>{{ device.name }}</h3>
            <p>{{ device.description }}</p>
            <p>{{ device.price }}</p>
          </router-link>
        </div>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
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
      currentPage: 1,
      totalPages: 1,
      limit: 10,
      sortBy: 'createdAt',
      order: 'desc',
      search: '',
      minPrice: null,
      maxPrice: null,
      loading: true,
    };
  },
  async created() {
    console.log('Component created. Fetching devices...');
    await this.fetchDevices();
  },
  methods: {
    async fetchDevices() {
      this.loading = true;
      console.log('Fetching devices...');
      try {
        const { data } = await axios.get('/api/devices', {
          params: {
            page: this.currentPage,
            limit: this.limit,
            sortBy: this.sortBy,
            order: this.order,
            search: this.search,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice,
          },
        });
        console.log('Fetched devices:', data);
        this.devices = data.devices || [];
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
      } catch (error) {
        console.error('Error fetching devices:', error);
        this.devices = [];
      } finally {
        this.loading = false;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchDevices();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchDevices();
      }
    },
  },
};
</script>

<style scoped>
.user-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.device-card {
  background: #f4f4f4;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
  max-width: 600px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 10px;
}
</style>
