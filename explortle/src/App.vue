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
}

.social-wrapper {
  display:inline;
}
</style>
