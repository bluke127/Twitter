import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VCalendar from 'v-calendar';
import Vue3MobileDetection from 'vue3-mobile-detection';
import 'v-calendar/dist/style.css';
createApp(App)
  .use(store)
  .use(router)
  .use(Vue3MobileDetection)
  .use(VCalendar, {})
  .mount('#app');
