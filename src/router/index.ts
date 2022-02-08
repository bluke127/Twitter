import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/auth/login',
    component: () => import('@/views/Auth.vue'),
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/auth/join',
    redirect: '/auth/join',
    component: () => import('@/views/MainPage.vue'),
    children: [
      {
        path: '/auth/join',
        name: 'Join',
        component: () => import('@/views/Join.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'Main',
    redirect: '/post',
    component: () => import('@/views/MainPage.vue'),
    children: [
      {
        path: '/post',
        name: 'PostPage',
        component: () => import('@/views/PostPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
