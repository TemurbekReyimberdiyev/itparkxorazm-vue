<template>
  <div class="max-w-7xl mx-auto px-10 py-12 bg-white text-center">
    <h2 class="text-2xl font-semibold text-[#7dba28] mb-2">Bizning Mentorlar</h2>
    <p class="text-gray-900 mb-10">
      "Bizning mentorlar — o‘z sohasining yetakchi mutaxassislari. Har bir o‘quvchiga individual yondashib, amaliy va zamonaviy bilim beradi. Ular bilan kasbga aylanuvchi ko‘nikmalarni tez va samarali o‘rganasiz."
    </p>

    <!-- Carousel -->
    <Carousel
      ref="carouselRef"
      :itemsToShow="itemsToShow"
      :wrapAround="false"
      :transition="500"
      snapAlign="start"
      :breakpoints="mentorBreakpoints"
      class="w-full px-4 max-w-7xl mx-auto"
      @slide-end="updateActiveSlide"
    >
      <Slide
        v-for="(mentor, index) in mentors"
        :key="index"
      >
        <div class="px-2 w-full">
          <MentorCard
            :name="mentor.name"
            :field="mentor.field"
            :education="mentor.education"
            :experience="mentor.experience"
            :students="mentor.students"
            :avatar="mentor.avatar"
            :skills="mentor.skills"
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>

    <!-- Custom Dots -->
    <div class="flex justify-center mt-6 space-x-2">
      <span
        v-for="index in dotsCount"
        :key="'dot-' + index"
        @click="() => { carouselRef.value.slideTo(index - 1); updateActiveSlide() }"
        :class="[ 'w-3 h-3 rounded-full cursor-pointer transition-all duration-300', activeSlide === (index - 1) ? 'bg-[#7dba28]' : 'bg-gray-300' ]"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MentorCard from './MentorCard.vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import api from '@/lib/axios' // API client

// Mentorlardan API orqali keladigan ro‘yxat
const mentors = ref([])

// API’dan olish funksiyasi
const fetchMentors = async () => {
  try {
    const res = await api.get('/mentors') // Laravel API route
    mentors.value = res.data.map(item => ({
      name: `${item.first_name} ${item.last_name}`,
      field: item.course?.name || '',
      education: item.education,
      experience: `${item.experience_years} yil`,
      students: `${item.students}+`,
      avatar: item.image_url.startsWith('http')
        ? item.image_url
        : `https://itparkxorazm-laravel.test/storage/${item.image_url}`,
      // 🔽 skill'larni array qilib yuboramiz
      skills: item.skills.map(s => ({
        name: s.name,
        image: s.full_image_url
      }))
    }))
  } catch (err) {
    console.error('Mentorlarni olishda xatolik:', err)
  }
}


// RESPONSIVE breakpoints
const mentorBreakpoints = {
  1280: { itemsToShow: 4 },
  1024: { itemsToShow: 2 },
  0:    { itemsToShow: 1 }
}

// Carousel funksionalliklari
const carouselRef = ref(null)
const activeSlide = ref(0)
const itemsToShow = ref(4)

const checkWindowWidth = () => {
  const width = window.innerWidth
  if (width >= 1280) itemsToShow.value = 4
  else if (width >= 1024) itemsToShow.value = 2
  else itemsToShow.value = 1
}

onMounted(() => {
  fetchMentors() // Komponent yuklanganda API chaqirish
  checkWindowWidth()
  window.addEventListener('resize', checkWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkWindowWidth)
})

const updateActiveSlide = () => {
  activeSlide.value = carouselRef.value?.currentSlide || 0
}

const dotsCount = computed(() =>
  Math.ceil(mentors.value.length / itemsToShow.value)
)
</script>
