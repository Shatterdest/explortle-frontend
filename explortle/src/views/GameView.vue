<template>
  <main>
    <div class="container mx-auto">
      <h2 class="text-4xl font-heading font-bold text-purple-600 my-4 ml-[5%]">Career Game</h2>

      <div
        v-if="!hasWon"
        class="cardscontainer flex flex-wrap justify-around w-[90%] p-8 bg-white mx-auto"
      >
        <div
          v-for="(career, index) in careers"
          :key="career.id"
          class="card-wrapper w-[21%] h-[395px] mb-[3%] perspective"
          :class="[
            matchedFadingCards.includes(index)
              ? 'opacity-0 pointer-events-none transition-opacity duration-1000'
              : '',
            matchedCards.includes(index) ? 'invisible' : ''
          ]"
          @click="toggleCard(index)"
        >
          <div
            class="card-inner relative w-full h-full transition-transform duration-700 transform-style preserve-3d"
            :class="revealedCards.includes(index) ? 'rotate-y-180' : ''"
          >
            <!-- Back (hidden side) -->
            <div
              class="card-face card-back absolute w-full h-full flex items-center justify-center border-2 border-black rounded-2xl bg-white backface-hidden"
            >
              <img
                src="/Placeholder.png"
                alt="Placeholder"
                class="object-contain max-h-full h-[100%]"
              />
            </div>

            <!-- Front (revealed side) -->
            <div
              class="card-face card-front absolute w-full h-full border-2 border-black rounded-2xl bg-white rotate-y-180 backface-hidden overflow-hidden"
            >
              <CareerGame :career="career" />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="hasWon"
        class="text-8xl font-bold text-green-600 text-center w-full mt-6 animate-bounce"
      >
        🎉 You Win! 🎉
      </div>
      <div class="w-full flex justify-center my-3">
        <button
          class="bg-purple-600 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-purple-700 transition-colors"
          @click="restartGame"
        >
          🔄 Restart Game
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { baseCareers, type Career } from '@/components/GameCareers'
import CareerGame from '@/components/CareerGame.vue'

const revealedCards = ref<number[]>([])
const matchedCards = ref<number[]>([])
const matchedFadingCards = ref<number[]>([])
const isChecking = ref(false)

const careers = ref<Career[]>(pickRandomCareers(baseCareers, 10))

function pickRandomCareers(allCareers: Career[], count: number): Career[] {
  const possibleCareers = [...allCareers]

  const selected: Career[] = []
  for (let i = 0; i < count; i++) {
    const randomCareers = Math.floor(Math.random() * possibleCareers.length)
    const career = possibleCareers.splice(randomCareers, 1)[0]
    selected.push(career)
  }

  const duplicatedCareers: Career[] = []
  selected.forEach((career) => {
    duplicatedCareers.push({ ...career, uid: career.id + '-a' })
    duplicatedCareers.push({ ...career, uid: career.id + '-b' })
  })

  return shuffleCards(duplicatedCareers)
}

//console.log(careers.value)

function shuffleCards(array: Career[]): Career[] {
  const newShuffle = [...array]
  for (let i = newShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newShuffle[i], newShuffle[j]] = [newShuffle[j], newShuffle[i]]
  }
  return newShuffle
}

function restartGame() {
  window.location.reload()
}

const totalCards = careers.value.length
const hasWon = computed(() => matchedCards.value.length === totalCards)

function toggleCard(index: number) {
  if (
    isChecking.value ||
    revealedCards.value.includes(index) ||
    matchedCards.value.includes(index) ||
    matchedFadingCards.value.includes(index)
  )
    return

  revealedCards.value.push(index)

  if (revealedCards.value.length === 2) {
    isChecking.value = true
    const [firstIdx, secondIdx] = revealedCards.value
    const firstCard = careers.value[firstIdx]
    const secondCard = careers.value[secondIdx]

    if (firstCard.id === secondCard.id) {
      matchedFadingCards.value.push(firstIdx, secondIdx)

      setTimeout(() => {
        matchedCards.value.push(firstIdx, secondIdx)
        matchedFadingCards.value = matchedFadingCards.value.filter(
          (i) => i !== firstIdx && i !== secondIdx
        )
        revealedCards.value = []
        isChecking.value = false
      }, 1000)
    } else {
      setTimeout(() => {
        revealedCards.value = []
        isChecking.value = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}

.card-wrapper {
  perspective: 1000px;
  min-height: 300px;
}

.card-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  width: 100%;
  height: 100%;
  position: relative;
}

.card-face {
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}

.card-back {
  transform: rotateY(0deg);
}

.card-front {
  transform: rotateY(180deg);
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
