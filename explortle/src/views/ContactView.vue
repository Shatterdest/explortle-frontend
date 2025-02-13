<template>
  <main class="bg-gray-100 flex items-center justify-center min-h-screen px-4">
    <div class="bg-white rounded-lg shadow-md p-8 max-w-lg w-full">
      <h2 class="text-4xl font-heading font-bold text-purple-600 text-center mb-6">Contact Us</h2>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block text-lg font-body text-gray-700">Name:</label>
          <input 
            type="text" 
            v-model="form.name" 
            id="name" 
            required 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
          />
        </div>

        <div>
          <label for="email" class="block text-lg font-body text-gray-700">Email:</label>
          <input 
            type="email" 
            v-model="form.email" 
            id="email" 
            required 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
          />
        </div>

        <div>
          <label for="message" class="block text-lg font-body text-gray-700">Message:</label>
          <textarea 
            v-model="form.message" 
            id="message" 
            required 
            class="w-full p-3 border border-gray-300 rounded-lg min-h-[150px] focus:ring focus:ring-purple-300"
          ></textarea>
        </div>

        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      <p v-if="statusMessage" :class="statusClass" class="text-center font-body mt-4">{{ statusMessage }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import emailjs from 'emailjs-com';

const form = reactive({
  name: '',    
  email: '',   
  message: ''  
});

const statusMessage = ref('');
const statusClass = ref('');

const sendContactForm = async () => {
  try {
    const serviceID = 'service_xx62phj'; 
    const templateID = 'template_bi2yaog'; 
    const userID = '1ZQk7x1OgqnKTTHxl'; 

    const templateParams = {
      from_name: form.name, 
      message: form.message,  
      from_email: form.email  
    };

    await emailjs.send(serviceID, templateID, templateParams, userID);
  } catch (error) {
    throw new Error('Email sending failed');
  }
};

const submitForm = async () => {
  if (form.name && form.message) {
    try {
      await sendContactForm();
      statusMessage.value = 'Your message has been sent successfully!';
      statusClass.value = 'text-green-600 font-medium';
      resetForm();  
    } catch (error) {
      statusMessage.value = 'There was an error sending your message. Please try again later.';
      statusClass.value = 'text-red-600 font-medium';
    }
  } else {
    statusMessage.value = 'Please fill in all required fields.';
    statusClass.value = 'text-red-600 font-medium';
  }
};

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.message = '';
};
</script>
