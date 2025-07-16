<template>
  <div>
    <div class="text-center">
      <img class="w-[92%] h-auto rounded-lg mx-auto mt-3" :src="career.image" :alt="career.name" />
      <h2 class="text-xl font-bold mt-1">{{ career.name }}</h2>
      <p class="text-l">Type: {{ career.type }}</p>
      <p class="text-l">Pay: {{ career.averagepay }}</p>
      <p class="text-l">Work Life: ${{ career.worklife }}</p>

      <a :href="career.url" target="_blank" class="text-blue-500 underline">Click to Learn More</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ career: { type: Object, required: true } })
console.log(props.career)
</script>

<style scoped></style>
