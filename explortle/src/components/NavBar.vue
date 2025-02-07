<template>
  <nav class="relative flex items-center justify-between bg-purple-600 p-4">
    <a class="z-50" href="/"><div class="flex-shrink-0">
      <slot><img class="h-14" src="../assets/imgs/explortle.png" alt=""></slot>
    </div></a>
    <h1 class="absolute left-0 right-0 text-center text-white text-3xl font-bold">Explortle</h1>
    
    <button @click="toggleMenu" class="md:hidden text-white">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
    
    <div class="hidden md:flex space-x-6" :class="{ 'block': isOpen, 'hidden': !isOpen }">
      <router-link
        v-for="item in route"
        :key="item.name"
        :to="item.href"
        class="block text-white hover:text-blue-200 transition p-2 cursor-pointer z-50"
        @click="setCurrent(item.name)"
      >
        {{ item.name }}
      </router-link>
    </div>
    
    <div class="md:hidden" :class="{ 'block': isOpen, 'hidden': !isOpen }">
      <div class="flex flex-col space-y-2 mt-2">
        <router-link
          v-for="item in route"
          :key="item.name"
          :to="item.href"
          class="block text-white hover:text-blue-200 transition p-2 cursor-pointer"
          @click="setCurrent(item.name)"
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

<style scoped>
</style>
