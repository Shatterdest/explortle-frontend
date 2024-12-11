import { createRouter, createWebHistory } from 'vue-router'
import ContactView from '@/views/ContactView.vue'
import HomeView from '@/views/HomeView.vue'
import AccomplishmentsView from '@/views/AccomplishmentsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contact',
      name: 'contact', 
      component: ContactView
    }, 
    {
      path: '/whatwedo',
      name: 'whatwedo',
      component: AccomplishmentsView
    }
  ]
})

export default router
