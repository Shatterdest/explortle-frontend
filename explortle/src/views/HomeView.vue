<script setup lang="ts">
import QuizPage from '@/components/quiz/QuizPage.vue'
import TimeLine from '@/components/TimeLine.vue'
import MeetTeam from '@/components/MeetTeam.vue'
import { useRouteStore } from '@/stores/route'
import { onMounted, ref } from 'vue'
import { partners } from '@/data/partners'

onMounted(() => {
  const route = useRouteStore()
  route.$reset()
  route.route[0].current = true
})

const showSecondVideo = ref(false)
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
            <span class="font-semibold text-blue-600">1000+ students</span>, delivered
            <span class="font-semibold text-blue-600">425 STEM kits</span>, and hosted
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

      <div class="flex flex-col items-center justify-center px-6">
        <h3 class="text-2xl font-heading font-semibold text-purple-600 text-center mb-4">
          Check out our new video series: <span class="italic">Campus Voices</span>
        </h3>

        <div
          class="w-full aspect-[16/9] rounded-lg shadow-md overflow-hidden cursor-pointer group relative"
          @click="showSecondVideo = true"
        >
          <template v-if="!showSecondVideo">
            <img
              src="https://img.youtube.com/vi/zu-pixBoDUE/hqdefault.jpg"
              alt="YouTube Thumbnail"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition"
            >
              <svg
                class="w-16 h-16 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </template>

          <template v-else>
            <iframe
              class="w-full h-full rounded-lg shadow-md"
              src="https://www.youtube.com/embed/zu-pixBoDUE?autoplay=1"
              title="YouTube Embed"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </template>
        </div>
      </div>
    </section>
    <section class="bg-gray-100 py-16 mt-16">
      <div class="container mx-auto">
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-purple-600 mb-10 text-center">
          We've hosted workshops with:
        </h2>

        <div class="overflow-hidden">
          <div class="partner-track animate-slide whitespace-nowrap">
            <template v-for="(org, index) in partners.concat(partners)" :key="index">
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