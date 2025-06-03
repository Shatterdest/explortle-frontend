import { createRouter, createWebHistory } from 'vue-router'
import ContactView from '@/views/ContactView.vue'
import HomeView from '@/views/HomeView.vue'
import AccomplishmentsView from '@/views/AccomplishmentsView.vue'
import ApplyView from '@/views/ApplyView.vue'

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
    },
    { path: '/apply', name: 'apply', component: ApplyView }, 
    {
      path: '/event/:slug',
      name: 'EventDetail',
      component: () => import('@/views/EventDetailView.vue')
    }, 
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ], 
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    return { top: 0 };
  },
})

export default router
