<template>
  <div class="quiz-container">
    <h1>Find Your STEM Career Path!</h1>

    <div v-if="!showResults">
      <div v-for="(question, index) in questions" :key="index" class="question">
        <p>{{ question.text }}</p>
        <div class="options">
          <button
            v-for="option in [1, 2, 3, 4, 5]"
            :key="option"
            @click="selectAnswer(index, option)"
            :class="{ selected: answers[index] === option }"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <button @click="calculateResults" :disabled="answers.length < questions.length">
        Get My Career Match!
      </button>
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
  answers.value = []
  Object.keys(scores).forEach((key) => (scores[key] = 0))
  showResults.value = false
}
</script>

<style scoped>
.quiz-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.question {
  margin: 15px 0;
}
.options button {
  margin: 5px;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}
.options .selected {
  background-color: #42b983;
  color: white;
}
</style>
