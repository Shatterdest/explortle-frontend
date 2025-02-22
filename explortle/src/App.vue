<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <NavBar />

    <main class="flex-grow pt-16 md:pt-20">
      <RouterView />
    </main>

    <footer class="bg-gray-100 text-center py-8 px-6 rounded-t-lg shadow-md">
      <h3 class="text-xl font-heading font-semibold text-gray-700 mb-4">Support Our Mission & Stay Connected!</h3>

      <div class="flex flex-col md:flex-row justify-between items-center gap-6 max-w-2xl mx-auto">
        <div class="flex gap-6">
          <a
            href="https://www.instagram.com/explortle/"
            target="_blank"
            class="transition-transform transform hover:scale-110"
          >
            <img class="w-12 h-12 rounded-lg shadow-md hover:shadow-lg" src="../src/assets/imgs/insta.png" alt="Instagram" />
          </a>
          <a
            href="https://www.youtube.com/@ExplortleOrganization"
            target="_blank"
            class="transition-transform transform hover:scale-110"
          >
            <img class="w-12 h-12 rounded-lg shadow-md hover:shadow-lg" src="../src/assets/imgs/yt.png" alt="YouTube" />
          </a>
        </div>

        <a 
          href="https://tr.ee/-mWGU-dwX_" 
          target="_blank" 
          class="bg-purple-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Donate Now
        </a>
      </div>

      <p class="mt-6 text-sm font-body text-gray-600">
        © {{ new Date().getFullYear() }} Explortle. All rights reserved.
      </p>
    </footer>
  </div>
</template>
