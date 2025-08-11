<template>
  <div :class="['space-y-2', props.className]">
    <!-- Fayl input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change.stop.prevent="handleFileSelect"
    />

    <!-- Agar rasm bor bo'lsa -->
    <div v-if="previewUrl" class="relative group">
      <div class="relative w-full h-32 border border-border rounded-lg overflow-hidden bg-muted">
        <img :src="previewUrl" alt="Preview" class="w-full h-full object-cover" />

        <div
          class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <Button
            variant="destructive"
            size="sm"
            class="absolute top-2 right-2"
            type="button"
            @click.stop.prevent="handleRemove"
          >
            <LucideX class="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            type="button"
            :disabled="isUploading"
            @click.stop.prevent="triggerFileSelect"
          >
            <LucideUpload class="h-4 w-4 mr-2" />
            O'zgartirish
          </Button>
        </div>
      </div>
    </div>

    <!-- Agar rasm yo'q bo'lsa -->
    <Button
      v-else
      variant="outline"
      type="button"
      class="w-full h-32 border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2"
      :disabled="isUploading"
      @click.stop.prevent="triggerFileSelect"
    >
      <template v-if="isUploading">
        <div class="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
        <span>Yuklanmoqda...</span>
      </template>
      <template v-else>
        <LucideImage class="h-8 w-8 text-muted-foreground" />
        <span>{{ props.placeholder }}</span>
        <span class="text-xs text-muted-foreground">PNG, JPG, JPEG (max 5MB)</span>
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { Button } from '@/admin/components/ui/button'
import { LucideUpload, LucideX, LucideImage } from 'lucide-vue-next'

interface Props {
  value?: string | File
  placeholder?: string
  className?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:value', file: File | null): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const previewUrl = ref<string | null>(null)
const createdBlobUrl = ref<string | null>(null)

// Blob URLni tozalash
function revokeBlobUrl() {
  if (createdBlobUrl.value) {
    URL.revokeObjectURL(createdBlobUrl.value)
    createdBlobUrl.value = null
  }
}

watch(
  () => props.value,
  (newVal) => {
    revokeBlobUrl()
    if (typeof newVal === 'string') {
      previewUrl.value = newVal || null
    } else if (newVal instanceof File) {
      const blobUrl = URL.createObjectURL(newVal)
      previewUrl.value = blobUrl
      createdBlobUrl.value = blobUrl
    } else {
      previewUrl.value = null
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  revokeBlobUrl()
})

const triggerFileSelect = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Iltimos, rasm fayli tanlang')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("Rasm hajmi 5MB dan kichik bo'lishi kerak")
    return
  }

  isUploading.value = true
  emit('update:value', file)
  isUploading.value = false
}

const handleRemove = () => {
  revokeBlobUrl()
  previewUrl.value = null
  emit('update:value', null)
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
