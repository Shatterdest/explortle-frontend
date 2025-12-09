<template>
  <div class="flex flex-col items-center p-4 h-full overflow-auto text-center">
    <img class="w-full h-max object-cover rounded-lg mb-2" :src="career.image" :alt="career.name" />
    <h2 class="text-xl font-bold">{{ career.name }}</h2>
    <p class="text-base">Pay: {{ career.averagepay }}</p>
    <p class="text-sm text-gray-600 text-center mb-2">
      {{ career.description || 'No description available' }}
    </p>
    <a :href="career.url" target="_blank" class="text-blue-500 underline text-sm mt-auto">
      Click to Learn More
    </a>
  </div>
</template>

<script setup lang="ts">
import type { Career } from './GameCareers'

defineProps<{
  career: Career
}>()
</script>

<style scoped></style>