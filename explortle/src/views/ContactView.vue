<template>
  <div class="contact-us-form">
    <h2>Contact Us</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="form.name" id="name" required />
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="form.email" id="email" required />
      </div>

      <div>
        <label for="message">Message:</label>
        <textarea v-model="form.message" id="message" required></textarea>
      </div>

      <button type="submit">Submit</button>
    </form>

    <p v-if="statusMessage" :class="statusClass">{{ statusMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const statusMessage = ref('')
const statusClass = ref('')

const sendContactForm = async (formData: any) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('success'), 1000)
  })
}

const submitForm = async () => {
  if (form.name && form.email && form.message) {
    try {
      await sendContactForm(form)
      statusMessage.value = 'Your message has been sent successfully!'
      statusClass.value = 'success'
      resetForm() 
    } catch (error) {
      statusMessage.value = 'There was an error sending your message. Please try again later.'
      statusClass.value = 'error'
    }
  } else {
    statusMessage.value = 'Please fill in all fields.'
    statusClass.value = 'error'
  }
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<style scoped>
.contact-us-form {
  max-width: 500px;
  margin: 0 auto;
}

.contact-us-form div {
  margin-bottom: 10px;
}

.contact-us-form input,
.contact-us-form textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
