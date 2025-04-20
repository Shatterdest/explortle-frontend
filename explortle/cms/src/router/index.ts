import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  { path: '/', name: 'login', component: AdminLogin },
  { path: '/dashboard', name: 'dashboard', component: AdminDashboard, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) return next('/')
  next()
})

export default router
