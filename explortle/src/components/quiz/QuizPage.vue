<template>
  <div class="quiz-container">
    <h1 class="text-3xl font-heading font-bold text-purple-600">Discover Your Inner STEM Superpower!</h1>

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
            <span class="text-gray-500 text-sm">Not at all</span>
            <button
              v-for="option in [1, 2, 3, 4, 5]"
              :key="option"
              class="px-4 py-2 rounded-md bg-gray-200 text-gray-800 opacity-50 cursor-not-allowed"
            >
              {{ option }}
            </button>
            <span class="text-gray-500 text-sm">Definitely!</span>
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
            <span class="text-gray-500 text-sm">Not at all</span>
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
            <span class="text-gray-500 text-sm">Definitely!</span>
          </div>
        </div>

        <div class="text-center mt-6">
          <button
            @click="calculateResults"
            :disabled="answers.length < questions.length"
            class="bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            Reveal My STEM Calling!
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
  { text: 'Do you enjoy figuring out how things work, like taking apart toys (and sometimes putting them back together)?' },
  { text: 'Are you the go-to person when your friends have tech troubles?' },
  { text: 'Do you find yourself wondering "why?" about the world around you?' },
  { text: 'Are you good at spotting patterns and solving puzzles?' },
  { text: 'Do you like building things with LEGOs, blocks, or other construction toys?' },
  { text: 'Does the idea of creating your own video game or app sound exciting?' },
  { text: 'Are you fascinated by nature, animals, and plants?' },
  { text: 'Do you enjoy math problems or brain teasers?' },
  { text: 'Are you interested in how machines and robots are made and function?' },
  { text: 'Do you like to experiment and see what happens when you mix things (safely, of course!)?' },
  { text: 'Do you care about protecting the environment and finding solutions to pollution?' },
  { text: 'Are you curious about space, stars, and planets?' },
  { text: 'Do you enjoy organizing things and making them more efficient?' },
  { text: 'Are you interested in how the human body works?' },
  { text: 'Do you like to analyze information and draw conclusions from it?' },
])

const previewQuestions = ref(questions.value.slice(0, 3))

const quizStarted = ref(false)
const answers = ref([])
const showResults = ref(false)

const scores = reactive({
  tinkerer: 0,
  techLover: 0,
  natureExplorer: 0,
  puzzleSolver: 0,
  builder: 0,
  coder: 0,
  experimenter: 0,
  spaceEnthusiast: 0,
  optimizer: 0,
  bodyScientist: 0,
  dataDetective: 0,
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
    if ([0, 4, 8].includes(index)) scores.tinkerer += score;
    if ([1, 5, 8].includes(index)) scores.techLover += score;
    if ([2, 6, 11].includes(index)) scores.natureExplorer += score;
    if ([3, 7, 14].includes(index)) scores.puzzleSolver += score;
    if ([0, 4, 8].includes(index)) scores.builder += score;
    if ([1, 5].includes(index)) scores.coder += score;
    if ([2, 6, 9].includes(index)) scores.experimenter += score;
    if ([11].includes(index)) scores.spaceEnthusiast += score;
    if ([12].includes(index)) scores.optimizer += score;
    if ([6, 13].includes(index)) scores.bodyScientist += score;
    if ([3, 14].includes(index)) scores.dataDetective += score;
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