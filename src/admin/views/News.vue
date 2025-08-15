<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { Button } from '@/admin/components/ui/button'
import { Input } from '@/admin/components/ui/input'
import { Label } from '@/admin/components/ui/label'
import { Textarea } from '@/admin/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/admin/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/admin/components/ui/table'
import { Plus, Pencil, Trash2, Search, Image as ImageIcon } from 'lucide-vue-next'
import { useToast } from '@/admin/components/ui/toast'

const API_URL = 'https://itparkxorazm-laravel.test/api/news'

const news = ref([])
const isDialogOpen = ref(false)
const editingNews = ref(null)
const searchTerm = ref('')
const imagePreview = ref<string | null>(null)
const selectedImageFile = ref<File | null>(null)

const { toast } = useToast()

const formData = ref({
  heading: '',
  description: '',
  image_url: ''
})

const filteredNews = computed(() =>
  news.value.filter(item =>
    item.heading.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)

const fetchNews = async () => {
  try {
    const res = await axios.get(API_URL)
    news.value = res.data
  } catch {
    toast({ title: 'Xatolik', description: 'Yangiliklarni yuklab bo‘lmadi', variant: 'destructive' })
  }
}

const resetForm = () => {
  formData.value = { heading: '', description: '', image_url: '' }
  imagePreview.value = null
  selectedImageFile.value = null
  editingNews.value = null
}

const handleImageSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    selectedImageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  try {
    if (!formData.value.heading.trim() || !formData.value.description.trim()) {
      toast({ title: 'Xatolik', description: 'Barcha majburiy maydonlarni to‘ldiring', variant: 'destructive' })
      return
    }

    const data = new FormData()
    data.append('heading', formData.value.heading)
    data.append('description', formData.value.description)
    if (selectedImageFile.value) {
      data.append('image', selectedImageFile.value) // Laravel expects `image` field
    }

    if (editingNews.value) {
      data.append('_method', 'PUT') // For Laravel PUT with FormData
      await axios.post(`${API_URL}/${editingNews.value.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast({ title: 'Muvaffaqiyat', description: 'Yangilik yangilandi' })
    } else {
      await axios.post(API_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast({ title: 'Muvaffaqiyat', description: 'Yangi yangilik qo‘shildi' })
    }

    isDialogOpen.value = false
    resetForm()
    fetchNews()
  } catch {
    toast({ title: 'Xatolik', description: 'Amalni bajarib bo‘lmadi', variant: 'destructive' })
  }
}

const handleEdit = (item) => {
  editingNews.value = item
  formData.value = {
    heading: item.heading,
    description: item.description,
    image_url: item.image_url || ''
  }
  imagePreview.value = item.full_image_url || null
  selectedImageFile.value = null
  isDialogOpen.value = true
}

const handleDelete = async (id) => {
  if (confirm('Bu yangilikni o‘chirishni xohlaysizmi?')) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      toast({ title: 'Muvaffaqiyat', description: 'Yangilik o‘chirildi' })
      fetchNews()
    } catch {
      toast({ title: 'Xatolik', description: 'O‘chirishda xatolik', variant: 'destructive' })
    }
  }
}

onMounted(fetchNews)
</script>

<template>
  <div class="p-4 md:p-6 space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-xl font-bold">Yangiliklar boshqaruvi</h1>
        <p class="text-muted-foreground">Yangiliklarni boshqarish</p>
      </div>

      <!-- Add News -->
      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button @click="resetForm" class="w-full sm:w-auto">
            <Plus class="mr-2 h-4 w-4" /> Yangi yangilik
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{{ editingNews ? 'Yangilikni tahrirlash' : 'Yangi yangilik qo‘shish' }}</DialogTitle>
          </DialogHeader>

          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="heading">Sarlavha *</Label>
              <Input id="heading" v-model="formData.heading" placeholder="Yangilik sarlavhasi" />
            </div>
            <div class="space-y-2">
              <Label for="description">Matn *</Label>
              <Textarea id="description" v-model="formData.description" placeholder="Yangilik matni" rows="6" />
            </div>
            <div class="space-y-2">
              <Label for="image">Rasm</Label>
              <Input id="image" type="file" accept="image/*" @change="handleImageSelect" />
              <div v-if="imagePreview" class="mt-2">
                <img :src="imagePreview" class="max-h-40 rounded border" />
              </div>
            </div>
            <div class="flex justify-end gap-2 pt-4">
              <Button variant="outline" @click="isDialogOpen = false">Bekor qilish</Button>
              <Button @click="handleSubmit">{{ editingNews ? 'Yangilash' : 'Qo‘shish' }}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>

    <!-- Search -->
    <div class="flex justify-end">
      <div class="relative w-full sm:w-64">
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Qidirish..." v-model="searchTerm" class="pl-8" />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sarlavha</TableHead>
            <TableHead class="hidden sm:table-cell">Matn</TableHead>
            <TableHead>Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in filteredNews" :key="item.id">
            <TableCell class="flex items-center gap-3">
              <img v-if="item.full_image_url" :src="item.full_image_url" class="w-12 h-12 rounded object-cover" />
              <span>{{ item.heading }}</span>
            </TableCell>
            <TableCell class="hidden sm:table-cell">
              {{ item.description.length > 50 ? item.description.substring(0,50) + '...' : item.description }}
            </TableCell>
            <TableCell>
              <div class="flex gap-2">
                <Button variant="outline" size="sm" @click="handleEdit(item)">
                  <Pencil class="h-4 w-4" /> <span class="hidden sm:inline ml-2">Tahrirlash</span>
                </Button>
                <Button variant="outline" size="sm" class="text-red-500" @click="handleDelete(item.id)">
                  <Trash2 class="h-4 w-4" /> <span class="hidden sm:inline ml-2">O‘chirish</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div v-if="filteredNews.length === 0" class="text-center py-6 text-muted-foreground">
        Natija topilmadi
      </div>
    </div>
  </div>
</template>
