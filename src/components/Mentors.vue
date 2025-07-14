<template>
  <div class="py-12 bg-white text-center">
    <h2 class="text-2xl font-semibold text-[#7dba28] mb-2">Bizning Mentorlar</h2>
    <p class="max-w-3xl mx-auto text-gray-900 mb-10 px-4">
      "Bizning mentorlar — o‘z sohasining yetakchi mutaxassislari. Har bir o‘quvchiga individual yondashib, amaliy va zamonaviy bilim beradi. Ular bilan kasbga aylanuvchi ko‘nikmalarni tez va samarali o‘rganasiz."
    </p>

    <Carousel
      :itemsToShow="4"
      :wrapAround="false"
      :transition="500"
      snapAlign="start"
      :breakpoints="mentorBreakpoints"
      class="w-full px-4 max-w-7xl mx-auto"
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
        <Pagination />
      </template>
    </Carousel>

    <!-- Slider dots (ko‘rinish uchun) -->
    <div class="flex justify-center mt-6 space-x-2">
      <span class="w-3 h-3 bg-[#7dba28] rounded-full"></span>
      <span class="w-3 h-3 bg-gray-300 rounded-full"></span>
      <span class="w-3 h-3 bg-gray-300 rounded-full"></span>
    </div>
  </div>
</template>

<script setup>
import MentorCard from './MentorCard.vue'
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'

const mentorBreakpoints = {
  1280: { itemsToShow: 4 },
  1024: { itemsToShow: 2 },
  0:    { itemsToShow: 1 }
}

const mentors = [
  {
    name: "Temurbek Reyimberdiyev",
    field: "Kompyuter Savodxonligi",
    education: "TATU magistr",
    experience: "3 yil",
    students: "500+",
    avatar: "../assets/images/alibek.jpg",
    skills: "word excel windows"
  },
  {
    name: "Izzatbek Mahmudjonov",
    field: "Foundation",
    education: "PDP, Self-study",
    experience: "3 yil",
    students: "300+",
    avatar: "../assets/images/alibek.jpg",
    skills: "html css js"
  },
  {
    name: "Humoyun Madrahimov",
    field: "Grafik Dizayn",
    education: "Data, Self-study",
    experience: "3 yil",
    students: "200+",
    avatar: "../assets/images/alibek.jpg",
    skills: "photoshop illustrator figma"
  },
  {
    name: "Shoxruh Abdullayev",
    field: "Frontend Dasturlash",
    education: "TATU, PDP",
    experience: "5 yil",
    students: "400+",
    avatar: "../assets/images/alibek.jpg",
    skills: "html css js react"
  },{
    name: "Azamat Masharipov  ",
    field: "Frontend Dasturlash",
    education: "TATU, PDP",
    experience: "5 yil",
    students: "400+",
    avatar: "../assets/images/alibek.jpg",
    skills: "html css js react"
  }
]
</script>
