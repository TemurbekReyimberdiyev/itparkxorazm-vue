<template>
  <div class="rounded-2xl overflow-hidden bg-white shadow-sm">
    <img :src="news.image" alt="news" class="w-full h-48 object-cover">
    <div class="p-4">
      <p class="text-gray-400 text-sm mb-2">{{ news.date }}</p>
      <h3 class="text-lg font-semibold mb-2">{{ news.title }}</h3>
      <p class="text-gray-600 text-sm">{{ news.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    news: Object
  }
}
</script>