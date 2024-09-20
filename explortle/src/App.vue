<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <NavBar  />
  <main class="bg-gray-300">
  <RouterView /></main>
</template>

<style scoped>

</style>
