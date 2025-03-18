<script setup lang="ts">
import QuizPage from '@/components/quiz/QuizPage.vue'
import { useRouteStore } from '@/stores/route'
import { onMounted, ref } from 'vue'

onMounted(() => {
  const route = useRouteStore()
  route.$reset()
  route.route[0].current = true
})

const imageFiles = import.meta.glob('@/assets/imgs/slides/*.png', { eager: true })

const images = ref(
  Object.entries(imageFiles)
    .map(([path, img]) => {
      const match = path.match(/(\d+)\.png$/);
      const number = match ? parseInt(match[1], 10) : 0;
      return {
        path,
        src: (img as any).default,
        number,
      };
    })
    .sort((a, b) => a.number - b.number)
    .map((img) => img.src)
);

const currentSlide = ref(0)
const slidingDirection = ref<'next' | 'prev'>('next')

let slideInterval: ReturnType<typeof setInterval> | null = null

const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    nextSlide()
  }, 3000)
}

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
}

const nextSlide = () => {
  slidingDirection.value = 'next'
  currentSlide.value = (currentSlide.value + 1) % images.value.length
}

const prevSlide = () => {
  slidingDirection.value = 'prev'
  currentSlide.value = (currentSlide.value - 1 + images.value.length) % images.value.length
}

onMounted(() => {
  startAutoSlide()
})
</script>

<template>
  <main class="bg-white text-gray-800 font-body">
    <section class="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col justify-between">
        <div>
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

        <div class="mt-6">
          <img 
            src="@/assets/imgs/graphics/wide.png" 
            alt="Explortle Graphic" 
            class="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div class="mt-6 flex justify-center">
          <a 
            href="/whatwedo"
            class="inline-block bg-purple-600 text-white font-medium text-lg px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:-translate-y-1"
          >
            Discover What We Do →
          </a>
        </div>
      </div>

      <div 
        class="relative w-full rounded-lg shadow-lg border-4 border-gray-300 overflow-hidden aspect-square group"
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
      </div>
    </section>

    <section class="py-16 px-6">
      <h2 class="text-4xl font-heading font-bold text-purple-600 text-center fade-in">Associates</h2>

      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div class="bg-white shadow-md rounded-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
          <a target="_blank" href="https://www.acementor.org" class="block p-6 text-center">
            <img class="mx-auto mb-4 max-h-24 rounded-md" src="@/assets/imgs/ace.png" alt="ACE Mentor">
            <h3 class="text-2xl font-heading font-semibold text-gray-700">Architecture Construction Engineering Mentorship</h3>
          </a>
        </div>

        <div class="bg-white shadow-md rounded-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
          <a target="_blank" href="https://aiasiny.org" class="block p-6 text-center">
            <img class="mx-auto mb-4 max-h-24 rounded-md" src="@/assets/imgs/aia.png" alt="AIA Staten Island">
            <h3 class="text-2xl font-heading font-semibold text-gray-700">American Institute of Architects Staten Island NY</h3>
          </a>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-6 py-12">
      <div class="bg-gray-100 rounded-lg shadow-md p-8 w-full">
        <QuizPage />
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

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.7s ease-in-out;
}

.slide-next-enter-from {
  transform: translateX(100%);
}

.slide-next-leave-to {
  transform: translateX(-100%);
}

.slide-prev-enter-from {
  transform: translateX(-100%);
}

.slide-prev-leave-to {
  transform: translateX(100%);
}

.group:hover .opacity-0 {
  transition: opacity 0.3s ease-in-out;
}
</style>
