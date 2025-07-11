<template>
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
    <div class="relative">
      <img :src="course.image" :alt="course.title" class="w-full h-48 object-cover" />
      <span class="absolute top-2 right-2 bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">{{ course.duration }}</span>
    </div>
    <div class="p-5 space-y-2">
      <span class="text-[#7dba28] text-xs font-semibold">{{ course.category }}</span>
      <h3 class="text-lg font-bold text-gray-900">{{ course.title }}</h3>
      <p class="text-gray-900 text-sm">{{ course.description }}</p>
      <div class="flex items-center justify-between mt-4">
        <div class="flex items-center gap-2">
          <img :src="course.mentorImage" :alt="course.mentorName" class="w-8 h-8 rounded-full object-cover" />
          <div class="text-xs text-gray-900">
            {{ course.mentorName }} <br />
            <span class="text-gray-500">{{ course.experience }}</span>
          </div>
        </div>
        <div class="text-[#7dba28] font-bold text-base">{{ course.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})
</script>
