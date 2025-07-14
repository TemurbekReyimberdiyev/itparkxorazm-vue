<template>
  <section class="p-8 max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold text-[#7dba28] mb-8 text-center">O‘quv dasturlari</h2>

    <!-- Filter buttons -->
    <div class="flex flex-wrap justify-center gap-6 mb-10">
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">IT & Dasturlash</button>
      <button class="px-4 py-2 rounded-full border border-[#7dba28] bg-green-50 text-sm text-[#7dba28]">Media & Dizayn</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Marketing</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Marketing</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Xorijiy tillar</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Robototexnika</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">IT Matematika</button>
    </div>

    <!-- Carousel -->
    <Carousel
      :itemsToShow="3"
      :wrapAround="false"
      :transition="500"
      snapAlign="start"
      :breakpoints="carouselBreakpoints"
      class="w-full"
    >
      <Slide
        v-for="(course, index) in courses"
        :key="index"
      >
        <div class="px-2 w-full">
          <CourseCard :course="course" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

    <!-- Dots va batafsil tugma -->
    <div class="flex flex-col items-center mt-10 space-y-4">
      <div class="flex gap-2">
        <span class="w-3 h-3 rounded-full bg-[#7dba28]"></span>
        <span class="w-3 h-3 rounded-full bg-gray-300"></span>
        <span class="w-3 h-3 rounded-full bg-gray-300"></span>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 border border-[#7dba28] text-[#7dba28] rounded-full text-sm font-medium">
        Ba’tafsil
        <span class="bg-[#7dba28] text-white rounded-full p-1">
          <svg class="w-4 h-4 transform -rotate-45" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
        </span>
      </button>
    </div>
  </section>
</template>

<script setup>
import CourseCard from '../components/CourseCard.vue'
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'

const carouselBreakpoints = {
  1280: { itemsToShow: 3 },
  1024: { itemsToShow: 2 },
  0:    { itemsToShow: 1 }
}

const courses = [
  {
    image: '../assets/images/graphic.png',
    duration: '3 oy',
    category: 'Design',
    title: 'Grafik dizayn',
    description: 'Figma va grafik dizaynni o‘rganib, UI/UX sohasida ish toping.',
    mentorImage: '../assets/images/humoyun.jpg',
    mentorName: 'Madraximov Humoyun',
    experience: '3-yil',
    price: '$50'
  },
  {
    image: '../assets/images/video.jpg',
    duration: '3 oy',
    category: 'Design',
    title: 'Video montaj',
    description: 'Video montaj asoslarini o‘rganib, kreativ videolar va kontent yarating.',
    mentorImage: '../assets/images/doston.jpg',
    mentorName: 'Djumayev Doston',
    experience: '15-yil',
    price: '$70'
  },
  {
    image: '../assets/images/mobilography.jpg',
    duration: '2 oy',
    category: 'Design',
    title: 'Mobilografiya',
    description: 'Mobilografiya asoslarini o‘rganib, telefon orqali sifatli va kreativ videolar surating.',
    mentorImage: '../assets/images/alibek.jpg',
    mentorName: 'Madraximov Alibek',
    experience: '1-yil',
    price: '$80'
  },
  {
    image: '../assets/images/web.png',
    duration: '4 oy',
    category: 'IT',
    title: 'Frontend',
    description: 'Vue, React va Tailwind asoslarini o‘rganib, web dasturchi bo‘ling.',
    mentorImage: '../assets/images/mentor.jpg',
    mentorName: 'Ali Akbar',
    experience: '5-yil',
    price: '$100'
  }
]
</script>
