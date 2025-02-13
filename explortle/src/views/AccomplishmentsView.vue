<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <h2 class="text-4xl md:text-5xl font-heading font-bold text-purple-600 fade-in text-center">
      Explortle Impact: Bridging Careers and Curiosity
    </h2>

    <p class="mt-6 text-lg font-body text-gray-700 leading-relaxed text-center">
      Since our founding, Explortle has made significant strides in connecting students with
      professional insights across diverse industries. We've successfully engaged approximately
      <span class="font-semibold text-blue-600">500 students</span> through our innovative workshop
      series, bringing real-world career experiences directly into educational settings.
    </p>

    <p class="mt-4 text-lg font-body text-gray-700 leading-relaxed text-center">
      Our roster of <span class="font-semibold text-blue-600">six distinguished speakers</span> from
      various professional backgrounds provides immersive learning experiences beyond traditional
      classroom instruction. Covering fields from 
      <span class="font-bold text-gray-900">emerging STEM fields</span> to 
      <span class="font-bold text-gray-900">fast-paced finance industries</span>, 
      we offer students meaningful exposure to professional landscapes.
    </p>

    <p class="mt-4 text-lg font-body text-gray-700 leading-relaxed text-center">
      Our mission is to <span class="font-bold text-gray-900">inspire curiosity</span> through hands-on, 
      interactive workshops. By prioritizing students from underrepresented backgrounds, we aim to 
      <span class="font-bold text-gray-900">expand access to opportunities</span> and ensure every student 
      has access to transformative learning.
    </p>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img
        class="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition"
        src="../assets/imgs/things/accomplishment/1.jpg"
        alt="Explortle Workshop"
      />
      <img
        class="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition"
        src="../assets/imgs/things/accomplishment/2.jpg"
        alt="Explortle Student Engagement"
      />
    </div>
  </div>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 1s ease-in-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
