<template>
  <section id="courses" class="max-w-7xl mx-auto px-4 sm:px-10">
    <!-- Sarlavha -->
    <h2 class="text-2xl sm:text-4xl font-bold text-[#7dba28] mb-8 text-center">O‘quv dasturlari</h2>

    <!-- Mobile dropdown -->
    <div ref="dropdownRef" class="relative block md:hidden text-right mb-6">
      <button
        @click="toggleDropdown"
        class="px-4 py-2 bg-[#7dba28] text-white rounded-md shadow-md flex items-center justify-between w-full"
      >
        <span>{{ selectedFilter }}</span>
        <ChevronDownIcon class="w-5 h-5 ml-2" />
      </button>
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50"
      >
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

    <!-- Desktop filter buttons -->
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
      <Slide v-for="(course, index) in filteredCourses" :key="index">
        <div class="px-2 w-full" @click="openModal(course)">
          <CourseCard :course="course" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>

    <!-- Custom dots -->
    <div class="flex justify-center gap-2 mt-10">
      <span
        v-for="index in dotsCount"
        :key="'dot-' + index"
        @click="goToSlide(index - 1)"
        :class="[
          'w-3 h-3 rounded-full cursor-pointer transition-all duration-300',
          activeSlide === index - 1 ? 'bg-[#7dba28]' : 'bg-gray-300'
        ]"
      ></span>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <div
        class="bg-white w-[90%] max-w-2xl p-6 rounded-2xl shadow-xl relative transform transition-all duration-300 origin-center"
        :class="modalAnimation"
      >
        <button
          @click="closeModal"
          class="absolute top-3 right-4 text-gray-600 text-2xl hover:text-red-600"
        >
          &times;
        </button>

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
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import CourseCard from '../components/CourseCard.vue'
import { ChevronDownIcon } from 'lucide-vue-next'
import 'vue3-carousel/dist/carousel.css'

// Assetlar
import imgGraphic from '../assets/images/graphic.png'
import imgHumoyun from '../assets/images/graphic.png'
import imgVideo from '../assets/images/graphic.png'
import imgDoston from '../assets/images/graphic.png'
import imgMobilography from '../assets/images/graphic.png'
import imgAlibek from '../assets/images/graphic.png'
import imgWeb from '../assets/images/graphic.png'
import imgMentor from '../assets/images/graphic.png'

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
const dropdownRef = ref(null)

const toggleDropdown = () => (dropdownOpen.value = !dropdownOpen.value)
const selectFilter = (filter) => {
  selectedFilter.value = filter
  dropdownOpen.value = false
  updateActiveSlide()
}

// Tashqariga bosilganda dropdownni yopish
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}
onMounted(() => window.addEventListener('click', handleClickOutside))
onUnmounted(() => window.removeEventListener('click', handleClickOutside))

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

const carouselBreakpoints = {
  0: { itemsToShow: 1 },
  768: { itemsToShow: 2 },
  1280: { itemsToShow: 3 }
}

const carouselRef = ref(null)
const activeSlide = ref(0)
const updateActiveSlide = () => {
  activeSlide.value = carouselRef.value?.currentSlide ?? 0
}
const goToSlide = (i) => {
  carouselRef.value?.slideTo(i)
  activeSlide.value = i
}

const courses = [
  {
    image: imgGraphic,
    duration: '3 oy',
    category: 'Media & Dizayn',
    title: 'Grafik dizayn',
    description: 'Figma va grafik dizaynni o‘rganib, UI/UX sohasida ish toping.',
    mentorImage: imgHumoyun,
    mentorName: 'Madraximov Humoyun',
    experience: '3-yil',
    price: '$50'
  },
  {
    image: imgVideo,
    duration: '3 oy',
    category: 'Media & Dizayn',
    title: 'Video montaj',
    description: 'Video montaj asoslarini o‘rganib, kreativ videolar va kontent yarating.',
    mentorImage: imgDoston,
    mentorName: 'Djumayev Doston',
    experience: '15-yil',
    price: '$70'
  },
  {
    image: imgMobilography,
    duration: '2 oy',
    category: 'Media & Dizayn',
    title: 'Mobilografiya',
    description: 'Telefon orqali sifatli va kreativ videolar surating.',
    mentorImage: imgAlibek,
    mentorName: 'Madraximov Alibek',
    experience: '1-yil',
    price: '$80'
  },
  {
    image: imgWeb,
    duration: '4 oy',
    category: 'IT & Dasturlash',
    title: 'Frontend',
    description: 'Vue, React va Tailwind o‘rganib, web dasturchi bo‘ling.',
    mentorImage: imgMentor,
    mentorName: 'Ali Akbar',
    experience: '5-yil',
    price: '$100'
  }
]

const filteredCourses = computed(() =>
  courses.filter((course) => course.category === selectedFilter.value)
)

const dotsCount = computed(() => {
  const len = filteredCourses.value.length
  return len ? Math.ceil(len / itemsToShow.value) : 0
})

const showModal = ref(false)
const selectedCourse = ref({})
const modalAnimation = ref('modal-scale-0')

const openModal = (course) => {
  selectedCourse.value = course
  showModal.value = true
  requestAnimationFrame(() => {
    modalAnimation.value = 'modal-scale-100'
  })
}
const closeModal = () => {
  modalAnimation.value = 'modal-scale-0'
  setTimeout(() => {
    showModal.value = false
  }, 200)
}
</script>

<style scoped>
.modal-scale-0 {
  transform: scale(0.95);
  opacity: 0;
  transition: all 0.2s ease-in-out;
}
.modal-scale-100 {
  transform: scale(1);
  opacity: 1;
  transition: all 0.2s ease-in-out;
}
</style>
