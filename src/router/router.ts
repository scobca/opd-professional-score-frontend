import {createRouter, createWebHistory} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import ProfessionsList from "../pages/ProfessionsList.vue";
import UserPersonalAccount from "../pages/UserPersonalAccount.vue";
import ExpertPersonalAccount from "../pages/ExpertPersonalAccount.vue";
import AdminPersonalAccount from "../pages/AdminPersonalAccount.vue";
import ConsultantPersonalAccount from "../pages/ConsultantPersonalAccount.vue";

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/professions', component: ProfessionsList },
  { path: '/user', component: UserPersonalAccount },
  { path: '/expert', component: ExpertPersonalAccount },
  { path: '/admin', component: AdminPersonalAccount },
  { path: '/consultant', component: ConsultantPersonalAccount },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;