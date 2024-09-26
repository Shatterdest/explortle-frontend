<template>
  <nav class="relative flex items-center justify-between bg-purple-600 p-4 rounded-lg">
    <div class="flex-shrink-0">
      <slot><img class="h-14" src="../assets/imgs/explortle.png" alt=""></slot>
      <!-- Slot for logo -->
    </div>
    <h1 class="absolute left-0 right-0 text-center text-white text-3xl font-bold">Explortle</h1>
    <div class="flex space-x-6">
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
  </nav>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/route'
import { computed } from 'vue'

const routeStore = useRouteStore()
const route = computed(() => routeStore.route)

// Function to set the current route (optional)
const setCurrent = (name: string) => {
  routeStore.$reset() // Reset all routes
  const currentRoute = routeStore.route.find((route) => route.name === name)
  if (currentRoute) {
    currentRoute.current = true // Set the clicked route as current
  }
}
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
