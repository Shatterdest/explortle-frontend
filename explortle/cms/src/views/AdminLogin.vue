<script setup>
import { ref } from 'vue'
import api from '../lib/api.js'
import { useRouter } from 'vue-router'

const user = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await api.post('/auth/login', { user: user.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Invalid user or password'
  }
}
</script>

<template>
  <div class="max-w-md mx-auto py-12">
    <h2 class="text-3xl font-bold text-center text-purple-600">Explortle CMS Login</h2>
    <form @submit.prevent="login" class="mt-8 space-y-4">
      <input v-model="user" placeholder="User" class="w-full p-3 border rounded" />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-3 border rounded" />
      <button class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full">Login</button>
      <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
    </form>
  </div>
</template>
