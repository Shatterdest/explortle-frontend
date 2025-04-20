<script setup>
import { ref, onMounted } from 'vue'
import AdminEventForm from '../components/AdminEventForm.vue'
import api from "../lib/api.js"
import { useRouter } from 'vue-router'

const router = useRouter()
const events = ref([])
const selected = ref(null)
const isCreating = ref(false)

const fetchEvents = async () => {
  const res = await api.get('/events')
  events.value = res.data
}

const deleteEvent = async (id) => {
  if (confirm('Are you sure?')) {
    await api.delete(`/events/${id}`)
    await fetchEvents()
  }
}

const onSaved = async () => {
  selected.value = null
  isCreating.value = false
  await fetchEvents()
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}

onMounted(fetchEvents)
</script>

<template>
  <div class="max-w-5xl mx-auto py-10 px-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-heading font-bold text-purple-600">Admin Dashboard</h1>
      <button
        @click="logout"
        class="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
    <button
      @click="isCreating = true"
      class="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      ➕ New Event
    </button>

    <div v-if="isCreating || selected">
      <AdminEventForm :event="selected" @saved="onSaved" />
    </div>

    <table class="w-full text-left border mt-4">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2">Title</th>
          <th class="p-2">Date</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event._id" class="border-t">
          <td class="p-2">{{ event.title }}</td>
          <td class="p-2">{{ new Date(event.date).toLocaleDateString() }}</td>
          <td class="p-2 space-x-2">
            <button @click="selected = event" class="text-blue-600 hover:underline">Edit</button>
            <button @click="deleteEvent(event._id)" class="text-red-600 hover:underline">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
