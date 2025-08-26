<template>
  <div class="bg-white shadow-md rounded-lg p-5 flex flex-col items-center text-center">
    <img :src="avatar" alt="mentor" class="w-20 h-20 rounded-full object-cover mb-4" />
    
    <h3 class="text-lg font-semibold text-gray-800">{{ name }}</h3>
    <p class="text-[#7dba28] text-sm font-medium mb-2">{{ field }}</p>
    <p class="text-sm text-gray-600">Ta’lim: {{ education }}</p>
    <p class="text-sm text-gray-600">Tajriba: {{ experience }}</p>
    <p class="text-sm text-gray-600 mb-4">O‘quvchilar: {{ students }}</p>

    <!-- 🔽 Skill'lar ro'yxati -->
    <div class="flex gap-3 justify-center flex-wrap">
      <div 
        v-for="(skill, i) in skills" 
        :key="i" 
        class="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full shadow-sm"
      >
        <img
          :src="skill.image"
          :alt="skill.name"
          class="w-6 h-6 rounded-full object-cover"
        />
        <!-- <span class="text-sm text-gray-700">{{ skill.name }}</span> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  field: String,
  education: String,
  experience: String,
  students: String,
  avatar: String,
  // 🔽 skills endi massiv bo‘lishi kerak
  skills: {
    type: Array,
    default: () => []
  }
})
</script>
