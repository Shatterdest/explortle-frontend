<template>
  <div class="container">
    <div class="embed-wrapper">
      <iframe class="responsive-iframe"
        src="https://docs.google.com/forms/d/e/1FAIpQLSfafHDW0qFmP5fJLCF_W1R4lNSTYxM9OMSimMQ5KOprd1xzAA/viewform"
      >
        Loading…
      </iframe>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  width: 80%; /* Adjust as needed */
  max-width: 800px;
  margin: auto;
}

.embed-wrapper {
  width: 100%;
  height: 60vh; /* Adjust the height as needed */
}

.responsive-iframe {
  width: 100%;
  height: 100%;
  border: none; /* Remove default iframe border */
}
</style>
