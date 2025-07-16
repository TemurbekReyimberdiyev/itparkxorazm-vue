<template>
  <section id="courses" class="p-8 max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold text-[#7dba28] mb-8 text-center">O‘quv dasturlari</h2>

    <!-- Filter buttons -->
    <div class="flex flex-wrap justify-center gap-6 mb-10">
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">IT & Dasturlash</button>
      <button class="px-4 py-2 rounded-full border border-[#7dba28] bg-green-50 text-sm text-[#7dba28]">Media & Dizayn</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Marketing</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Xorijiy tillar</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Robototexnika</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">IT Matematika</button>
    </div>

    <!-- Carousel -->
    <Carousel
      ref="carouselRef"
      :itemsToShow="itemsToShow"
      :wrapAround="false"
      :transition="500"
      snapAlign="start"
      :breakpoints="carouselBreakpoints"
      class="w-full"
      @slide-end="updateActiveSlide"
    >
      <Slide
        v-for="(course, index) in courses"
        :key="index"
      >
        <div class="px-2 w-full" @click="openModal(course)">
          <CourseCard :course="course" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>

    <!-- Custom Dots -->
    <div class="flex justify-center gap-2 mt-10">
      <span
        v-for="index in dotsCount"
        :key="'dot-' + index"
        @click="() => { carouselRef.value.slideTo(index - 1); updateActiveSlide() }"
        :class="[ 
          'w-3 h-3 rounded-full cursor-pointer transition-all duration-300',
          activeSlide === (index - 1) ? 'bg-[#7dba28]' : 'bg-gray-300'
        ]"
      ></span>
    </div>

    <!-- Ba’tafsil tugmasi
    <div class="flex justify-center mt-6">
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
    </div> -->

    <!-- Modal (Course details) -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      @click.self="closeModal"
    >
      <div
        class="bg-white w-[90%] max-w-2xl p-6 rounded-2xl shadow-xl relative transform transition-all duration-300"
        :class="modalAnimation"
      >
        <!-- Yopish tugmasi -->
        <button @click="closeModal" class="absolute top-3 right-4 text-gray-600 text-2xl hover:text-red-600">&times;</button>

        <!-- Modal kontent -->
        <img :src="selectedCourse.image" class="w-full h-60 object-cover rounded-xl mb-4" />
        <p class="text-sm text-gray-500">{{ selectedCourse.duration }} | {{ selectedCourse.category }}</p>
        <h2 class="text-2xl font-bold mt-2 mb-4">{{ selectedCourse.title }}</h2>
        <p class="text-gray-700 mb-4">{{ selectedCourse.description }}</p>
        <div class="flex items-center gap-4">
          <img :src="selectedCourse.mentorImage" class="w-12 h-12 rounded-full object-cover" />
          <div>
            <p class="font-semibold">{{ selectedCourse.mentorName }}</p>
            <p class="text-sm text-gray-500">{{ selectedCourse.experience }} tajriba</p>
          </div>
          <div class="ml-auto font-bold text-[#7dba28]">{{ selectedCourse.price }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import CourseCard from '../components/CourseCard.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

// Responsive
const itemsToShow = ref(3)
const checkWindowWidth = () => {
  const width = window.innerWidth
  if (width >= 1280) itemsToShow.value = 3
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

// Carousel state
const carouselRef = ref(null)
const activeSlide = ref(0)
const updateActiveSlide = () => {
  activeSlide.value = carouselRef.value?.currentSlide || 0
}

// Kurslar
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
    description: 'Telefon orqali sifatli va kreativ videolar surating.',
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
    description: 'Vue, React va Tailwind o‘rganib, web dasturchi bo‘ling.',
    mentorImage: '../assets/images/mentor.jpg',
    mentorName: 'Ali Akbar',
    experience: '5-yil',
    price: '$100'
  }
]

// Dots count
const dotsCount = computed(() =>
  Math.ceil(courses.length / itemsToShow.value)
)

// Modal logic
const showModal = ref(false)
const selectedCourse = ref({})
const modalAnimation = ref('scale-0')

const openModal = (course) => {
  selectedCourse.value = course
  showModal.value = true
  setTimeout(() => {
    modalAnimation.value = 'scale-100'
  }, 10)
}

const closeModal = () => {
  modalAnimation.value = 'scale-0'
  setTimeout(() => {
    showModal.value = false
  }, 200)
}
</script>

<style scoped>
.scale-0 {
  transform: scale(0);
  opacity: 0;
  transition: all 0.3s ease-in-out;
}
.scale-100 {
  transform: scale(1);
  opacity: 1;
  transition: all 0.3s ease-in-out;
}
</style>
