<template>
  <div class="results-container bg-white shadow-lg rounded-lg p-8 text-center">
    <h2 class="text-2xl font-heading font-bold text-purple-600">Your Top STEM Career Path:</h2>
    <p class="career text-xl font-semibold mt-3">{{ topCareer }}</p>
    <p class="description text-gray-600 mt-4">{{ generalDescription }}</p>

    <button
      @click="$emit('restart')"
      class="mt-6 bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
    >
      Try Again!
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['scores']);

const sortedScores = computed(() => {
  return Object.entries(props.scores)
    .sort(([, a], [, b]) => b - a)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
});

const topCareer = computed(() => {
  const topCategory = Object.keys(sortedScores.value)[0];
  switch (topCategory) {
    case 'tinkerer': return 'Mechanical, Electrical, or Robotics Engineer';
    case 'techLover': return 'Software Engineer, Computer Scientist, or Cybersecurity Expert';
    case 'natureExplorer': return 'Biologist, Environmental Scientist, or Marine Biologist';
    case 'puzzleSolver': return 'Mathematician, Data Scientist, or Cryptographer';
    case 'builder': return 'Civil, Architectural, or Mechanical Engineer';
    case 'coder': return 'Software Developer, Web Developer, or Game Designer';
    case 'experimenter': return 'Chemist, Chemical Engineer, or Materials Scientist';
    case 'spaceEnthusiast': return 'Astrophysicist, Aerospace Engineer, or Astronomer';
    case 'optimizer': return 'Industrial Engineer, Operations Research Analyst, or Logistics Manager';
    case 'bodyScientist': return 'Biologist, Biomedical Engineer, or Doctor/Medical Researcher';
    case 'dataDetective': return 'Data Scientist, Data Analyst, or Business Intelligence Analyst';
    default: return 'Explore More STEM Fields!';
  }
});

const generalDescription = computed(() => {
  const topScoreCategory = Object.keys(sortedScores.value)[0];
  switch (topScoreCategory) {
    case 'tinkerer': return "You love to understand how things work and enjoy hands-on activities. You're a natural problem-solver who likes to get under the hood!";
    case 'techLover': return "You're passionate about technology and enjoy exploring new gadgets and software. You're likely curious about how digital things are created and secured.";
    case 'natureExplorer': return "You have a deep connection with the natural world and are curious about living organisms and ecosystems. You might be interested in conservation or research.";
    case 'puzzleSolver': return "You have a sharp mind for patterns and enjoy the challenge of cracking codes and solving complex problems. Numbers and logic might be your friends!";
    case 'builder': return "You have a knack for visualizing and creating structures. You enjoy the process of bringing ideas to life in a tangible way.";
    case 'coder': return "You enjoy the creative process of writing code and building digital experiences. You like to give instructions to computers and see them come to life.";
    case 'experimenter': return "You're driven by curiosity and love to test hypotheses and see the results. You enjoy the process of discovery through experimentation.";
    case 'spaceEnthusiast': return "The cosmos calls to you! You're fascinated by the universe and the mysteries it holds. You might dream of exploring the stars.";
    case 'optimizer': return "You have a keen eye for efficiency and enjoy finding ways to make things work better and smoother. You like to organize and streamline processes.";
    case 'bodyScientist': return "You're intrigued by the complexities of the human body and how it functions. You might be interested in health, medicine, or biological research.";
    case 'dataDetective': return "You enjoy digging into information to find hidden insights and stories. You're good at analyzing trends and making sense of numbers.";
    default: return "Based on your responses, exploring these STEM fields could be a great starting point!";
  }
});
</script>

<style scoped>
.results-container {
  max-width: 600px;
  margin: auto;
}

.career {
  font-weight: bold;
  font-size: 1.2em;
  color: #7b4efc;
}
</style>