import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/frontend/HomeView.vue';
import LoginView from '@/views/frontend/LoginView.vue'
import SignUpView from '@/views/frontend/SignUpView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpView,
    },
  ],
})

export default router
