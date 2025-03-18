import {createApp} from 'vue'
import './assets/css/style.css'
import App from './App.vue'
import router from "./router/router.ts";
import pinia from "./store/store.config.ts";
import {io} from "socket.io-client";
import apiConf from "./api/apiConf.ts";

const socket = io(apiConf.socketEndpoint, {
  autoConnect: false,
  path: "/pwkSocket/",
  transports: ['websocket'],
})

createApp(App).use(router).use(pinia).provide('socket', socket).mount('#app')
