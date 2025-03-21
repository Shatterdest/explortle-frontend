<template>
  <div class="quiz-container">
    <h1 class="text-3xl font-heading font-bold text-purple-600">Find Your STEM Career Path!</h1>

    <div v-if="!quizStarted" class="text-center mt-6">
      <button
        @click="startQuiz"
        class="bg-purple-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
      >
        Start Quiz
      </button>

      <div class="mt-6">
        <div
          v-for="(question, index) in previewQuestions"
          :key="index"
          class="question bg-gray-100 p-6 rounded-lg shadow-md my-4 opacity-preview"
          :style="{ opacity: 1 - index * 0.3 }"
        >
          <p class="text-lg font-medium text-gray-700">{{ question.text }}</p>
          <div class="options flex items-center justify-center gap-3 mt-4">
            <span class="text-gray-500 text-sm">Disagree</span>
            <button
              v-for="option in [1, 2, 3, 4, 5]"
              :key="option"
              class="px-4 py-2 rounded-md bg-gray-200 text-gray-800 opacity-50 cursor-not-allowed"
            >
              {{ option }}
            </button>
            <span class="text-gray-500 text-sm">Agree</span>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade-in">
      <div v-if="quizStarted && !showResults">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="question bg-gray-100 p-6 rounded-lg shadow-md my-4"
        >
          <p class="text-lg font-medium text-gray-700">{{ question.text }}</p>
          <div class="options flex items-center justify-center gap-3 mt-4">
            <span class="text-gray-500 text-sm">Disagree</span>
            <button
              v-for="option in [1, 2, 3, 4, 5]"
              :key="option"
              @click="selectAnswer(index, option)"
              :class="{
                'bg-purple-600 text-white': answers[index] === option,
                'bg-gray-200 text-gray-800 hover:bg-purple-500 hover:text-white':
                  answers[index] !== option
              }"
              class="px-4 py-2 rounded-md transition"
            >
              {{ option }}
            </button>
            <span class="text-gray-500 text-sm">Agree</span>
          </div>
        </div>

        <div class="text-center mt-6">
          <button
            @click="calculateResults"
            :disabled="answers.length < questions.length"
            class="bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            Get My Career Match!
          </button>
        </div>
      </div>
    </transition>

    <Results v-if="showResults" :scores="scores" @restart="restartQuiz" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Results from './ResultsPage.vue'

const questions = ref([
  { text: 'Are you good at math?' },
  { text: 'If your computer breaks, how confident are you in fixing it?' },
  { text: 'Do you handle group projects well?' },
  { text: 'Are you good at "communicating" with computers?' },
  { text: 'How curious are you about the physical world around you?' },
  { text: 'How do you feel about coding?' },
  { text: "How eager are you to experiment with unfamiliar technology?" },
  { text: 'Do you work efficiently during an all-nighter before a deadline?' },
  { text: 'How often do you spend free time doing hands-on activities (building, experimenting, fixing things)?' },
  { text: 'Who would you rather work with, someone structured or spontaneous?' }
])

const previewQuestions = ref(questions.value.slice(0, 3))

const quizStarted = ref(false)
const answers = ref([])
const showResults = ref(false)

const scores = reactive({
  tech: 0,
  handsOn: 0,
  science: 0,
  math: 0,
  chaos: 0
})

const startQuiz = () => {
  quizStarted.value = true
}

const selectAnswer = (index, value) => {
  answers.value[index] = value
}

const calculateResults = () => {
  Object.keys(scores).forEach((key) => (scores[key] = 0))

  answers.value.forEach((score, index) => {
    if ([0, 5].includes(index)) scores.math += score
    if ([1, 6].includes(index)) scores.tech += score
    if ([2, 4].includes(index)) scores.science += score
    if ([3, 8].includes(index)) scores.chaos += score
    if ([7, 9].includes(index)) scores.handsOn += score
  })

  showResults.value = true
}

const restartQuiz = () => {
  quizStarted.value = false
  answers.value = []
  Object.keys(scores).forEach((key) => (scores[key] = 0))
  showResults.value = false
}
</script>

<style scoped>
.quiz-container {
  max-width: 800px; 
  margin: 0 auto; 
  padding: 1rem; 
}

.opacity-preview {
  filter: blur(.3px);
  pointer-events: none;
}

.fade-in-enter-active {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .quiz-container {
    max-width: 100vw; 
    padding: 0.5rem;
  }

  .options {
    gap: 2px; 
    flex-wrap: nowrap; 
    overflow-x: auto; 
    padding: 0 8px; 
  }

  .options button {
    padding: 0.5rem 0.75rem; 
    font-size: 0.875rem; 
    flex-shrink: 0;
  }

  .options span {
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .question {
    padding: 1rem; 
  }
}
</style>