import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavStore = defineStore('counter', () => {

  const navigation = ref([
    { name: 'About Us', href: '#', current: true },
    { name: 'Contact Us', href: '/contact', current: false },
    { name: 'Placeholder', href: '#', current: false },
    { name: 'Placeholder', href: '#', current: false },
  ])
  return { navigation }
})
