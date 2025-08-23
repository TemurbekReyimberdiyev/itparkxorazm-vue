<template>
  <section id="news" class="py-12 bg-white max-w-7xl mx-auto px-10">
    <div class="container">

      <!-- Sarlavha va navigatsiya -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-[#7dba28]">Matbuot markazi</h2>
        <div class="flex gap-2">
          <button
            @click="prev"
            class="w-10 h-10 border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-100"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="next"
            class="w-10 h-10 border border-[#7dba28] bg-[#7dba28] rounded-xl flex items-center justify-center"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Carousel -->
      <Carousel
        ref="newsCarousel"
        :itemsToShow="3"
        :wrapAround="false"
        :transition="500"
        snapAlign="start"
        :mouseDrag="true"
        :touchDrag="true"
        :keyboard="true"
        :breakpoints="carouselBreakpoints"
        class="w-full"
      >
        <Slide v-for="(news, index) in newsList" :key="index">
          <div class="px-2 w-full cursor-pointer" @click="openModal(news)">
            <NewsCard :news="news" />
          </div>
        </Slide>
      </Carousel>

      <!-- Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        @click.self="closeModal"
      >
        <div
          class="bg-white w-[90%] max-w-2xl p-6 rounded-2xl shadow-xl relative transform transition-all duration-300"
          :class="modalAnimation"
        >
          <button
            @click="closeModal"
            class="absolute top-3 right-4 text-gray-600 text-2xl hover:text-red-600"
          >&times;</button>

          <!-- Modal kontent -->
          <img :src="selectedNews.image" class="w-full h-60 object-cover rounded-xl mb-4" />
          <p class="text-sm text-gray-500">{{ selectedNews.date }}</p>
          <h2 class="text-2xl font-bold mb-2">{{ selectedNews.title }}</h2>
          <p class="text-gray-700">{{ selectedNews.description || 'Batafsil maʼlumot tez orada qo‘shiladi.' }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import NewsCard from '../components/NewsCard.vue'
import api from '@/lib/axios' // API client

// Carousel boshqaruvi
const newsCarousel = ref(null)
const next = () => newsCarousel.value?.next()
const prev = () => newsCarousel.value?.prev()

const carouselBreakpoints = {
  1280: { itemsToShow: 3 },
  1024: { itemsToShow: 2 },
  0:    { itemsToShow: 1 }
}

// API dan keladigan yangiliklar ro‘yxati
const newsList = ref([])


// Ma’lumotni API’dan olish
const fetchNews = async () => {
  try {
    const res = await api.get('/news') // Laravel route: Route::get('/news', ...)
    newsList.value = res.data.map(item => ({
      image: item.full_image_url,
      date: new Date(item.created_at).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: item.heading,
      description: item.description
    }))
  } catch (error) {
    console.error('Yangiliklarni olishda xatolik:', error)
  }
}

// Modal holati
const showModal = ref(false)
const selectedNews = ref({})
const modalAnimation = ref('scale-0')

const openModal = (news) => {
  selectedNews.value = news
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

// Komponent yuklanganda yangiliklarni olish
onMounted(fetchNews)
</script>