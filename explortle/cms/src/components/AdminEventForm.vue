<script setup>
import { ref, watch } from 'vue'
import api from '../lib/api.js'

const props = defineProps({ event: Object })
const emit = defineEmits(['saved'])

const form = ref({
  title: '',
  slug: '',
  date: '',
  description: '',
  location: '',
  imageUrls: '',
  speakers: ''
})

const imageFiles = ref([])
const isUploading = ref(false)

watch(
  () => props.event,
  () => {
    if (props.event) {
      form.value = { ...props.event }
    } else {
      form.value = {
        title: '',
        slug: '',
        date: '',
        description: '',
        location: '',
        imageUrls: '',
        speakers: ''
      }
    }
  },
  { immediate: true }
)

const uploadImages = async () => {
  if (imageFiles.value.length === 0) return []

  isUploading.value = true
  const { data: sigData } = await api.get('/cloudinary/signature')

  const uploadedUrls = []

  for (const file of imageFiles.value) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', sigData.apiKey)
    formData.append('timestamp', sigData.timestamp)
    formData.append('signature', sigData.signature)
    formData.append('folder', 'explortle')

    const res = await fetch(`https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    })

    const result = await res.json()
    uploadedUrls.push(result.secure_url)
  }

  isUploading.value = false
  return uploadedUrls
}

const submit = async () => {
  const uploadedUrls = await uploadImages()
  const payload = {
    ...form.value,
    imageUrls: [
      ...form.value.imageUrls
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      ...uploadedUrls
    ],
    speakers: form.value.speakers.split(',').map((s) => s.trim())
  }

  if (props.event) {
    await api.put(`/events/${props.event._id}`, payload)
  } else {
    await api.post('/events', payload)
  }

  emit('saved')
}
const handleFileChange = (e) => {
  const files = Array.from(e.target.files)
  imageFiles.value = files
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4 bg-white p-6 border rounded shadow-md mb-6">
    <input v-model="form.title" placeholder="Title" class="w-full p-2 border rounded" />
    <input v-model="form.slug" placeholder="Slug (for URL)" class="w-full p-2 border rounded" />
    <input v-model="form.date" type="date" class="w-full p-2 border rounded" />
    <input
      v-model="form.location"
      placeholder="Location"
      class="w-full p-2 border rounded"
    />
    <textarea
      v-model="form.description"
      placeholder="Description"
      class="w-full p-2 border rounded"
    ></textarea>
    <input
      v-model="form.imageUrls"
      placeholder="Image URLs (comma separated)"
      class="w-full p-2 border rounded"
    />
    <input
      v-model="form.speakers"
      placeholder="Speakers (comma separated)"
      class="w-full p-2 border rounded"
    />

    <div>
      <label class="block mb-1 font-medium">Upload New Images</label>
      <input type="file" multiple @change="handleFileChange" />
    </div>

    <button
      type="submit"
      class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      :disabled="isUploading"
    >
      {{ isUploading ? 'Uploading...' : props.event ? 'Update' : 'Create' }}
    </button>
  </form>
</template>
