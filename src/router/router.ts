import {createRouter, createWebHistory} from "vue-router";
import ProfessionsList from "../components/ProfessionsList.vue";
import UserPersonalAccount from "../pages/archive/UserPersonalAccount.vue";
import ExpertPersonalAccount from "../pages/archive/ExpertPersonalAccount.vue";
import AdminPersonalAccount from "../pages/archive/AdminPersonalAccount.vue";
import ConsultantPersonalAccount from "../pages/archive/ConsultantPersonalAccount.vue";
import LogIn from "../pages/LogIn.vue";
import RegistrationFirstStep from "../pages/RegistrationFirstStep.vue";
import RegistrationSecondStep from "../pages/RegistrationSecondStep.vue";
import PersonalAccountPage from "../pages/PersonalAccountPage.vue";

const routes = [
  { path: '/', component: ProfessionsList },
  { path: '/professions', component: ProfessionsList },
  { path: '/user', component: UserPersonalAccount },
  { path: '/expert', component: ExpertPersonalAccount },
  { path: '/admin', component: AdminPersonalAccount },
  { path: '/consultant', component: ConsultantPersonalAccount },
  { path: '/profile', component: PersonalAccountPage },
  { path: '/auth/login', component: LogIn },
  { path: '/auth/registrationFirstStep', component: RegistrationFirstStep },
  { path: '/auth/registrationSecondStep', component: RegistrationSecondStep },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;