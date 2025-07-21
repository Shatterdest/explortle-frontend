<template>
  <main>
    <div class="container mx-auto">
      <h2 class="text-4xl font-heading font-bold text-purple-600 my-4 ml-[5%]">Career Game</h2>
      <div class="cardscontainer flex flex-wrap justify-around w-[90%] p-8 bg-white mx-auto">
        <div
          class="card flex flex-col justify-center items-center w-[21%] h-[200px] border-2 border-black mb-[3%] shadow-[9px_8px_0_black] rounded-2xl bg-white cursor-pointer transition duration-300 overflow-hidden"
          v-for="(career, index) in careers"
          :key="career.name"
          @click="toggleCard(index)"
        >
          <template v-if="revealedCards.includes(index)">
            <CareerGame :career="career" />
          </template>
          <template v-else>
            <img src="y/Placeholder.png" alt="Placeholder" class="object-contain max-h-full" />
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { careers } from '@/components/GameCareers'
import CareerGame from '@/components/CareerGame.vue'

const revealedCards = ref<number[]>([])

function toggleCard(index: number) {
  if (revealedCards.value.includes(index)) {
    revealedCards.value = revealedCards.value.filter((i) => i !== index)
    return
  }

  if (revealedCards.value.length >= 2) {
    revealedCards.value = []
  }

  revealedCards.value.push(index)
}
</script>

<style scoped></style>
