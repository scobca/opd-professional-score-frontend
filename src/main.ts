import {createApp} from 'vue'
import './assets/css/style.css'
import App from './App.vue'
import router from "./router/router.ts";
import pinia from "./store/store.config.ts";

createApp(App).use(router).use(pinia).mount('#app')
