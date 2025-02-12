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

    <div class="flex justify-center py-10">
      <img class="w-full max-w-3xl rounded-lg shadow-lg" src="../assets/imgs/things/us.jpg" alt="Explortle Team" />
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
