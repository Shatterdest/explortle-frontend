<template>
  <div class="quiz-container">
    <h1 class="text-3xl font-heading font-bold text-purple-600">Find Your STEM Career Path!</h1>

    <div v-if="!quizStarted" class="text-center mt-6">
      <button
        @click="quizStarted = true"
        class="bg-purple-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
      >
        Start Quiz
      </button>
    </div>

    <div v-if="quizStarted && !showResults">
      <div
        v-for="(question, index) in questions"
        :key="index"
        class="question bg-gray-100 p-6 rounded-lg shadow-md my-4"
      >
        <p class="text-lg font-medium text-gray-700">{{ question.text }}</p>
        <div class="options flex justify-center gap-3 mt-4">
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

    <Results v-if="showResults" :scores="scores" @restart="restartQuiz" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Results from './ResultsPage.vue'

const questions = ref([
  { text: 'How do you feel about math?' },
  { text: 'If your computer breaks, what’s your first move?' },
  { text: 'How do you handle a group project?' },
  { text: 'A robot uprising begins—what’s your role?' },
  { text: 'You find a weird rock. What do you do?' },
  { text: 'How do you feel about coding?' },
  { text: "You're given a mystery box with wires sticking out. What's your reaction?" },
  { text: 'How do you handle an all-nighter before a deadline?' },
  { text: 'What’s your ideal way to spend a free afternoon?' },
  { text: 'If you had to pick a lab partner, who would it be?' }
])

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
