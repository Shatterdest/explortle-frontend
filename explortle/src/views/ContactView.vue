<template>
  <main class="contact-main">
    <div class="contact-us-form card">
      <h2 class="text-5xl">Contact Us</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name" class="text-lg">Name:</label>
          <input type="text" v-model="form.name" id="name" required />
        </div>

        <div>
          <label for="email" class="text-lg">Email:</label>
          <input type="email" v-model="form.email" id="email" required />
        </div>

        <div>
          <label for="message" class="text-lg">Message:</label>
          <textarea v-model="form.message" id="message" required></textarea>
        </div>

        <button type="submit" class="button">Submit</button>
      </form>

      <!-- Display form status message -->
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

function submitForm() {
  
}

// Reactive form state
const form = reactive({
  name: '',
  email: '',
  message: ''
});


</script>

<style scoped>
.contact-main {
  background-color: #f0f4ff; /* Light blue background */
  padding: 40px 0;
}

.contact-us-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #e0e0e0; /* Light gray border */
  border-radius: 8px; /* Rounded corners */
}

textarea {
  min-height: 150px;
}

button {
  width: 100%;
  padding: 15px;
  background-color: #5a8dc8; /* Muted light blue */
  color: white;
  border: none;
  border-radius: 5px; /* Rounded corners */
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4a7dc3; /* Darker shade on hover */
}

p.success {
  color: green;
}

p.error {
  color: red;
}

/* Reusing styles from your original code */
.text-lg {
  font-size: 1.1em; /* Slightly larger text for labels */
}

.text-5xl {
  font-size: 2.5em; /* Larger font for headings */
}

.card {
  background-color: white; /* White background for form card */
  border: 1px solid #e0e0e0; /* Light gray border */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}
</style>
