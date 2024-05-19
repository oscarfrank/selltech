import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vue3-carousel/dist/carousel.css';


const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueToast);

app.mount('#app');
