<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import {
  Card, CardContent, CardHeader, CardTitle
} from '@/admin/components/ui/card'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/admin/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/admin/components/ui/dialog'
import { Badge } from '@/admin/components/ui/badge'
import { Button } from '@/admin/components/ui/button'
import { Input } from '@/admin/components/ui/input'
import ImageUpload from '@/admin/views/ImageUpload.vue'
import { Plus, Edit, Trash2, Award, Users } from 'lucide-vue-next'

import type { Skill } from '@/admin/types/database'

// API URL
const API_URL = 'https://itparkxorazm-laravel.test/api/skills'

// State
const skillsData = ref<Skill[]>([])
const isDialogOpen = ref(false)
const editingSkill = ref<Skill | null>(null)
const formData = ref<Partial<Skill>>({
  name: '',
  image_url: ''
})

// Delete confirm dialog
const isDeleteDialogOpen = ref(false)
const skillToDelete = ref<Skill | null>(null)

// Fetch data from API
async function fetchSkills() {
  try {
    const res = await axios.get(API_URL)
    skillsData.value = res.data
  } catch (error) {
    console.error('API fetch error:', error)
  }
}

onMounted(() => {
  fetchSkills()
})

// Add / Update
async function handleSubmit(e: Event) {
  e.preventDefault()
  try {
    if (editingSkill.value) {
      // Update
      await axios.put(`${API_URL}/${editingSkill.value.id}`, formData.value)
    } else {
      // Create
      await axios.post(API_URL, formData.value)
    }
    await fetchSkills()
    isDialogOpen.value = false
    editingSkill.value = null
    resetForm()
  } catch (error) {
    console.error('Save error:', error)
  }
}

// Delete confirm
async function handleDeleteConfirm() {
  if (!skillToDelete.value) return
  try {
    await axios.delete(`${API_URL}/${skillToDelete.value.id}`)
    await fetchSkills()
  } catch (error) {
    console.error('Delete error:', error)
  }
  isDeleteDialogOpen.value = false
  skillToDelete.value = null
}

function resetForm() {
  formData.value = { name: '', image_url: '' }
}

function handleEdit(skill: Skill) {
  editingSkill.value = skill
  formData.value = { name: skill.name, image_url: skill.image_url }
  isDialogOpen.value = true
}

function getMentorCount(skill: Skill) {
  return skill.mentors ? skill.mentors.length : 0
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Ko'nikmalar</h1>
        <p class="text-muted-foreground">Texnologik ko'nikmalarni boshqaring</p>
      </div>

      <Dialog :open="isDialogOpen" @update:open="val => isDialogOpen = val">
        <DialogTrigger as-child>
          <Button @click="() => { editingSkill = null; resetForm() }">
            <Plus class="w-4 h-4 mr-2" /> Yangi Ko'nikma
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ editingSkill ? "Ko'nikmani Tahrirlash" : "Yangi Ko'nikma Qo'shish" }}</DialogTitle>
          </DialogHeader>

          <form @submit="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <label>Ko'nikma nomi</label>
              <Input v-model="formData.name" required placeholder="Ko'nikma nomini kiriting" />
            </div>
            <div class="space-y-2">
              <label>Ko'nikma rasmi</label>
              <ImageUpload :value="formData.image_url" @change="url => formData.image_url = url" />
            </div>
            <div v-if="formData.name" class="space-y-2">
              <label>Preview</label>
              <div class="flex items-center gap-3 p-3 border rounded-lg">
                <img :src="formData.image_url || '/no-image.png'" class="w-12 h-12 rounded object-cover" />
                <span>{{ formData.name }}</span>
              </div>
            </div>
            <div class="flex gap-2 justify-end">
              <Button type="button" variant="outline" @click="isDialogOpen = false">Bekor qilish</Button>
              <Button type="submit">{{ editingSkill ? "Saqlash" : "Qo'shish" }}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    <!-- Skills Table -->
    <Card>
      <CardHeader>
        <CardTitle>Barcha Ko'nikmalar ({{ skillsData.length }})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rasm</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Mentorlar</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="skill in skillsData" :key="skill.id">
              <TableCell>
                <img :src="skill.full_image_url" class="w-10 h-10 rounded object-cover" />
              </TableCell>
              <TableCell>{{ skill.name }}</TableCell>
              <TableCell>
                <Badge variant="secondary">{{ getMentorCount(skill) }} mentor</Badge>
              </TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" @click="handleEdit(skill)">
                    <Edit class="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" @click="() => { skillToDelete = skill; isDeleteDialogOpen = true }">
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>

  <!-- Delete Confirmation -->
  <Dialog :open="isDeleteDialogOpen" @update:open="val => isDeleteDialogOpen = val">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ko'nikmani o'chirishni tasdiqlaysizmi?</DialogTitle>
      </DialogHeader>
      <p class="text-sm text-muted-foreground">
        "{{ skillToDelete?.name }}" nomli ko‘nikma o‘chiriladi.
      </p>
      <div class="flex justify-end gap-2 mt-4">
        <Button variant="outline" @click="isDeleteDialogOpen = false">Bekor qilish</Button>
        <Button variant="destructive" @click="handleDeleteConfirm">Ha, o'chir</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
