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
  transition: transform 0.3s, opacity 0.3s;
}

.icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.social-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: #e7e7e7;
  border-top: 1px solid #e0e0e0;
  gap: 15px;
  font-size: 1.2em;
  color: #333;
}

.social-wrapper a {
  text-decoration: none;
  color: inherit;
}

.social-wrapper a:hover {
  color: #5a8dc8;
}
</style>
