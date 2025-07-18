<template>
  <section id="courses" class="p-8 max-w-7xl mx-auto px-10">
    <h2 class="text-4xl font-bold text-[#7dba28] mb-8 text-center">O‘quv dasturlari</h2>

    <!-- Mobil versiyada dropdown menyu -->
    <div class="relative block md:hidden text-right mb-6">
      <button @click="toggleDropdown" class="px-4 py-2 bg-[#7dba28] text-white rounded-md shadow-md">
        {{ selectedFilter }} <span class="ml-2">▼</span>
      </button>
      <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
        <ul>
          <li
            v-for="filter in filters"
            :key="filter"
            @click="selectFilter(filter)"
            class="px-4 py-2 hover:bg-green-50 cursor-pointer"
          >
            {{ filter }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Desktop versiyada filter tugmalar -->
    <div class="hidden md:flex flex-wrap justify-center gap-6 mb-10">
      <button
        v-for="filter in filters"
        :key="filter"
        class="px-4 py-2 rounded-full border text-sm"
        :class="{
          'border-[#7dba28] bg-green-50 text-[#7dba28]': selectedFilter === filter,
          'border-gray-300 hover:bg-green-50': selectedFilter !== filter
        }"
        @click="selectFilter(filter)"
      >
        {{ filter }}
      </button>
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
        v-for="(course, index) in filteredCourses"
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
        <button @click="closeModal" class="absolute top-3 right-4 text-gray-600 text-2xl hover:text-red-600">&times;</button>

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

// Filterlar
const filters = [
  'IT & Dasturlash',
  'Media & Dizayn',
  'Marketing',
  'Xorijiy tillar',
  'Robototexnika',
  'IT Matematika'
]

const selectedFilter = ref('Media & Dizayn')
const dropdownOpen = ref(false)
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}
const selectFilter = (filter) => {
  selectedFilter.value = filter
  dropdownOpen.value = false
}

// Responsive carousel
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

// Kurslar ro'yxati
const courses = [
  {
    image: '../assets/images/graphic.png',
    duration: '3 oy',
    category: 'Media & Dizayn',
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
    category: 'Media & Dizayn',
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
    category: 'Media & Dizayn',
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
    category: 'IT & Dasturlash',
    title: 'Frontend',
    description: 'Vue, React va Tailwind o‘rganib, web dasturchi bo‘ling.',
    mentorImage: '../assets/images/mentor.jpg',
    mentorName: 'Ali Akbar',
    experience: '5-yil',
    price: '$100'
  }
]

// Filter qilingan kurslar
const filteredCourses = computed(() =>
  courses.filter(course => course.category === selectedFilter.value)
)

// Dots
const dotsCount = computed(() =>
  Math.ceil(filteredCourses.value.length / itemsToShow.value)
)

// Modal
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
