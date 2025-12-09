import { ref, onUnmounted } from 'vue'

export function useSlideshow(images: string[], intervalMs: number = 3000) {
  const currentSlide = ref(0)
  const slidingDirection = ref<'next' | 'prev'>('next')
  let slideInterval: ReturnType<typeof setInterval> | null = null

  const nextSlide = () => {
    slidingDirection.value = 'next'
    currentSlide.value = (currentSlide.value + 1) % images.length
  }

  const prevSlide = () => {
    slidingDirection.value = 'prev'
    currentSlide.value = (currentSlide.value - 1 + images.length) % images.length
  }

  const startAutoSlide = () => {
    stopAutoSlide()
    slideInterval = setInterval(nextSlide, intervalMs)
  }

  const stopAutoSlide = () => {
    if (slideInterval) {
      clearInterval(slideInterval)
      slideInterval = null
    }
  }

  onUnmounted(() => {
    stopAutoSlide()
  })

  return {
    currentSlide,
    slidingDirection,
    nextSlide,
    prevSlide,
    startAutoSlide,
    stopAutoSlide
  }
}
