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

const filters = ref([])
const selectedFilter = ref('')
const dropdownOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => (dropdownOpen.value = !dropdownOpen.value)
const selectFilter = (filter) => {
  selectedFilter.value = filter
  dropdownOpen.value = false
  updateActiveSlide()
}

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

const courses = ref([])

const filteredCourses = computed(() =>
  courses.value.filter((course) => course.category === selectedFilter.value)
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

// API dan ma’lumot olish
const fetchCourses = async () => {
  try {
    const res = await fetch('https://itparkxorazm-laravel.test/api/courses')
    const data = await res.json()

    // Ma'lumotlarni formatlash
    courses.value = data.map(c => ({
      id: c.id,
      title: c.name,
      description: c.heading,
      duration: c.duration || '',
      category: c.category?.name || '',
      image: c.image_url?.startsWith('http') ? c.image_url : `https://itparkxorazm-laravel.test/storage/${c.image_url}`,
      mentorName: c.mentor?.name || '',
      mentorImage: c.mentor?.image_url?.startsWith('http') ? c.mentor.image_url : `https://itparkxorazm-laravel.test/storage/${c.mentor?.image_url}`,
      experience: c.mentor?.experience || '',
      price: c.price || ''
    }))

    // Kategoriyalar
    filters.value = [...new Set(courses.value.map(c => c.category))]
    selectedFilter.value = filters.value[0] || ''
  } catch (err) {
    console.error('API error:', err)
  }
}

onMounted(fetchCourses)
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
