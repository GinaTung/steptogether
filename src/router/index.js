import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/frontend/HomeView.vue';
import LoginView from '@/views/frontend/LoginView.vue'
import SignUpView from '@/views/frontend/SignUpView.vue'
import MainLayoutViewVue from '@/views/frontend/MainLayoutView.vue';
import FriendsView from '@/views/frontend/FriendsView.vue'
import VideosView from '@/views/frontend/VideosView.vue';
import LearnsView from '@/views/frontend/LearnsView.vue';
import ArtsView from '@/views/frontend/ArtsView.vue';
import ProfileView from '@/views/frontend/ProfileView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayoutViewVue,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'friends',
          name: 'friends',
          component: FriendsView,
        },
        {
          path: 'videos',
          name: 'videos',
          component: VideosView,
        },
        {
          path: 'learns',
          name: 'learns',
          component: LearnsView,
        },
        {
          path: 'arts',
          name: 'arts',
          component: ArtsView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
      ],
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
