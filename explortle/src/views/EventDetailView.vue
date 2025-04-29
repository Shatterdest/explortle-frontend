<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/lib/api'

const route = useRoute()
const event = ref(null)

onMounted(async () => {
  const res = await api.get(`/events/slug/${route.params.slug}`)
  event.value = res.data
})
</script>

<template>
  <div v-if="event" class="max-w-4xl mx-auto py-12 px-4">
    <router-link
      :to="{ path: '/', hash: '#timeline' }"
      class="inline-block mb-6 text-purple-600 hover:text-purple-800 font-semibold transition"
    >
      ← Back to Timeline
    </router-link>
    <p class="text-gray-400 text-sm">{{ new Date(event.date).toDateString() }}</p>
    <h1 class="text-4xl font-heading font-bold text-purple-600 mb-4">{{ event.title }}</h1>
    <p class="text-lg text-gray-700 mb-4">{{ event.description }}</p>

    <p class="text-md text-gray-600 mb-2"><strong>Location:</strong> {{ event.location }}</p>
    <p
      v-show="event.speakers && event.speakers.join(', ') != ''"
      class="text-md text-gray-600 mb-4"
    >
      <strong>Speakers:</strong> {{ event.speakers.join(', ') }}
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      <img
        v-for="(img, i) in event.imageUrls"
        :key="i"
        :src="img"
        alt="Event image"
        class="rounded-lg shadow-md object-cover w-full"
      />
    </div>
  </div>

  <div v-else class="text-center py-20 text-gray-500 text-lg">Loading event...</div>
</template>
