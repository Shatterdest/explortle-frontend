<script setup lang="ts">
import QuizPage from '@/components/quiz/QuizPage.vue'
import TimeLine from '@/components/TimeLine.vue'
import MeetTeam from '@/components/MeetTeam.vue'
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
      const match = path.match(/(\d+)\.png$/)
      const number = match ? parseInt(match[1], 10) : 0
      return {
        path,
        src: (img as any).default,
        number
      }
    })
    .sort((a, b) => a.number - b.number)
    .map((img) => img.src)
)

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
const accomplishments = [
  {
    name: 'Google',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547804/google-logo-transparent-background-free-png_crewre.png',
    link: 'https://www.google.com'
  },
  {
    name: 'New York University',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547672/Nyu-Logo-PNG-File_paatss.png',
    link: 'https://www.nyu.edu'
  },
  {
    name: 'Architecture Construction Engineering Mentorship',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547491/ace_kuq1ug.png',
    link: 'https://www.acementor.org'
  },
  {
    name: 'STEM Kids NYC',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1750454719/IMG_7710-removebg-preview_xcl08w.png',
    link: 'https://stemkidsnyc.org'
  },
  {
    name: 'Staten Island Technical High School',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547755/114812-30708864-cc30-4eeb-8975-6e7ff636fbd4-removebg-preview_c32fpv.png',
    link: 'https://www.siths.org'
  },
  {
    name: 'DI Group Architecture',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547919/cropped-DIGroupArchitecture_Tagline_Full_Color-01-6-1024x252_bxks5i.webp',
    link: 'https://www.digrouparchitecture.com'
  },
  {
    name: 'LEAP Academy',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747548087/Screenshot_40-removebg-preview-removebg-preview_d76tjr.png',
    link: 'https://www.yourleapforward.com'
  }
]
onMounted(() => {
  startAutoSlide()
})
</script>

<template>
  <main class="text-gray-800 font-body">
    <section class="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between">
        <div>
          <h2 class="text-4xl font-heading font-bold text-purple-600 mb-4">About Us</h2>
          <p class="text-lg leading-relaxed">
            Explortle is a student-led initiative that brings experienced technical career
            professionals to conduct hands-on workshops in schools across New York City.
          </p>
          <p class="mt-4 text-lg leading-relaxed">
            Our mission is to bridge the gap between students and career professionals from diverse
            industries by offering immersive learning experiences. Our initiative has already
            engaged over
            <span class="font-semibold text-blue-600">925+ students</span>, delivered
            <span class="font-semibold text-blue-600">235 STEM kits</span>, and hosted
            <span class="font-semibold text-blue-600">22+ workshops</span> with various speakers
            from different technical backgrounds.
          </p>
        </div>

        <div class="mt-6">
          <img
            src="@/assets/imgs/graphics/wide.png"
            alt="Explortle"
            class="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div class="mt-6 flex justify-center flex-wrap gap-4">
          <a
            href="#timeline"
            class="inline-block bg-purple-600 text-white font-medium text-lg px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:-translate-y-1"
          >
            See Our Story
          </a>
          <router-link
            to="/whatwedo/#orgs"
            class="inline-block bg-purple-600 text-white font-medium text-lg px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:-translate-y-1"
          >
            Partners
          </router-link>
          <a
            href="#meetteam"
            class="inline-block bg-purple-600 text-white font-medium text-lg px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:-translate-y-1"
          >
            Team Members
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
    <section class="bg-gray-100 py-16 mt-16">
      <div class="container mx-auto">
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-purple-600 mb-10 text-center">
          We've hosted workshops with:
        </h2>

        <div class="overflow-hidden">
          <div class="partner-track animate-slide whitespace-nowrap">
            <template v-for="(org, index) in accomplishments.concat(accomplishments)" :key="index">
              <a
                :href="org.link"
                target="_blank"
                class="inline-block px-6 transition-transform hover:scale-110"
              >
                <img
                  :src="org.path"
                  :alt="org.name"
                  class="h-24 md:h-32 w-auto max-h-40 object-contain rounded-lg shadow-lg"
                />
              </a>
            </template>
          </div>
        </div>
      </div>
    </section>

    <TimeLine id="timeline" />
    <MeetTeam id="meetteam" class="bg-purple-50 rounded-3xl my-8" />
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

@keyframes slide {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.partner-track {
  display: flex;
  width: max-content;
  animation: slide 30s linear infinite;
}
.animate-slide {
  display: flex;
  animation: slide 30s linear infinite;
}
</style>
