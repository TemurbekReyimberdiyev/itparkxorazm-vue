<template>
  <div class="space-y-6">
    <!-- Header va modal trigger -->
    <div class="flex items-center justify-between">
      <div>
        <h1>Kurslar</h1>
        <p class="text-muted-foreground">O'quv kurslarini boshqaring</p>
      </div>

      <!-- Kurs qo'shish uchun dialog -->
      <Dialog :open="isDialogOpen" @update:open="setDialogOpen">
        <DialogTrigger as-child>
          <Button @click="prepareAddCourse">
            <Plus class="w-4 h-4 mr-2" />
            Yangi Kurs
          </Button>
        </DialogTrigger>

        <DialogContent class="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {{ editingCourse ? "Kursni Tahrirlash" : "Yangi Kurs Qo'shish" }}
            </DialogTitle>
          </DialogHeader>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label>Kurs nomi</label>
                <Input v-model="formData.name" required placeholder="Kurs nomi" />
              </div>
              <div class="space-y-2">
                <label>Kategoriya</label>
                <Select
  required
  :model-value="formData.category_id?.toString()"
  @update:model-value="val => formData.category_id = Number(val)"
>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategoriyani tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id.toString()"
                    >
                      {{ category.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div class="space-y-2">
              <label>Sarlavha</label>
              <Input v-model="formData.heading" required placeholder="Sarlavha" />
            </div>

            <div class="space-y-2">
              <label>Tavsif</label>
              <Textarea
                v-model="formData.description"
                rows="3"
                required
                placeholder="Kurs tavsifi"
              />
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div class="space-y-2">
                <label>Davomiyligi (oy)</label>
                <Input
                  type="number"
                  v-model.number="formData.duration_month"
                  min="1"
                  required
                />
              </div>
              <div class="space-y-2">
                <label>Narxi (so'm)</label>
                <Input
                  type="number"
                  v-model.number="formData.cost"
                  min="0"
                  required
                />
              </div>
              <div class="space-y-2">
                <label>Kurs Rasmi</label>
                <ImageUpload
                  :value="previewUrl"
                  @change="handleImageChange"
                  placeholder="Kurs rasmini yuklang"
                />
              </div>
            </div>

            <div class="flex gap-2 justify-end">
              <Button variant="outline" type="button" @click="setDialogOpen(false)">
                Bekor qilish
              </Button>
              <Button type="submit">
                {{ editingCourse ? "Saqlash" : "Qo'shish" }}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    <!-- Kurslar jadvali -->
    <Card>
      <CardHeader>
        <CardTitle>Barcha Kurslar ({{ coursesData.length }})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rasm</TableHead>
              <TableHead>Nomi</TableHead>
              <TableHead>Kategoriya</TableHead>
              <TableHead>Davomiyligi</TableHead>
              <TableHead>Narxi</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="course in coursesData" :key="course.id">
              <TableCell>
                <img
                  :src="getImageUrl(course.image_url)"
                  class="w-12 h-12 object-cover rounded-lg"
                  :alt="course.name || 'Kurs rasmi'"
                />
              </TableCell>
              <TableCell>
                <div>
                  <p>{{ course.name }}</p>
                  <p class="text-sm text-muted-foreground">{{ course.heading }}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {{ getCategoryName(course.category_id) }}
                </Badge>
              </TableCell>
              <TableCell>{{ course.duration_month }} oy</TableCell>
              <TableCell>{{ formatPrice(course.cost) }}</TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" @click="handleView(course)">
                    <Eye class="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" @click="handleEdit(course)">
                    <Edit class="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" @click="confirmDelete(course)">
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Kurs tafsilotlari -->
    <Dialog :open="isViewDialogOpen" @update:open="val => isViewDialogOpen = val">
      <DialogContent class="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Kurs Tafsilotlari</DialogTitle>
        </DialogHeader>
        <div v-if="viewingCourse" class="space-y-4">
          <img
            :src="getImageUrl(viewingCourse.image_url)"
            class="w-full h-64 object-cover rounded-lg"
            :alt="viewingCourse.name || 'Kurs rasmi'"
          />
          <div>
            <h3 class="text-xl font-semibold">{{ viewingCourse.name }}</h3>
            <p class="text-muted-foreground">{{ viewingCourse.heading }}</p>
            <p class="mt-2">{{ viewingCourse.description }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <p><strong>Kategoriya:</strong> {{ getCategoryName(viewingCourse.category_id) }}</p>
            <p><strong>Davomiyligi:</strong> {{ viewingCourse.duration_month }} oy</p>
            <p><strong>Narxi:</strong> {{ formatPrice(viewingCourse.cost) }}</p>
          </div>
          <div class="flex justify-end">
            <Button variant="outline" @click="isViewDialogOpen = false">Yopish</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- O'chirish tasdiqlash -->
    <Dialog :open="isConfirmDeleteOpen" @update:open="isConfirmDeleteOpen = $event">
      <DialogContent class="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Kursni o‘chirishni tasdiqlang</DialogTitle>
        </DialogHeader>
        <div class="space-y-4">
          <p>Ushbu kursni o‘chirishni xohlaysizmi?</p>
          <p><strong>{{ courseToDelete ? courseToDelete.name : '' }}</strong></p>
          <div class="flex justify-end gap-2">
            <Button variant="outline" @click="isConfirmDeleteOpen = false">Yo‘q</Button>
            <Button variant="destructive" @click="performDelete">Ha</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Plus, Edit, Trash2, Eye } from 'lucide-vue-next'

import { Button } from '@/admin/components/ui/button'
import { Input } from '@/admin/components/ui/input'
import { Textarea } from '@/admin/components/ui/textarea'
import { Badge } from '@/admin/components/ui/badge'
import ImageUpload from '@/admin/views/ImageUpload.vue'

import { Card, CardContent, CardHeader, CardTitle } from '@/admin/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/admin/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/admin/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/admin/components/ui/select'

import type { Course, Category } from '@/admin/types/database'

const coursesData = ref<Course[]>([])
const categories = ref<Category[]>([])

const isDialogOpen = ref(false)
const editingCourse = ref<Course | null>(null)
const isViewDialogOpen = ref(false)
const viewingCourse = ref<Course | null>(null)

const isConfirmDeleteOpen = ref(false)
const courseToDelete = ref<Course | null>(null)

const formData = ref<Partial<Course>>({
  name: '',
  heading: '',
  description: '',
  category_id: null,
  duration_month: null,
  cost: null,
})
const uploadedFile = ref<File | null>(null) // 📌 yangi qo'shildi

const API_URL = 'https://itparkxorazm-laravel.test/api/courses'
const BASE_URL = 'https://itparkxorazm-laravel.test'

const fetchCourses = async () => {
  try {
    const res = await axios.get(API_URL)
    coursesData.value = res.data
  } catch (err) {
    console.error('Kurslarni olishda xatolik:', err)
  }
}

const fetchCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/categories`)
    categories.value = res.data
  } catch (err) {
    console.error('Kategoriyalarni olishda xatolik:', err)
  }
}

const previewUrl = ref<string>('')

const handleImageChange = (fileOrUrl: File | string | null) => {
  if (fileOrUrl instanceof File) {
    uploadedFile.value = fileOrUrl
    previewUrl.value = URL.createObjectURL(fileOrUrl)
  } else if (typeof fileOrUrl === 'string') {
    uploadedFile.value = null
    previewUrl.value = getImageUrl(fileOrUrl)
  } else {
    uploadedFile.value = null
    previewUrl.value = ''
  }
}



const handleSubmit = async () => {
  try {
    const data = new FormData()

    // Laravel kutgan aniq nomlar
    data.append('name', formData.value.name || '')
    data.append('heading', formData.value.heading || '')
    data.append('description', formData.value.description || '')
    data.append('category_id', formData.value.category_id ? String(formData.value.category_id) : '')
    data.append('duration_month', formData.value.duration_month ? String(formData.value.duration_month) : '')
    data.append('cost', formData.value.cost ? String(formData.value.cost) : '')

    if (uploadedFile.value) {
      data.append('image', uploadedFile.value)
    }

    if (editingCourse.value) {
      data.append('_method', 'PUT') // Laravel PUT patch uchun
      await axios.post(`${API_URL}/${editingCourse.value.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } else {
      await axios.post(API_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }

    await fetchCourses()
    setDialogOpen(false)
  } catch (err) {
    console.error('Saqlashda xatolik:', err)
    if (err.response?.data?.errors) {
      console.table(err.response.data.errors)
    }
  }
}


const prepareAddCourse = () => {
  editingCourse.value = null
  resetForm()
  isDialogOpen.value = true
}

const resetForm = () => {
  formData.value = {
    name: '',
    heading: '',
    description: '',
    category_id: 1,
    duration_month: 1,
    cost: 0,
    image_url: '',
  }
  uploadedFile.value = null
}

const setDialogOpen = (val: boolean) => {
  isDialogOpen.value = val
  if (!val) {
    editingCourse.value = null
    resetForm()
  }
}

const handleEdit = (course: Course) => {
  editingCourse.value = { ...course }
  formData.value = { ...course }
  uploadedFile.value = null
  isDialogOpen.value = true
}

const handleView = (course: Course) => {
  viewingCourse.value = course
  isViewDialogOpen.value = true
}

const confirmDelete = (course: Course) => {
  courseToDelete.value = course
  isConfirmDeleteOpen.value = true
}

const performDelete = async () => {
  try {
    if (courseToDelete.value) {
      await axios.delete(`${API_URL}/${courseToDelete.value.id}`)
      await fetchCourses()
    }
    isConfirmDeleteOpen.value = false
    courseToDelete.value = null
  } catch (err) {
    console.error('O‘chirishda xatolik:', err)
  }
}

const getImageUrl = (url?: string) => {
  if (!url) return '/placeholder.jpg'
  if (url.startsWith('http')) return url
  return `${BASE_URL}/${url.replace(/^\/+/, '')}`
}

const getCategoryName = (category_id: number) => {
  const cat = categories.value.find(c => c.id === category_id)
  return cat ? cat.name : 'Noma’lum'
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
}

onMounted(() => {
  fetchCourses()
  fetchCategories()
})
</script>
