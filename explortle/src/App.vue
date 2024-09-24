<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <NavBar  />
  <main class="main">
  <RouterView /></main>
</template>

<style scoped>
.main {
  background-color: #fffefc;
}
</style>
