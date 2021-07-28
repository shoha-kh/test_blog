import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Wrapper',
    redirect: { name: 'Home' },
    component: () => import('../views/Wrapper.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/post/:id',
        name: 'Post',
        component: () => import('../views/Post.vue'),
      },
      {
        path: '/user/:id',
        name: 'UserPosts',
        component: () => import('../views/UserPosts.vue'),
      },
    ]
  },
  {
    path: "/404",
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
  { path: "/:catchAll(.*)", redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active"
})

export default router
