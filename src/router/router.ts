import {createRouter, createWebHistory} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import ProfessionsList from "../pages/ProfessionsList.vue";

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/professions', component: ProfessionsList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;