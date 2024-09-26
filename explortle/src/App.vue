<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <NavBar> </NavBar>
  <main class="main">
  <RouterView /></main>
  <footer>Follow our socials!</footer>
</template>

<style scoped>
.main {
  background-color: #ffffff;
}
</style>
