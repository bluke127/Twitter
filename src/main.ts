import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vue3MobileDetection from 'vue3-mobile-detection';
createApp(App).use(store).use(router).use(Vue3MobileDetection).mount('#app');
