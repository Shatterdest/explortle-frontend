<template>
  <nav class="bg-purple-600 shadow-lg fixed top-0 left-0 w-full z-50 h-16 md:h-20 flex items-center">
    <div class="container mx-auto flex items-center justify-between px-4">
      <a href="/" class="flex items-center space-x-3">
        <img class="h-10 md:h-12 rounded-md" src="../assets/imgs/explortle.png" alt="Explortle Logo" />
        <span class="text-white text-xl md:text-2xl font-heading font-bold hidden sm:inline">Explortle</span>
      </a>

      <div class="hidden md:flex space-x-6">
        <router-link
          v-for="item in route"
          :key="item.name"
          :to="item.href"
          class="text-white text-lg font-body hover:text-blue-200 transition px-3 py-2"
          @click="setCurrent(item.name)"
        >
          {{ item.name }}
        </router-link>
      </div>

      <button @click="toggleMenu" class="md:hidden text-white focus:outline-none" aria-label="Toggle Menu">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>

    <div v-if="isOpen" class="md:hidden bg-purple-700 w-full absolute top-full left-0 shadow-lg">
      <div class="flex flex-col items-center space-y-2 py-4">
        <router-link
          v-for="item in route"
          :key="item.name"
          :to="item.href"
          class="block text-white text-lg font-body hover:text-blue-200 transition px-4 py-2"
          @click="setCurrent(item.name); toggleMenu()"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouteStore } from '@/stores/route'
const routeStore = useRouteStore()
const route = computed(() => routeStore.route)
const isOpen = ref(false)
const setCurrent = (name: string) => {
  routeStore.$reset()
  const currentRoute = routeStore.route.find((route) => route.name === name)
  if (currentRoute) {
    currentRoute.current = true 
  }
}
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>