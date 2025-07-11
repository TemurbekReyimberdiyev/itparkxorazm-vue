<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">

      <!-- Sarlavha va navigatsiya -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-[#7dba28]">Matbuot markazi</h2>
        <div class="flex gap-2">
          <button class="w-10 h-10 border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-100">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button class="w-10 h-10 border border-[#7dba28] bg-[#7dba28] rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Yangilik kartalari -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NewsCard
          v-for="(news, index) in newsList"
          :key="index"
          :news="news"
        />
      </div>

      <!-- Barcha yangiliklar tugmasi -->
      <div class="mt-8 flex justify-start">
        <button class="px-5 py-3 border border-[#7dba28] text-[#7dba28] rounded-full flex items-center gap-2 hover:bg-[#7dba28] hover:text-white transition">
          Barcha yangiliklar
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  </section>
</template>

<script>
import NewsCard from '../components/NewsCard.vue'

export default {
  name: 'News',
  components: { NewsCard },
  data() {
    return {
      newsList: [
        {
          image: '/images/news1.jpg',
          date: '11 Iyun 2025',
          title: 'O‘zaro manfaatli hamkorlik – AloqaBank va CDB uchrashuvi',
          description: '',
        },
        {
          image: '/images/news2.jpg',
          date: '4 Iyun 2025',
          title: 'Yangi avlod tadbirlari: Parrandachilikni rivojlantirish yo‘li',
          description: '',
        },
        {
          image: '/images/news3.jpg',
          date: '3 Iyun 2025',
          title: 'AloqaBank Mahalla bankilari – moliyaviy ishonchli yordamchingiz!',
          description: '',
        },
      ],
    }
  }
}
</script>
