<template>
  <main>
    <div class="container mx-auto">
      <h2 class="text-4xl font-heading font-bold text-purple-600 my-4 ml-[5%]">Career Game</h2>
      <div class="cardscontainer flex flex-wrap justify-around w-[90%] p-8 bg-white mx-auto">
        <div
          class="card flex flex-col justify-evenly items-center w-[21%] h-auto border-2 border-black mb-[3%] shadow-[9px_8px_0_black] rounded-2xl bg-white"
          v-for="career in careers"
          :key="career.name"
        >
          <CareerGame :career="career" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { careers } from '@/components/GameCareers'
import CareerGame from '@/components/CareerGame.vue'
</script>

<style scoped></style>

<!-- <div class="container mx-auto">
      
      <div class="gamepart bg-white rounded-lg shadow-md p-8 flex flex-col justify-between w-[90%]">
        <div class="moves"></div>
        <div
          class="gameplay flex flex-wrap gap-4 justify-center"
          v-for="career in careers"
          :key="career.name"
        >
          <CareerGame
            class="card flex flex-col justify-evenly items-center w-[27%] h-auto border-2 border-black mb-[3%] shadow-[9px_8px_0_black] rounded-2xl bg-white"
            :career="career"
          />
        </div>
        <div class="otherbuttons"></div>
      </div>
    </div> -->
