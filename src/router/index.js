import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'  // ✅ to‘g‘ri sahifa
import adminRoutes from '../admin/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  ...adminRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
