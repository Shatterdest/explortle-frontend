<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';

</script>

<template>
    <header><NavBar /></header>
  <main class="bg-gray-800">
  <RouterView /></main>
</template>

<style scoped>

</style>
