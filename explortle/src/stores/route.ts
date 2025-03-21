import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route', () => {
  const route = ref([
    { name: 'About Us', href: '/', current: true },
    { name: 'Our Mission', href: '/whatwedo', current: false },
    { name: 'Contact Us', href: '/contact', current: false },
    { name: 'Apply', href: '/apply', current: false },
  ])
  function $reset() {
    route.value = [
      { name: 'About Us', href: '/', current: false },
      { name: 'Our Mission', href: '/whatwedo', current: false },
      { name: 'Contact Us', href: '/contact', current: false },
      { name: 'Apply', href: '/apply', current: false },
    ]
  }
  return { route, $reset }
})
