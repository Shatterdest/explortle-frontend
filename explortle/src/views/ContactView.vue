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
      <h1 :class="statusClass">{{ statusMessage }}</h1>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import emailjs from 'emailjs-com';

// Reactive form state
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
      statusClass.value = 'success';
      resetForm();  
    } catch (error) {
      statusMessage.value = 'There was an error sending your message. Please try again later.';
      statusClass.value = 'error';
    }
  } else {
    statusMessage.value = 'Please fill in all required fields.';
    statusClass.value = 'error';
  }
};

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.message = '';
};
</script>


<style scoped>
.contact-main {
  background-color: #f0f4ff; 
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
  border: 1px solid #e0e0e0; 
  border-radius: 8px; 
}

textarea {
  min-height: 150px;
}

button {
  width: 100%;
  padding: 15px;
  background-color: #5a8dc8; 
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4a7dc3; 
}

p.success {
  color: green;
}

p.error {
  color: red;
}

.text-lg {
  font-size: 1.1em; 
}

.text-5xl {
  font-size: 2.5em; 
}

.card {
  background-color: white; 
  border: 1px solid #e0e0e0; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
}
</style>
