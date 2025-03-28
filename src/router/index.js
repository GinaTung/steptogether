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
import AdminLoginView from '@/views/backend/AdminLoginView.vue'
import AdminHomeView from '@/views/backend/AdminHomeView.vue'
import AdminLayoutView from '@/views/backend/AdminLayoutView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
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
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: AdminLoginView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayoutView, // 這裡用 AdminLayoutView 來包裹子路由
      meta: { requiresAuth: true }, 
      children: [
        {
          path: 'home',
          name: 'adminhome',
          component: AdminHomeView,
        },
        {
          path: 'friends',
          name: 'adminfriends',
        },
        {
          path: 'videos',
          name: 'adminvideos',
        },
        {
          path: 'learns',
          name: 'adminlearns',
        },
        {
          path: 'arts',
          name: 'adminarts',
          
        },
        {
          path: 'profile',
          name: 'adminprofile',
          component: ProfileView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFount',
      redirect: '/'
    }
  ],
})

export default router

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 假設用 localStorage 儲存登入狀態

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login'); // 若未登入則導向 login 頁面
  } else {
    next(); // 允許進入
  }
});
