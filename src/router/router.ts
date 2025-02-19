import {createRouter, createWebHistory} from "vue-router";
import ProfessionsList from "../pages/ProfessionsList.vue";
import UserPersonalAccount from "../pages/UserPersonalAccount.vue";
import ExpertPersonalAccount from "../pages/ExpertPersonalAccount.vue";
import AdminPersonalAccount from "../pages/AdminPersonalAccount.vue";
import LogIn from "../pages/LogIn.vue";
import RegistrationFirstStep from "../pages/RegistrationFirstStep.vue";
import RegistrationSecondStep from "../pages/RegistrationSecondStep.vue";

const routes = [
  { path: '/', component: ProfessionsList },
  { path: '/professions', component: ProfessionsList },
  { path: '/user', component: UserPersonalAccount },
  { path: '/expert', component: ExpertPersonalAccount },
  { path: '/admin', component: AdminPersonalAccount },
  { path: '/auth/login', component: LogIn },
  { path: '/auth/registrationFirstStep', component: RegistrationFirstStep },
  { path: '/auth/registrationSecondStep', component: RegistrationSecondStep },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;