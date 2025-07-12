<template>
  <div ref="dropdownRef" class="relative inline-block text-left min-w-[110px]">
    <div
      @click="toggleDropdown"
      class="flex items-center space-x-1 cursor-pointer text-sm text-gray-800 font-semibold px-3 py-2 rounded transition"
    >
      <img :src="selectedLanguage.flag" alt="flag" class="w-5 h-5 rounded-full" />
      <span>{{ selectedLanguage.label }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200"
           :class="{ 'rotate-180': isOpen }"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown menyu -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-0 w-full bg-white border border-gray-200 rounded shadow z-10"
    >
      <div
        v-for="(lang, index) in otherLanguages"
        :key="index"
        @click="selectLanguage(lang)"
        class="flex items-center space-x-2 px-3 py-2 text-gray-800 text-sm font-semibold cursor-pointer hover:bg-gray-100"
      >
        <img :src="lang.flag" alt="flag" class="w-5 h-5 rounded-full" />
        <span>{{ lang.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Tillar
const languages = [
  { label: 'O‘ZB', flag: new URL('../assets/images/uzb.png', import.meta.url).href },
  { label: 'RUS',  flag: new URL('../assets/images/rus.png', import.meta.url).href }
]

const selectedLanguage = ref(languages[0])

const isOpen = ref(false)

const otherLanguages = computed(() =>
  languages.filter(lang => lang.label !== selectedLanguage.value.label)
)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (lang) => {
  selectedLanguage.value = lang
  isOpen.value = false
}

const dropdownRef = ref(null)

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>
