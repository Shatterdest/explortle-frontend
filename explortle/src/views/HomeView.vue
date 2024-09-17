<script setup lang="ts">
import { useRouteStore } from '@/stores/route'
import { onMounted } from 'vue'

onMounted(() => {
  const route = useRouteStore()
  route.$reset()
  route.route[0].current = true
})
</script>

<template>
  <main>
    <h3>
      Explortle is a student-led initiative that aims to bring experienced technical career
      professionals to conduct hands-on workshops in schools across New York City. Through these
      workshops, our goal is to bridge the gap between students and career professionals from
      diverse industries. These hands-on workshops cover a broad range of topics, from STEM, to
      finance, and beyond. Our mission is to provide underrepresented students with interactive,
      real-world learning experiences that inspire curiosity and foster a passion for exploring
      different career paths. We prioritize bringing in engaging speakers, immersive workshops, and
      lessons that make students excited to explore different fields.
    </h3>
    <h2>Associates</h2>
    <h3>ACE and AIASINY</h3>
  </main>
</template>
