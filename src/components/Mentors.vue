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

// ✅ RASMLARNI IMPORT QILISH
import imgAlibek from '../assets/images/alibek.jpg'
import imgIzzatbek from '../assets/images/alibek.jpg'
import imgHumoyun from '../assets/images/alibek.jpg'
import imgShoxruh from '../assets/images/alibek.jpg'
import imgAzamat from '../assets/images/alibek.jpg'

// ✅ MENTOR MA’LUMOTLARI
const mentors = [
  {
    name: "Temurbek Reyimberdiyev",
    field: "Kompyuter Savodxonligi",
    education: "TATU magistr",
    experience: "3 yil",
    students: "500+",
    avatar: imgAlibek,
    skills: "word excel windows"
  },
  {
    name: "Izzatbek Mahmudjonov",
    field: "Foundation",
    education: "PDP, Self-study",
    experience: "3 yil",
    students: "300+",
    avatar: imgIzzatbek,
    skills: "html css js"
  },
  {
    name: "Humoyun Madrahimov",
    field: "Grafik Dizayn",
    education: "Data, Self-study",
    experience: "3 yil",
    students: "200+",
    avatar: imgHumoyun,
    skills: "photoshop illustrator figma"
  },
  {
    name: "Shoxruh Abdullayev",
    field: "Frontend Dasturlash",
    education: "TATU, PDP",
    experience: "5 yil",
    students: "400+",
    avatar: imgShoxruh,
    skills: "html css js react"
  },
  {
    name: "Azamat Masharipov",
    field: "Frontend Dasturlash",
    education: "TATU, PDP",
    experience: "5 yil",
    students: "400+",
    avatar: imgAzamat,
    skills: "html css js vue"
  }
]

// ✅ RESPONSIVE UCHUN BREAKPOINTLAR
const mentorBreakpoints = {
  1280: { itemsToShow: 4 },
  1024: { itemsToShow: 2 },
  0:    { itemsToShow: 1 }
}

// ✅ QOLGAN FUNKTSIONAL QISMLAR
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
  Math.ceil(mentors.length / itemsToShow.value)
)
</script>
