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
      {
        path: '/auth/join',
        name: 'Join',
        component: () => import('@/views/Join.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
