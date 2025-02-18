import {createRouter, createWebHistory} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import ProfessionsList from "../pages/ProfessionsList.vue";
import UserPersonalAccount from "../pages/UserPersonalAccount.vue";

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/professions', component: ProfessionsList },
  { path: '/user', component: UserPersonalAccount },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;