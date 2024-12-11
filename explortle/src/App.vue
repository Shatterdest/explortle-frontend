<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <NavBar> </NavBar>
  <main class="main">
    <RouterView />
  </main>
  <footer class="social-wrapper">
    Follow our socials!
    <div>
      <a href="https://www.instagram.com/explortle/" target="_blank">
        <img class='icon' src="../src/assets/imgs/insta.png" alt=""
      /></a>
    </div>
  </footer>
</template>

<style scoped>
.main {
  background-color: #ffffff;
}

.icon {
  width: 50px;
  transition: transform 0.3s, opacity 0.3s; /* Smooth hover effect */
}

.icon:hover {
  transform: scale(1.1); /* Slightly enlarge the icon */
  opacity: 0.8; /* Slightly dim the icon */
}

.social-wrapper {
  display: flex; /* Use flexbox for alignment */
  justify-content: center; /* Center-align content horizontally */
  align-items: center; /* Center-align content vertically */
  padding: 20px 0; /* Add vertical spacing */
  background-color: #e7e7e7; /* Light background to separate section visually */
  border-top: 1px solid #e0e0e0; /* Subtle border for separation */
  gap: 15px; /* Spacing between items */
  font-size: 1.2em; /* Slightly larger text */
  color: #333; /* Dark text for readability */
}

.social-wrapper a {
  text-decoration: none; /* Remove underline from links */
  color: inherit; /* Inherit color for text */
}

.social-wrapper a:hover {
  color: #5a8dc8; /* Change text color on hover */
}
</style>
