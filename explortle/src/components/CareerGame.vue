<!-- <template>
  <div>
    <div class="text-center">
      <img class="w-[92%] h-auto rounded-lg mx-auto mt-3" :src="career.image" :alt="career.name" />
      <h2 class="text-xl font-bold mt-1">{{ career.name }}</h2>
      <p class="text-l">Type: {{ career.type }}</p>
      <p class="text-l">Pay: {{ career.averagepay }}</p>

      <a :href="career.url" target="_blank" class="text-blue-500 underline">Click to Learn More</a>
    </div>
  </div>
</template> -->

<!-- newer one <template>
  <div class="flex flex-col items-center p-2">
    <img class="w-[95%] h-auto rounded-lg" :src="career.image" :alt="career.name" />
    <h2 class="text-lg font-bold mt-2">{{ career.name }}</h2>
    <p class="text-sm">Pay: {{ career.averagepay }}</p>
    <a :href="career.url" target="_blank" class="text-blue-500 underline text-sm mt-1">
      Click to Learn More
    </a>
  </div>
</template> -->

<template>
  <div class="flex flex-col items-center p-4 h-full overflow-auto">
    <img class="w-full h-32 object-cover rounded-lg mb-2" :src="career.image" :alt="career.name" />
    <h2 class="text-lg font-bold">{{ career.name }}</h2>
    <p class="text-sm my-1">Pay: {{ career.averagepay }}</p>
    <p class="text-xs text-gray-600 text-center mb-2">
      {{ career.description || 'No description available' }}
    </p>
    <a :href="career.url" target="_blank" class="text-blue-500 underline text-sm mt-auto">
      Click to Learn More
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ career: { type: Object, required: true } })
</script>

<style scoped></style>
