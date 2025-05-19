<script setup>
import { onMounted, ref, computed, reactive, nextTick } from 'vue'
import api from '@/lib/api'

const events = ref([])
const containerWidth = ref(0)
const timelineContainerRef = ref(null)
const isLoading = ref(true);
const fetchError = ref(null);

const config = reactive({
  cardWidth: 288,
  cardHeight: 190, 
  horizontalPadding: 20, 
  verticalPadding: 70, 
  containerPaddingX: 16,
  containerPaddingY: 64,
  svgOffsetTop: 90, 
})

onMounted(async () => {
  isLoading.value = true;
  fetchError.value = null;
  try {
    console.log("Fetching events from API...");
    const res = await api.get('/events');

    if (res && res.data && Array.isArray(res.data)) {
       let fetchedEvents = res.data;

       fetchedEvents.sort((a, b) => {
         try {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
            if (isNaN(dateA.getTime())) return 1;
            if (isNaN(dateB.getTime())) return -1;
            return dateA.getTime() - dateB.getTime();
         } catch (e) {
             console.error("Error parsing dates during sort:", a.date, b.date, e);
             return 0;
         }
       });

       events.value = fetchedEvents;
       console.log(`Workspaceed and sorted ${events.value.length} events.`);

    } else {
       console.error("API response did not contain expected data array:", res);
       fetchError.value = "Received invalid data from server.";
       events.value = [];
    }

    await nextTick();
    if (timelineContainerRef.value) {
      const resizeObserver = new ResizeObserver(entries => {
        if (entries[0]) {
          containerWidth.value = entries[0].contentRect.width;
        }
      });
      resizeObserver.observe(timelineContainerRef.value);
      containerWidth.value = timelineContainerRef.value.offsetWidth;
    } else {
        console.warn("timelineContainerRef not available after mount and nextTick.");
    }

  } catch (error) {
    console.error("Failed to fetch events:", error);
    fetchError.value = `Failed to load timeline data: ${error.message || error}`;
    events.value = [];
  } finally {
      isLoading.value = false;
  }
})

const eventsPerRow = computed(() => {
  if (!containerWidth.value || containerWidth.value <= 0 || !config.cardWidth || !config.horizontalPadding) {
      return 1;
  }
  const availableWidth = containerWidth.value - 2 * config.containerPaddingX;
  if (availableWidth <= 0) return 1;
  const spacePerEvent = config.cardWidth + config.horizontalPadding;
  return Math.max(1, Math.floor(availableWidth / spacePerEvent));
});

const numberOfRows = computed(() => {
  if (!events.value.length || !eventsPerRow.value || eventsPerRow.value === 0) return 0;
  return Math.ceil(events.value.length / eventsPerRow.value);
});

const timelineHeight = computed(() => {
  if (isLoading.value || !numberOfRows.value) return config.containerPaddingY * 3; 
  return (numberOfRows.value * config.cardHeight) +
         (Math.max(0, numberOfRows.value - 1) * config.verticalPadding) +
         (config.containerPaddingY * 2);
});

const getEventPosition = (index) => {
  if (!eventsPerRow.value || eventsPerRow.value === 0 || isLoading.value) {
      return { position: 'absolute', top: `${config.containerPaddingY}px`, left: `${config.containerPaddingX}px`, opacity: 0, visibility: 'hidden' };
  }
  const row = Math.floor(index / eventsPerRow.value);
  const indexInRow = index % eventsPerRow.value;
  const isRtlRow = row % 2 !== 0;

  if (!containerWidth.value || containerWidth.value <= 0) {
       return { position: 'absolute', top: `${config.containerPaddingY}px`, left: `${config.containerPaddingX}px`, opacity: 0, visibility: 'hidden' };
  }

  const availableWidth = containerWidth.value - 2 * config.containerPaddingX;

  let actualEventsInThisRow = eventsPerRow.value;
  if (row === numberOfRows.value - 1) {
      const remainder = events.value.length % eventsPerRow.value;
      if (remainder > 0) {
          actualEventsInThisRow = remainder;
      }
  }

  const totalRowWidth = actualEventsInThisRow * config.cardWidth + Math.max(0, actualEventsInThisRow - 1) * config.horizontalPadding;
  const startOffset = (availableWidth - totalRowWidth) / 2 + config.containerPaddingX;

  let left;
  if (isRtlRow) {
    const positionFromLeft = startOffset + (actualEventsInThisRow - 1 - indexInRow) * (config.cardWidth + config.horizontalPadding);
    left = positionFromLeft;
  } else {
    left = startOffset + indexInRow * (config.cardWidth + config.horizontalPadding);
  }

  const top = config.containerPaddingY + row * (config.cardHeight + config.verticalPadding);

  const finalLeft = isNaN(left) ? config.containerPaddingX : left;
  const finalTop = isNaN(top) ? config.containerPaddingY : top;

  return {
    position: 'absolute',
    top: `${finalTop}px`,
    left: `${finalLeft}px`,
    width: `${config.cardWidth}px`,
    opacity: 1, 
    visibility: 'visible'
  };
};

const generateSerpentinePath = (index) => {
  if (index >= events.value.length - 1 || isLoading.value || !eventsPerRow.value) return "";

  const pos1 = getEventPosition(index);
  const pos2 = getEventPosition(index + 1);

  if (pos1.visibility === 'hidden' || pos2.visibility === 'hidden') return "";

  const row1 = Math.floor(index / eventsPerRow.value);
  const row2 = Math.floor((index + 1) / eventsPerRow.value);

  const x1 = parseFloat(pos1.left || 0) + config.cardWidth / 2;
  const y1 = parseFloat(pos1.top || 0) + config.cardHeight + config.svgOffsetTop - config.containerPaddingY;

  const x2 = parseFloat(pos2.left || 0) + config.cardWidth / 2;
  const y2 = parseFloat(pos2.top || 0) + config.cardHeight + config.svgOffsetTop - config.containerPaddingY;

   if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
       console.warn(`Invalid coordinates for path index ${index}: (${x1},${y1}) to (${x2},${y2})`);
       return "";
   }

  if (row1 !== row2) {
    const curveHeight = config.verticalPadding / 2.5;
    const cp1x = x1;
    const cp1y = y1 + curveHeight;
    const cp2x = x2;
    const cp2y = y2 - curveHeight;
    return `M${x1},${y1} C${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
  } else {
    return `M${x1},${y1} L${x2},${y2}`;
  }
};

const linkableEvents = computed(() => {
  return !isLoading.value && events.value.length > 1 ? events.value.slice(0, events.value.length - 1) : [];
});

const getAnimationDelay = (index) => {
    return `${0.2 + index * 0.1}s`;
}

</script>

<template>
  <div class="relative overflow-x-hidden px-4 py-16 bg-gradient-to-b from-gray-50 to-purple-50"> <h1 class="text-4xl md:text-5xl font-heading font-bold text-center text-purple-700 mb-20"> Timeline of Events
    </h1>

    <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
         <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>

    <div v-if="fetchError" class="text-center text-red-700 bg-red-100 border border-red-300 rounded-lg p-6 max-w-lg mx-auto shadow-md">
        <h2 class="font-semibold text-lg mb-2">Oops! Something went wrong.</h2>
        <p>{{ fetchError }}</p>
        <p class="mt-3 text-sm">Please try refreshing the page.</p>
    </div>

    <div
      ref="timelineContainerRef"
      class="relative mx-auto max-w-screen-xl timeline-container"
      :style="{ height: `${timelineHeight}px` }"
      v-show="!isLoading && !fetchError && events.length > 0"
    >
      <transition-group name="card-fade-slide">
        <div
          v-for="(event, index) in events"
          :key="event._id"
          :style="{ ...getEventPosition(index), animationDelay: getAnimationDelay(index) }"
          class="card-item absolute p-6 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl
                 border-t-4 border-purple-500
                 flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1.5 z-10"
          :class="{ 'opacity-0': getEventPosition(index).opacity === 0 }" >
          <p class="text-xs text-purple-500 font-medium uppercase tracking-wider mb-1.5"> {{ new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}
          </p>
          <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ event.title }}</h2>
          <router-link
            :to="`/event/${event.slug}`"
            class="text-purple-600 font-semibold hover:text-purple-800 mt-auto inline-block self-start transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded"
          >
            Read more &rarr; </router-link>
        </div>
      </transition-group>

      <svg
        v-if="linkableEvents.length > 0 && containerWidth > 0"
        class="absolute top-0 left-0 w-full z-0 pointer-events-none"
        :style="{ height: `${timelineHeight}px` }"
        :viewBox="`0 0 ${containerWidth} ${timelineHeight}`"
        preserveAspectRatio="none"
      >
        <g :transform="`translate(0, ${config.containerPaddingY - config.svgOffsetTop})`">
          <div></div>
         <path
            v-for="(event, index) in linkableEvents"
            :key="'line-' + event._id"
            :d="generateSerpentinePath(index)"
            class="timeline-path stroke-purple-400 stroke-[2.5] fill-none"
             :style="{ animationDelay: getAnimationDelay(index + 0.5) }" />
        </g>
      </svg>
    </div>

    <div v-if="!isLoading && !fetchError && events.length === 0" class="text-center text-gray-500 py-10">
        <p class="text-lg">No timeline events have been added yet.</p>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  position: relative;
  transition: height 0.5s ease-in-out;
}

.card-fade-slide-enter-from,
.card-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.card-fade-slide-enter-active,
.card-fade-slide-leave-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.card-item.opacity-0 {
    opacity: 0;
}


.timeline-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-line 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards,
             pulse-glow 3s infinite ease-in-out 1.5s; 
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pulse-glow {
  0%, 100% {
    filter: drop-shadow(0 0 1px rgba(168, 85, 247, 0.5)); 
  }
  50% {
    filter: drop-shadow(0 0 3px rgba(168, 85, 247, 0.8));
  }
}

</style>