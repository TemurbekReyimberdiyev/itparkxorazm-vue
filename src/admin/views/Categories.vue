<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Kategoriyalar</h1>
        <p class="text-muted-foreground">Kurs kategoriyalarini boshqaring</p>
      </div>

      <!-- Add Category Button + Dialog -->
      <Dialog :open="isDialogOpen" @update:open="setDialogOpen">
        <DialogTrigger as-child>
          <Button @click="prepareAddCategory">
            <Plus class="w-4 h-4 mr-2" />
            Yangi Kategoriya
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {{ editingCategory ? "Kategoriyani Tahrirlash" : "Yangi Kategoriya Qo'shish" }}
            </DialogTitle>
          </DialogHeader>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <label>Kategoriya nomi</label>
              <Input
                v-model="newCategoryName"
                placeholder="Kategoriya nomini kiriting"
                required
              />
            </div>
            <div class="flex gap-2 justify-end">
              <Button type="button" variant="outline" @click="setDialogOpen(false)">
                Bekor qilish
              </Button>
              <Button type="submit">
                {{ editingCategory ? "Saqlash" : "Qo'shish" }}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    <!-- Category Table -->
    <Card>
      <CardHeader>
        <CardTitle>Barcha Kategoriyalar ({{ categoriesData.length }})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nomi</TableHead>
              <TableHead>Kurslar soni</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="category in categoriesData" :key="category.id">
              <TableCell>{{ category.id }}</TableCell>
              <TableCell>{{ category.name }}</TableCell>
              <TableCell>
                <Badge variant="secondary">{{ getCourseCount(category.id) }} ta kurs</Badge>
              </TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" @click="handleEdit(category)">
                    <Edit class="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" @click="confirmDelete(category)">
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Confirm Delete Dialog -->
    <Dialog :open="isConfirmDialogOpen" @update:open="isConfirmDialogOpen = $event">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>O'chirishni tasdiqlang</DialogTitle>
        </DialogHeader>
        <div class="space-y-4">
          <p>Ushbu ma'lumotni o‘chirishni hohlaysizmi?</p>
          <p><strong>{{ categoryToDelete?.name }}</strong></p>
          <div class="flex justify-end gap-2">
            <Button variant="outline" @click="isConfirmDialogOpen = false">Yo‘q</Button>
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
import { Plus, Edit, Trash2 } from 'lucide-vue-next'

import { Card, CardContent, CardHeader, CardTitle } from '@/admin/components/ui/card'
import { Button } from '@/admin/components/ui/button'
import { Input } from '@/admin/components/ui/input'
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
import { Badge } from '@/admin/components/ui/badge'

import type { Category } from '@/admin/types/database'

const API_BASE = 'https://itparkxorazm-laravel.test/api'
const categoriesData = ref<Category[]>([])
const courses = ref<any[]>([])

const isDialogOpen = ref(false)
const editingCategory = ref<Category | null>(null)
const newCategoryName = ref('')

const isConfirmDialogOpen = ref(false)
const categoryToDelete = ref<Category | null>(null)

// --- API’dan kategoriyalarni olish
const fetchCategories = async () => {
  try {
    const res = await axios.get(`${API_BASE}/categories`)
    categoriesData.value = res.data
  } catch (err) {
    console.error('Kategoriyalarni olishda xatolik:', err)
  }
}

// --- Kurslarni olish
const fetchCourses = async () => {
  try {
    const res = await axios.get(`${API_BASE}/courses`)
    courses.value = res.data
  } catch (err) {
    console.error('Kurslarni olishda xatolik:', err)
  }
}

// --- Kurslar sonini hisoblash (local array orqali)
const getCourseCount = (categoryId: number) => {
  return courses.value.filter(c => c.category_id === categoryId).length
}

// --- Yangi kategoriya qo‘shish yoki tahrirlash
const handleSubmit = async () => {
  const name = newCategoryName.value.trim()
  if (!name) return

  try {
    if (editingCategory.value) {
      await axios.put(`${API_BASE}/categories/${editingCategory.value.id}`, { name })
    } else {
      await axios.post(`${API_BASE}/categories`, { name })
    }
    await fetchCategories()
    setDialogOpen(false)
  } catch (err) {
    console.error('Kategoriya saqlashda xatolik:', err)
  }
}

const setDialogOpen = (value: boolean) => {
  isDialogOpen.value = value
  if (!value) {
    editingCategory.value = null
    newCategoryName.value = ''
  }
}

const prepareAddCategory = () => {
  editingCategory.value = null
  newCategoryName.value = ''
  isDialogOpen.value = true
}

const handleEdit = (category: Category) => {
  editingCategory.value = { ...category }
  newCategoryName.value = category.name
  isDialogOpen.value = true
}

const confirmDelete = (category: Category) => {
  categoryToDelete.value = category
  isConfirmDialogOpen.value = true
}

const performDelete = async () => {
  if (categoryToDelete.value) {
    try {
      await axios.delete(`${API_BASE}/categories/${categoryToDelete.value.id}`)
      await fetchCategories()
    } catch (err) {
      console.error('O‘chirishda xatolik:', err)
    }
  }
  isConfirmDialogOpen.value = false
  categoryToDelete.value = null
}

onMounted(async () => {
  await fetchCategories()
  await fetchCourses()
})
</script>
