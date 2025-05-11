<script setup lang="ts">
import { ref } from 'vue'

const team = ref([
  { name: 'Audrey Kim', role: 'Co-founder', img: '' },
  { name: 'Ashley Li', role: 'Co-founder', img: '' },
  { name: 'Rita Hu', role: 'Outreach Lead', img: '' },
  { name: 'Daniel Kim', role: 'Technical Director', img: '' },
  { name: 'Sophia Nguyen', role: 'Outreach Manager', img: '' }
])
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl md:text-5xl font-heading font-bold text-center text-purple-700 mb-16">
      Meet the Team
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      <div
        v-for="member in team"
        :key="member.name"
        class="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition hover:-translate-y-1 hover:shadow-lg"
      >
        <div
          class="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-400 text-xl font-semibold"
        >
          Img
        </div>
        <h2 class="text-xl font-heading font-semibold text-gray-800">{{ member.name }}</h2>
        <p class="text-purple-600 font-medium mt-1">{{ member.role }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
