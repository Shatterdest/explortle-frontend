<template>
    <div>
        <h1>CONTACT US!!!!</h1>
    </div>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/route';
import { onMounted } from 'vue';

onMounted(() => {
    const route = useRouteStore()
    route.$reset()
    route.route[1].current = true
})
</script>

<style scoped>

</style>