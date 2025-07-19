<template>
  <div class="bg-white shadow-md rounded-lg p-5 flex flex-col items-center text-center">
    <img :src="avatar" alt="mentor" class="w-20 h-20 rounded-full object-cover mb-4" />
    <h3 class="text-lg font-semibold text-gray-800">{{ name }}</h3>
    <p class="text-[#7dba28] text-sm font-medium mb-2">{{ field }}</p>
    <p class="text-sm text-gray-600">Ta’lim: {{ education }}</p>
    <p class="text-sm text-gray-600">Tajriba: {{ experience }}</p>
    <p class="text-sm text-gray-600 mb-4">O‘quvchilar: {{ students }}</p>
    <div class="flex gap-3 justify-center">
      <img
        v-for="icon in skillsArray"
        :key="icon"
        :src="getIconPath(icon)"
        :alt="icon"
        class="w-6 h-6"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  name: String,
  field: String,
  education: String,
  experience: String,
  students: String,
  avatar: String,
  skills: String
})

// skill iconlarini stringdan massivga aylantiramiz
const skillsArray = computed(() => props.skills.split(' '))

// dinamik import orqali rasm manzilini berish
const getIconPath = (icon) => {
  return new URL(`./icons/${icon}.svg`, import.meta.url).href
}
</script>
