<template>
    <div class="results-container">
      <h2>Your Ideal STEM Career:</h2>
      <p class="career">{{ careerMatch }}</p>
      <p class="description">{{ description }}</p>
      <button @click="$emit('restart')">Retake Quiz</button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps(['scores']);
  const emit = defineEmits(['restart']);
  
  const careerMatch = computed(() => {
    const { tech, handsOn, science, math, chaos } = props.scores;
    const maxScore = Math.max(tech, handsOn, science, math, chaos);
  
    if (maxScore === tech) return "Software Engineer, Data Scientist, Cybersecurity Expert";
    if (maxScore === handsOn) return "Mechanical Engineer, Electrical Engineer, Robotics Specialist";
    if (maxScore === science) return "Biologist, Chemist, Geologist";
    if (maxScore === math) return "Mathematician, Statistician, Economist";
    if (maxScore === chaos) return "Environmental Scientist, AI Researcher, Astrophysicist";
  
    return "Undecided STEM Explorer!";
  });
  
  const description = computed(() => {
    if (careerMatch.value.includes("Software Engineer")) return "You love breaking things down, analyzing data, and talking to computers.";
    if (careerMatch.value.includes("Mechanical Engineer")) return "You see a broken toaster and think, 'I can fix that!'";
    if (careerMatch.value.includes("Biologist")) return "You see the world as one big science experiment.";
    if (careerMatch.value.includes("Mathematician")) return "Numbers don’t scare you—they inspire you.";
    if (careerMatch.value.includes("Environmental Scientist")) return "You might not have a strict plan, but you’re here to shake things up.";
  
    return "You're a curious mind with diverse interests!";
  });
  </script>
  
  <style scoped>
  .results-container {
    text-align: center;
    max-width: 500px;
    margin: auto;
  }
  .career {
    font-weight: bold;
    font-size: 1.2em;
    color: #42b983;
  }
  </style>
  