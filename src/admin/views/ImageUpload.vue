<template>
  <div :class="`space-y-2 ${className}`">
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="onFileChange"
    />

    <div v-if="previewUrl" class="relative group">
      <div class="relative w-full h-32 border border-border rounded-lg overflow-hidden bg-muted">
        <img :src="previewUrl" alt="Preview" class="w-full h-full object-cover" />

        <div
          class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <Button
            type="button"
            variant="destructive"
            size="sm"
            class="absolute top-2 right-2"
            @click="handleRemove"
          >
            <X class="h-4 w-4" />
          </Button>

          <div class="flex gap-2">
            <Button type="button" variant="secondary" size="sm" @click="triggerFile" :disabled="isUploading">
              <Upload class="h-4 w-4 mr-2" />
              O'zgartirish
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <Button
        type="button"
        variant="outline"
        @click="triggerFile"
        :disabled="isUploading"
        class="w-full h-32 border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2"
      >
        <template v-if="isUploading">
          <div class="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
          <span>Yuklanmoqda...</span>
        </template>
        <template v-else>
          <Image class="h-8 w-8 text-muted-foreground" />
          <span>{{ placeholder }}</span>
          <span class="text-xs text-muted-foreground">PNG, JPG, JPEG (max 5MB)</span>
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import type { PropType } from 'vue'
import { Button } from '@/admin/components/ui/button'
import { Upload, X, Image } from 'lucide-vue-next'

const props = defineProps({
  value: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  placeholder: {
    type: String as PropType<string>,
    default: 'Rasm yuklash',
  },
  className: {
    type: String as PropType<string>,
    default: '',
  },
})

// emits: change => File | string (url) | ''
const emit = defineEmits<{
  (e: 'change', payload: File | string | null): void
  (e: 'update:value', payload: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const previewUrl = ref<string | null>(props.value || null)
let objectUrlToRevoke: string | null = null

// Keep previewUrl in sync if parent changes `value` (existing image url)
watch(
  () => props.value,
  (newVal) => {
    if (!newVal) {
      previewUrl.value = null
    } else {
      previewUrl.value = newVal
    }
  }
)

onUnmounted(() => {
  if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke)
})

const triggerFile = () => {
  fileInput.value?.click()
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // Validate type
  if (!file.type.startsWith('image/')) {
    // you can replace alert with a nicer Toast from shadcn
    alert('Iltimos, rasm fayli tanlang')
    target.value = ''
    return
  }

  // Validate size (5MB)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    alert("Rasm hajmi 5MB dan kichik bo'lishi kerak")
    target.value = ''
    return
  }

  isUploading.value = true

  // Create object URL for fast preview
  if (objectUrlToRevoke) {
    URL.revokeObjectURL(objectUrlToRevoke)
    objectUrlToRevoke = null
  }
  const url = URL.createObjectURL(file)
  objectUrlToRevoke = url
  previewUrl.value = url

  // Emit File to parent so it can append to FormData
  // Also emit update:value with preview URL (optional)
  emit('change', file)
  emit('update:value', url)

  // Simulate upload delay if you want to show spinner; remove if not needed
  setTimeout(() => {
    isUploading.value = false
  }, 700)
}

const handleRemove = () => {
  if (objectUrlToRevoke) {
    URL.revokeObjectURL(objectUrlToRevoke)
    objectUrlToRevoke = null
  }
  previewUrl.value = null
  if (fileInput.value) fileInput.value.value = ''
  emit('change', null)
  emit('update:value', '')
}
</script>
