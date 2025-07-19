<template>
  <div class="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
    <img :src="news.image" alt="news" class="w-full h-48 object-cover" />
    <div class="p-4">
      <p class="text-gray-400 text-sm mb-2">{{ news.date }}</p>
      <h3 class="text-lg font-semibold mb-2 text-gray-800">{{ news.title }}</h3>
      <p class="text-gray-600 text-sm">{{ truncatedDescription }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
    truncatedDescription() {
      const maxLength = 70
      if (!this.news.description) return ''
      return this.news.description.length > maxLength
        ? this.news.description.slice(0, maxLength) + '...'
        : this.news.description
    }
  }
}
</script>
