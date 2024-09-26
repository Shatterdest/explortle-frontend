<script setup lang="ts">
import { useRouteStore } from '@/stores/route'
import { onMounted, ref } from 'vue'

onMounted(() => {
  const route = useRouteStore()
  route.$reset()
  route.route[0].current = true
})

const members = ref([
  {
    id: 1,
    name: 'Placeholder'
  },
  { id: 2, name: 'Placeholder' },
  { id: 3, name: 'Placeholder' }
])
</script>

<template>
  <main>
    <div class="about">
      <h2 class="text-5xl">About Us</h2>
      <h3 class="text-lg">
        Explortle is a student-led initiative that aims to bring experienced technical career
        professionals to conduct hands-on workshops in schools across New York City. Through these
        workshops, our goal is to bridge the gap between students and career professionals from
        diverse industries. These hands-on workshops cover a broad range of topics, from STEM, to
        finance, and beyond. Our mission is to provide underrepresented students with interactive,
        real-world learning experiences that inspire curiosity and foster a passion for exploring
        different career paths. We prioritize bringing in engaging speakers, immersive workshops,
        and lessons that make students excited to explore different fields.
      </h3>
    </div>
    <h2 class="text-5xl">Associates</h2>
    <ul class="container">
      <li class="card">
        <a target="_blank" href="https://www.acementor.org">
          <img src="../assets/imgs/ace.png" alt="" />
          <h3 class="text-3xl">Architecture Construction Engineering Mentorship</h3></a
        >
      </li>
      <li class="card">
        <a target="_blank" href="https://aiasiny.org">
        <img src="../assets/imgs/aia.png" alt="" />
        <h3 class="text-3xl">American Institute of Architects Staten Island New York</h3></a
        >
      </li>
    </ul>
    <h2 class="text-5xl">Meet The Team</h2>
    <div class="text-lg" v-for="member in members" :key="member.id">
      #{{ member.id }}:
      {{ member.name }}
    </div>
  </main>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f4ff; /* Very light blue for the overall background */
  margin: 0;
  padding: 0;
  color: #333; /* Dark text for readability */
}

main {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

h1 {
  color: #7a6dca; /* Muted light purple */
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  color: #5a8dc8; /* Muted light blue */
  font-weight: bolder;
  margin-top: 40px;
}

h3 {
  color: #333;
  margin: 10px 0;
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Allows wrapping of cards on smaller screens */
  margin: 20px 0;
}

.card {
  background-color: white; /* White background for cards */
  border: 1px solid #e0e0e0; /* Light gray border */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  margin: 10px;
  padding: 20px;
  flex: 1 1 calc(30% - 40px); /* Responsive card layout */
  max-width: calc(30% - 40px);
  transition: transform 0.3s; /* Smooth scaling effect */
}

.card:hover {
  transform: scale(1.05); /* Slightly scale up on hover */
}

.card img {
  max-width: 100%;
  border-radius: 8px; /* Match card corners */
}

.text-lg {
  font-size: 1.1em; /* Slightly larger text for team members */
  margin: 5px 0;
}

.text-5xl {
  font-size: 2.5em; /* Larger font for subheadings */
}

.text-7xl {
  font-size: 3.5em; /* Largest font for main heading */
}

/* Navbar Styles */
.navbar {
  background-color: #7a6dca; /* Muted light purple */
  padding: 10px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px; /* Slight rounding */
}

/* Button Styles */
.button {
  background-color: #5a8dc8; /* Muted light blue */
  color: white;
  border: none;
  border-radius: 5px; /* Rounded corners */
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #4a7dc3; /* Darker shade on hover */
}
</style>
