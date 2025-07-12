<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <button
      ref="buttonRef"
      @click="toggleDropdown"
      class="bg-[#7dba28] font-semibold hover:bg-[#689a23] text-white px-4 py-2 rounded text-sm flex items-center space-x-1"
    >
      <span>{{ selectedNumber }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10"
      :style="{ width: dropdownWidth }"
    >
      <a
        v-for="(number, index) in phoneNumbers"
        :key="index"
        :href="`tel:${number.tel}`"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        @click="closeDropdown"
      >
        {{ number.display }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const selectedNumber = ref('+998 99 053 11 99')

const phoneNumbers = [
  { display: '+998 99 053 11 99', tel: '+998990531199' },
  { display: '+998 93 150 11 99', tel: '+998931501199' },
]

// Dropdown ochish-yopish
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Dropdown'ni yopish
const closeDropdown = () => {
  isOpen.value = false
}

// Tugma va dropdown uchun ref lar
const dropdownRef = ref(null)
const buttonRef = ref(null)
const dropdownWidth = ref('auto')

// Tashqi klikni tutish
const handleClickOutside = (event) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    isOpen.value = false
  }
}

// Tugma kengligini olish
const setDropdownWidth = () => {
  if (buttonRef.value) {
    dropdownWidth.value = `${buttonRef.value.offsetWidth}px`
  }
}

onMounted(() => {
  setDropdownWidth()
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', setDropdownWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', setDropdownWidth)
})
</script>
