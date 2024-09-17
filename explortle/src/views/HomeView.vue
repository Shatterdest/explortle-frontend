<script setup lang="ts">
import { useRouteStore } from '@/stores/route'
import { onMounted, ref } from 'vue'

onMounted(() => {
  const route = useRouteStore()
  route.$reset()
  route.route[0].current = true
})

const members = ref([
  {
    id: 1,
    name: 'Placeholder'
  },
  { id: 2, name: 'Placeholder' },
  { id: 3, name: 'Placeholder' }
])
</script>

<template>
  <main>
    <h2 class="text-5xl">About Us</h2>
    <h3 class="text-lg">
      Explortle is a student-led initiative that aims to bring experienced technical career
      professionals to conduct hands-on workshops in schools across New York City. Through these
      workshops, our goal is to bridge the gap between students and career professionals from
      diverse industries. These hands-on workshops cover a broad range of topics, from STEM, to
      finance, and beyond. Our mission is to provide underrepresented students with interactive,
      real-world learning experiences that inspire curiosity and foster a passion for exploring
      different career paths. We prioritize bringing in engaging speakers, immersive workshops, and
      lessons that make students excited to explore different fields.
    </h3>
    <h2 class="text-5xl">Associates</h2>
    <ul class="container">
      <li class="card">
        <img src="../assets/imgs/ace.png" alt="" />
        <h3 class="text-3xl">Architecture Construction Engineering Mentorship</h3>
      </li>
      <li class="card">
        <img src="../assets/imgs/aia.png" alt="" />
        <h3 class="text-3xl">American Institute of Architects Staten Island New York</h3>
      </li>
    </ul>
    <h2 class="text-5xl">Meet The Team</h2>
    <div class="text-lg" v-for="member in members" :key="member.id">
      #{{ member.id }}: 
      {{ member.name }}
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
