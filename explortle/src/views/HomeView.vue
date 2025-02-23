<script setup lang="ts">
import QuizPage from '@/components/quiz/QuizPage.vue'
import { useRouteStore } from '@/stores/route'
import { onMounted, ref } from 'vue'

onMounted(() => {
  const route = useRouteStore()
  route.$reset()
  route.route[0].current = true
})

const members = ref([
  { id: 1, name: 'Placeholder' },
  { id: 2, name: 'Placeholder' },
  { id: 3, name: 'Placeholder' }
])
</script>

<template>
  <main class="bg-white text-gray-800 font-body">
    <section class="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="bg-gray-100 rounded-lg shadow-md p-8">
        <h2 class="text-4xl font-heading font-bold text-purple-600 mb-4">About Us</h2>
        <p class="text-lg leading-relaxed">
          Explortle is a student-led initiative that brings experienced technical career
          professionals to conduct hands-on workshops in schools across New York City.
        </p>
        <p class="mt-4 text-lg leading-relaxed">
          Our mission is to bridge the gap between students and career professionals
          from diverse industries by offering immersive learning experiences.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <QuizPage />
      </div>
    </section>

<<<<<<< Updated upstream
    <div class="flex justify-center py-10">
      <img class="w-full max-w-3xl rounded-lg shadow-lg" src="../assets/imgs/things/us.jpg" alt="Explortle Team" />
=======
    <div 
      class="relative w-full max-w-3xl mx-auto rounded-lg shadow-lg border-4 border-gray-300 overflow-hidden aspect-square group"
      @mouseover="stopAutoSlide"
      @mouseleave="startAutoSlide"
    >
      <div class="relative w-full h-full">
        <transition :name="slidingDirection === 'next' ? 'slide-next' : 'slide-prev'">
          <img
            v-if="images.length"
            :key="currentSlide"
            :src="images[currentSlide]"
            alt="Explortle Event"
            class="absolute w-full h-full object-cover"
          />
        </transition>
      </div>

      <button 
        @click="prevSlide" 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 shadow-md hover:bg-gray-700 transition opacity-0 group-hover:opacity-100"
      >
        ◀
      </button>

      <button 
        @click="nextSlide" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 shadow-md hover:bg-gray-700 transition opacity-0 group-hover:opacity-100"
      >
        ▶
      </button>
>>>>>>> Stashed changes
    </div>

    <section class="py-16 px-6">
      <h2 class="text-4xl font-heading font-bold text-purple-600 text-center fade-in">Associates</h2>

      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div class="bg-white shadow-md rounded-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
          <a target="_blank" href="https://www.acementor.org" class="block p-6 text-center">
            <img class="mx-auto mb-4 max-h-24 rounded-md" src="../assets/imgs/ace.png" alt="ACE Mentor">
            <h3 class="text-2xl font-heading font-semibold text-gray-700">Architecture Construction Engineering Mentorship</h3>
          </a>
        </div>

        <div class="bg-white shadow-md rounded-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
          <a target="_blank" href="https://aiasiny.org" class="block p-6 text-center">
            <img class="mx-auto mb-4 max-h-24 rounded-md" src="../assets/imgs/aia.png" alt="AIA Staten Island">
            <h3 class="text-2xl font-heading font-semibold text-gray-700">American Institute of Architects Staten Island NY</h3>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 1s ease-in-out forwards;
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
