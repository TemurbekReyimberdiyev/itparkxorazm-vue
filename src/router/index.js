import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'  // ✅ to‘g‘ri sahifa
import adminRoutes from '../admin/index.js'
import { useAuthStore } from '@/admin/stores/auth'
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

// 💡 Auth guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  const isAdminPath = to.path.startsWith('/admin') && to.path !== '/admin/login'
  const isLoginPage = to.path === '/admin/login'

  if (isAdminPath && !auth.isAuthenticated) {
    next({ name: 'AdminLogin' })
  } else if (isLoginPage && auth.isAuthenticated) {
    next({ name: 'AdminDashboard' })
  } else {
    next()
  }
})

export default router
