<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
    name: 'American Institute of Architects Staten Island NY',
    path: 'https://res.cloudinary.com/dbja1kd6e/image/upload/v1747547491/aia_mgx9pk.png',
    link: 'https://aiasiny.org'
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
const isMobile = ref(window.innerWidth < 768)

const updateScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
  updateScreenSize()
})

const imageFiles = import.meta.glob('@/assets/imgs/workshops/*.png', { eager: true })

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

onMounted(() => {
  startAutoSlide()
})
</script>

<template>
  <main class="bg-white text-gray-800 font-body">
    <section class="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col justify-between relative">
        <div>
          <h2 class="text-4xl font-heading font-bold text-purple-600 mb-4">Explortle Impact</h2>
          <p class="text-lg leading-relaxed">
            Since our founding, Explortle has connected students with career professionals through
            interactive workshops. Our hands-on experiences provide real-world exposure to STEM,
            finance, and other industries.
          </p>
          <p class="mt-4 text-lg leading-relaxed">
            Our initiative has already engaged over
            <span class="font-semibold text-blue-600">500 students</span> and featured
            <span class="font-semibold text-blue-600">six distinguished speakers</span> from various
            technical backgrounds.
          </p>
        </div>

        <div class="mt-6 flex items-center justify-end md:justify-end">
          <p class="text-gray-600 text-md font-medium">
            Images from our partnership workshop with
            <a
              href="https://www.yourleapforward.com"
              target="_blank"
              class="text-blue-600 font-semibold hover:underline"
            >
              Leap Academy
            </a>
          </p>
          <svg
            class="ml-3 w-6 h-6 text-gray-600 transition-transform"
            :class="{ 'rotate-down': isMobile, 'rotate-left': !isMobile }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.22 10.22a.75.75 0 0 1 1.06 0L12 16.94l6.72-6.72a.75.75 0 1 1 1.06 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0l-7.25-7.25a.75.75 0 0 1 0-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div
        class="relative w-full max-w-[512px] mx-auto rounded-lg shadow-lg border-4 border-gray-300 overflow-hidden aspect-[512/640] group"
        @mouseover="stopAutoSlide"
        @mouseleave="startAutoSlide"
      >
        <div class="relative w-full h-full">
          <transition :name="slidingDirection === 'next' ? 'slide-next' : 'slide-prev'">
            <img
              v-if="images.length"
              :key="currentSlide"
              :src="images[currentSlide]"
              alt="Workshop Image"
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
    <section id="orgs" class="py-16 px-6">
      <h2 class="text-4xl font-heading font-bold text-purple-600 text-center fade-in">
        We've hosted workshops with these organizations:
      </h2>

      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div
          v-for="a in accomplishments"
          :key="a.name"
          class="bg-white shadow-md rounded-lg overflow-hidden transform hover:-translate-y-2 transition duration-300"
        >
          <a target="_blank" :href="a.link" class="block p-6 text-center">
            <img class="mx-auto mb-4 max-h-24 rounded-md" :src="a.path" :alt="a.name" />
            <h3 class="text-2xl font-heading font-semibold text-gray-700">
              {{ a.name }}
            </h3>
          </a>
        </div>
      </div>
    </section>

    <div class="mt-10 flex justify-center px-6">
      <div class="relative w-full md:w-4/5 aspect-video">
        <iframe
          class="w-full h-full rounded-lg shadow-md"
          src="https://www.youtube.com/embed/0442kbMR9R4?si=CTHWxwJ03M3lTclM"
          title="Explortle Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <section class="py-16 px-6">
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <img
          class="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition"
          src="@/assets/imgs/things/accomplishment/1.jpg"
          alt="Explortle Workshop"
        />
        <img
          class="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition"
          src="@/assets/imgs/things/accomplishment/2.jpg"
          alt="Explortle Student Engagement"
        />
      </div>

      <p class="text-gray-600 text-center mt-4 text-lg">
        Our first guest speaker,
        <span class="font-semibold">Barbara Jane Jasionek</span>, an architect marketing manager
        from
        <a
          href="https://www.digrouparchitecture.com"
          target="_blank"
          class="text-blue-600 font-semibold hover:underline"
        >
          DIGroup Architecture
        </a>
      </p>
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

.rotate-left {
  transform: rotate(-90deg);
}

.rotate-down {
  transform: rotate(0deg);
}

svg {
  transition: transform 0.3s ease-in-out;
}
</style>
