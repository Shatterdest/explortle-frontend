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
    <div class="about">
      <h2 class="text-5xl fade-in">About Us</h2>
      <h3 class="text-lg">
        Explortle is a student-led initiative that aims to bring experienced technical career
        professionals to conduct hands-on workshops in schools across New York City. Through these
        workshops, our goal is to bridge the gap between students and career professionals from
        diverse industries. These hands-on workshops cover a broad range of topics, from STEM, to
        finance, and beyond. Our mission is to provide underrepresented students with interactive,
        real-world learning experiences that inspire curiosity and foster a passion for exploring
        different career paths. We prioritize bringing in engaging speakers, immersive workshops,
        and lessons that make students excited to explore different fields.
      </h3>
    </div>
    <div class="flex justify-center">
      <img class="max-w-full h-auto" src="../assets/imgs/things/us.jpg" alt="" />
    </div>
    <h2 class="text-5xl fade-in">Associates</h2>
    <ul class="container">
      <li class="card">
        <a target="_blank" href="https://www.acementor.org">
          <img src="../assets/imgs/ace.png" alt="" />
          <h3 class="text-3xl">Architecture Construction Engineering Mentorship</h3></a
        >
      </li>
      <li class="card">
        <a target="_blank" href="https://aiasiny.org">
          <img src="../assets/imgs/aia.png" alt="" />
          <h3 class="text-3xl">American Institute of Architects Staten Island New York</h3></a
        >
      </li>
    </ul>
  </main>
</template>

<style lang="css" scoped>
@import '../assets/base.css';

.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  flex: 1 1 calc(30% - 40px);
  max-width: calc(30% - 40px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card img {
  max-width: 100%;
  border-radius: 8px;
  transition: opacity 0.3s ease;
}

.card img:hover {
  opacity: 0.9;
}

h2,
h3 {
  font-family: var(--font-family);
}

h2 {
  color: var(--color-primary);
  margin-top: 40px;
}

h3 {
  color: var(--color-text-muted);
}

@media screen and (max-width: 768px) {
  .card {
    flex: 1 1 calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
}
</style>
