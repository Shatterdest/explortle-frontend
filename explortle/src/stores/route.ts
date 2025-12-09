import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface NavRoute {
  name: string
  href: string
  current: boolean
}

const defaultRoutes: NavRoute[] = [
  { name: 'About Us', href: '/', current: false },
  { name: 'Our Mission', href: '/whatwedo', current: false },
  { name: 'Contact Us', href: '/contact', current: false },
  { name: 'Apply', href: '/apply', current: false },
  { name: 'Career Game', href: '/game', current: false }
]

export const useRouteStore = defineStore('route', () => {
  const route = ref<NavRoute[]>(defaultRoutes.map((r) => ({ ...r, current: r.href === '/' })))

  function $reset() {
    route.value = defaultRoutes.map((r) => ({ ...r }))
  }

  return { route, $reset }
})
