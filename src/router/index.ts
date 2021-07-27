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
    ]
  },
  { path: "/:catchAll(.*)", redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active"
})

export default router
