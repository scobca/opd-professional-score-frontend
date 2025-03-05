import {createRouter, createWebHistory} from "vue-router";
import LogIn from "../pages/LogIn.vue";
import RegistrationFirstStep from "../pages/RegistrationFirstStep.vue";
import RegistrationSecondStep from "../pages/RegistrationSecondStep.vue";
import PersonalAccount from "../pages/PersonalAccount.vue";
import {UserState} from "../utils/userState/UserState.ts";
import ProfessionsList from "../components/ProfessionsList.vue";
import ProfessionPage from "../pages/ProfessionPage.vue";
import ProfessionForm from "../components/ProfessionForm.vue";

const routes = [
  { path: '/', component: ProfessionsList },
  { path: '/professions', component: ProfessionsList },
  { path: `/profession/new`, component: ProfessionForm, meta: {requiresAuth: true} },
  { path: `/profession/:id`, component: ProfessionPage, meta: {requiresAuth: true}, props: true },
  { path: '/profile', component: PersonalAccount, meta: { requiresAuth: true } },
  { path: '/auth/login', component: LogIn },
  { path: '/auth/registrationFirstStep', component: RegistrationFirstStep },
  { path: '/auth/registrationSecondStep', component: RegistrationSecondStep },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && UserState.status != "authorized") {
    next({ path: '/auth/login/'})
  } else {
    next()
  }
})

export default router;