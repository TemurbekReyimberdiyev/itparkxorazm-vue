<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Yangiliklar</h1>
        <p class="text-muted-foreground">O'quv markazi yangiliklarini boshqaring</p>
      </div>
      <Dialog :open="isDialogOpen" @update:open="val => isDialogOpen = val">
        <!-- <DialogTrigger as="div"> -->
          <Button @click="openNewDialog">
            <Plus class="w-4 h-4 mr-2" /> Yangi Xabar
          </Button>
        <!-- </DialogTrigger> -->
        <DialogContent class="w-full max-w-2xl">
  <div class="max-h-[80vh] overflow-y-auto space-y-4 px-1">
    <DialogHeader>
      <DialogTitle>{{ editingNews ? 'Xabarni Tahrirlash' : 'Yangi Xabar Qo\'shish' }}</DialogTitle>
    </DialogHeader>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <label>Sarlavha</label>
        <Input v-model="formData.heading" placeholder="Xabar sarlavhasini kiriting" required />
      </div>
      <div class="space-y-2">
        <label>Matn</label>
        <Textarea v-model="formData.description" rows="5" placeholder="Xabar matnini kiriting" required />
      </div>
      <div class="space-y-2">
        <label>Yangilik rasmi</label>
        <ImageUpload
  v-model="formData.image"
  placeholder="Yangilik rasmini yuklang"
/>
        <!-- <p class="text-sm text-muted-foreground">Bo'sh qoldiring, default rasm ishlatiladi</p> -->
      </div>
      <div v-if="formData.heading || formData.description" class="space-y-2">
  <label>Preview</label>
  <div class="border rounded-lg p-4 space-y-3">
    <img :src="previewImage" alt="Preview" class="w-full max-h-48 rounded object-cover" />
    <div>
      <h4>{{ formData.heading || 'Sarlavha' }}</h4>
      <p class="text-sm text-muted-foreground mt-2">{{ previewDescription }}</p>
    </div>
  </div>
</div>
      <div class="flex justify-end gap-2">
        <Button variant="outline" type="button" @click="isDialogOpen = false">Bekor qilish</Button>
        <Button type="submit">{{ editingNews ? 'Saqlash' : 'Qo\'shish' }}</Button>
      </div>
    </form>
  </div>
</DialogContent>
      </Dialog>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <StatCard title="Jami Yangiliklar" :value="newsData.length" icon="Calendar" color="blue" />
      <StatCard title="Bu Hafta" :value="recentNewsCount" icon="TrendingUp" color="green" />
      <StatCard title="So'ngi Xabar" :value="latestDate" icon="Calendar" color="purple" />
      <StatCard title="O'rtacha Uzunlik" :value="averageLength" icon="Eye" color="orange" />
    </div>

    <!-- News Table -->
    <Card>
      <CardHeader>
        <CardTitle>Barcha Yangiliklar ({{ newsData.length }})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rasm</TableHead>
              <TableHead>Sarlavha</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in newsData" :key="item.id">
              <TableCell><img :src="item.image_url || defaultImage" class="w-12 h-12 rounded object-cover" /></TableCell>
              <TableCell>
                <p class="font-medium">{{ item.heading }}</p>
                <p class="text-sm text-muted-foreground">{{ item.description.slice(0, 60) }}...</p>
              </TableCell>
              <TableCell>
                <p class="text-sm">{{ formatDate(item.created_at) }}</p>
                <p v-if="item.updated_at !== item.created_at" class="text-xs text-muted-foreground">
                  Yangilangan: {{ formatDate(item.updated_at) }}
                </p>
              </TableCell>
              <TableCell>
                <Badge :variant="getStatus(item.created_at)">{{ getStatusLabel(item.created_at) }}</Badge>
              </TableCell>
              <TableCell class="flex gap-2">
                <Button size="sm" variant="outline" @click="handleView(item)"><Eye class="w-4 h-4" /></Button>
                <Button size="sm" variant="outline" @click="handleEdit(item)"><Edit class="w-4 h-4" /></Button>
                <Button size="sm" variant="destructive" @click="confirmDelete(item)"><Trash2 class="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  <!-- View Dialog -->
<Dialog :open="isViewDialogOpen" @update:open="val => isViewDialogOpen = val">
  <DialogContent class="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Xabar Ko'rish</DialogTitle>
    </DialogHeader>
    <div v-if="viewingNews" class="space-y-4">
      <img :src="viewingNews.image_url || defaultImage" class="w-full h-64 rounded-lg object-cover" />
      <div class="space-y-2">
        <h3>{{ viewingNews.heading }}</h3>
        <div class="flex gap-4 text-sm text-muted-foreground">
          <span>Yaratilgan: {{ formatDate(viewingNews.created_at) }}</span>
          <span v-if="viewingNews.updated_at !== viewingNews.created_at">
            Yangilangan: {{ formatDate(viewingNews.updated_at) }}
          </span>
        </div>
      </div>
      <div class="prose max-w-none">
        <p>{{ viewingNews.description }}</p>
      </div>
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="isViewDialogOpen = false">Yopish</Button>
        <Button @click="editFromView">Tahrirlash</Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  </div>
  <Dialog :open="isDeleteDialogOpen" @update:open="val => isDeleteDialogOpen = val">
  <DialogContent class="max-w-md">
    <DialogHeader>
      <DialogTitle>Yangilikni o'chirishni tasdiqlang</DialogTitle>
    </DialogHeader>
    <p class="text-sm text-muted-foreground">
      "{{ newsToDelete?.heading }}" sarlavhali xabarni o'chirishni xohlaysizmi? Bu amal qaytarilmaydi.
    </p>
    <div class="flex justify-end gap-2 mt-4">
      <Button variant="outline" @click="isDeleteDialogOpen = false">Bekor qilish</Button>
      <Button variant="destructive" @click="handleDeleteConfirmed">Ha, o'chir</Button>
    </div>
  </DialogContent>
</Dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue' // <<< `watch` import qilindi
import axios from 'axios'
import { Button } from '@/admin/components/ui/button'
import { Input } from '@/admin/components/ui/input'
import { Textarea } from '@/admin/components/ui/textarea'
import { Badge } from '@/admin/components/ui/badge'
import ImageUpload from '@/admin/views/ImageUpload.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/admin/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/admin/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/admin/components/ui/dialog'
import { Plus, Edit, Trash2, Eye } from 'lucide-vue-next'


// API bazaviy URL
const API_URL = 'https://itparkxorazm-laravel.test/api/news'

// State
const newsData = ref([])
const isDialogOpen = ref(false)
const isViewDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const newsToDelete = ref(null)

const initialFormData = {
  heading: '',
  description: '',
  image: null,
}
const formData = ref({ ...initialFormData })
const editingNews = ref(null)
const viewingNews = ref(null)
const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop'


// 1. Preview uchun alohida `ref` yaratamiz
const previewInFormUrl = ref(defaultImage)
// 2. Xotirada yaratilgan vaqtinchalik blob URLni saqlab turish uchun `ref`
const createdBlobUrl = ref(null)

// 3. Eskirgan blob URLni xotiradan tozalovchi funksiya
function revokeBlobUrl() {
    if (createdBlobUrl.value) {
        URL.revokeObjectURL(createdBlobUrl.value)
        createdBlobUrl.value = null
    }
}

// 4. `formData.image` o'zgarganda preview rasmini yangilovchi `watch`
watch(() => formData.value.image, (newImage) => {
    revokeBlobUrl() // Har o'zgarishda avvalgi blobni xotiradan o'chiramiz

    if (newImage instanceof File) {
        // Agar yangi fayl tanlansa, unga yangi blob URL yaratamiz
        const newBlobUrl = URL.createObjectURL(newImage)
        previewInFormUrl.value = newBlobUrl
        createdBlobUrl.value = newBlobUrl // O'chirish uchun saqlab qo'yamiz
    } else if (typeof newImage === 'string' && newImage) {
        // Agar bu serverdan kelgan URL bo'lsa (tahrirlashda), shuni ko'rsatamiz
        previewInFormUrl.value = newImage
    } else {
        // Agar rasm yo'q bo'lsa (o'chirilgan bo'lsa), default rasmni ko'rsatamiz
        previewInFormUrl.value = defaultImage
    }
})

// 5. Dialog yopilganda ham resurslarni tozalaymiz
watch(isDialogOpen, (isOpen) => {
    if (!isOpen) {
        revokeBlobUrl()
    }
})


async function fetchNews() {
  try {
    const res = await axios.get(API_URL)
    newsData.value = res.data.map(item => ({
      ...item,
      image_url: item.full_image_url || item.image_url
    })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (err) {
    console.error('News fetch error:', err)
  }
}

function openNewDialog() {
  editingNews.value = null
  resetForm()
  isDialogOpen.value = true
}

function resetForm() {
  formData.value = { ...initialFormData }
}

async function handleSubmit() {
  try {
    const data = new FormData()
    data.append('heading', formData.value.heading)
    data.append('description', formData.value.description)

    if (formData.value.image instanceof File) {
      data.append('image', formData.value.image)
    }

    if (editingNews.value) {
      data.append('_method', 'PUT')
      await axios.post(`${API_URL}/${editingNews.value.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } else {
      await axios.post(API_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }

    await fetchNews()
    isDialogOpen.value = false
  } catch (err) {
    console.error('Save error:', err.response ? err.response.data : err)
  } finally {
    resetForm()
    editingNews.value = null
  }
}


function handleEdit(item) {
  editingNews.value = item
  formData.value = {
    heading: item.heading,
    description: item.description,
    image: item.image_url, // Mavjud rasm URL'ini `image`ga o'rnatamiz
  }
  isDialogOpen.value = true
}

// ... Qolgan barcha funksiyalar va computed xususiyatlar o'zgarishsiz qoladi ...

function handleView(item) {
  viewingNews.value = item
  isViewDialogOpen.value = true
}

function editFromView() {
  if (viewingNews.value) {
    handleEdit(viewingNews.value)
    isViewDialogOpen.value = false
  }
}

function confirmDelete(newsItem) {
  newsToDelete.value = newsItem
  isDeleteDialogOpen.value = true
}

async function handleDeleteConfirmed() {
  if (newsToDelete.value) {
    try {
      await axios.delete(`${API_URL}/${newsToDelete.value.id}`)
      await fetchNews()
    } catch (err) {
      console.error('Delete error:', err)
    } finally {
      isDeleteDialogOpen.value = false
      newsToDelete.value = null
    }
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })
}

function getStatus(dateStr) {
  const daysDiff = (new Date() - new Date(dateStr)) / (1000 * 3600 * 24)
  return daysDiff < 7 ? 'default' : 'secondary'
}

function getStatusLabel(dateStr) {
  const daysDiff = Math.floor((new Date() - new Date(dateStr)) / (1000 * 3600 * 24))
  if (daysDiff < 0) return "Kelajakda";
  if (daysDiff === 0) return 'Bugun'
  if (daysDiff === 1) return 'Kecha'
  if (daysDiff < 7) return `${daysDiff} kun oldin`
  return 'Eski'
}

// `previewImage` computed endi kerak emas, uning o'rniga `previewInFormUrl` ishlatiladi
const previewDescription = computed(() => {
  return formData.value.description?.length > 100
    ? formData.value.description.slice(0, 100) + '...'
    : formData.value.description
})

const recentNewsCount = computed(() => {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return newsData.value.filter(n => new Date(n.created_at) >= oneWeekAgo).length
})

const latestDate = computed(() => {
  return newsData.value.length > 0 ? formatDate(newsData.value[0].created_at) : '-'
})

const averageLength = computed(() => {
  if (!newsData.value.length) return 0
  return Math.round(
    newsData.value.reduce((sum, item) => sum + item.description.length, 0) / newsData.value.length
  )
})

onMounted(() => {
  fetchNews()
})
</script>