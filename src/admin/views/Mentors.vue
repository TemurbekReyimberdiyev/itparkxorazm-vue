<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import axios from 'axios'

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/admin/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/admin/components/ui/card'
import { Button } from '@/admin/components/ui/button'
import { Input } from '@/admin/components/ui/input'
import { Textarea } from '@/admin/components/ui/textarea'
import ImageUpload from '@/admin/views/ImageUpload.vue'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/admin/components/ui/select'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/admin/components/ui/table'
import { Badge } from '@/admin/components/ui/badge'
import { Checkbox } from '@/admin/components/ui/checkbox'
import { Plus, Edit, Trash2, Award } from 'lucide-vue-next'

const API_URL = 'https://itparkxorazm-laravel.test/api'

// Reactive state
const mentorsData = ref([])
const skills = ref([])
const courses = ref([])
const isDialogOpen = ref(false)
const isSkillDialogOpen = ref(false)
const editingMentor = ref(null)
const selectedMentorForSkills = ref(null)
const isDeleteConfirmOpen = ref(false)
const mentorToDelete = ref(null)
const loading = ref(false)

// Form data
const formData = reactive({
  id: null,
  first_name: '',
  last_name: '',
  course_id: null,
  education: '',
  experience_years: 1,
  students: 0,
  image_url: '' // string (URL) or File
})

// Derived / computed
const totalMentors = computed(() => mentorsData.value.length)
const totalStudents = computed(() => mentorsData.value.reduce((s, m) => s + (m.students || 0), 0))
const avgExperience = computed(() => {
  if (!mentorsData.value.length) return '0 yil'
  const avg = (mentorsData.value.reduce((s, m) => s + (m.experience_years || 0), 0) / mentorsData.value.length)
  return `${avg.toFixed(1)} yil`
})
const activeSkillsCount = computed(() => {
  const allSkills = mentorsData.value.flatMap(m => m.skills || [])
  const unique = new Set(allSkills.map(s => s.id))
  return unique.size
})

// Fetch helpers with error handling
const fetchMentors = async () => {
  try {
    const res = await axios.get(`${API_URL}/mentors`)
    mentorsData.value = res.data || []
  } catch (err) {
    console.error('fetchMentors error:', err.response?.data || err.message)
  }
}

const fetchSkills = async () => {
  try {
    const res = await axios.get(`${API_URL}/skills`)
    skills.value = res.data || []
  } catch (err) {
    console.error('fetchSkills error:', err.response?.data || err.message)
  }
}

const fetchCourses = async () => {
  try {
    const res = await axios.get(`${API_URL}/courses`)
    courses.value = res.data || []
    // ensure form default course
    if (!formData.course_id && courses.value.length) {
      formData.course_id = courses.value[0].id
    }
  } catch (err) {
    console.error('fetchCourses error:', err.response?.data || err.message)
  }
}

// Utilities
const resetForm = (keepCourse = false) => {
  formData.id = null
  formData.first_name = ''
  formData.last_name = ''
  formData.education = ''
  formData.experience_years = 1
  formData.students = 0
  formData.image_url = ''
  if (!keepCourse) {
    formData.course_id = courses.value.length ? courses.value[0].id : null
  }
}

const openCreateDialog = () => {
  editingMentor.value = null
  resetForm()
  isDialogOpen.value = true
}

const openEditDialog = (mentor) => {
  editingMentor.value = mentor
  // copy only allowed fields to avoid reactive references issues
  formData.id = mentor.id
  formData.first_name = mentor.first_name || ''
  formData.last_name = mentor.last_name || ''
  formData.course_id = mentor.course_id ?? (courses.value[0]?.id ?? null)
  formData.education = mentor.education || ''
  formData.experience_years = mentor.experience_years ?? 1
  formData.students = mentor.students ?? 0
  // image_url might be a string URL coming from API
  formData.image_url = mentor.image_url || ''
  isDialogOpen.value = true
}

const getCourseName = (courseId) => {
  return courses.value.find(c => c.id === courseId)?.name || "Noma'lum kurs"
}

const getMentorSkills = (mentor) => mentor?.skills || []

// Submit (create/update)
const handleSubmit = async () => {
  loading.value = true
  try {
    const data = new FormData()
    data.append('first_name', formData.first_name)
    data.append('last_name', formData.last_name)
    if (formData.course_id !== null) data.append('course_id', formData.course_id)
    data.append('education', formData.education)
    data.append('experience_years', formData.experience_years)
    data.append('students', formData.students)

    // image_url can be File (from ImageUpload) or string (existing path)
    if (formData.image_url instanceof File) {
      data.append('image_url', formData.image_url)
    }

    if (editingMentor.value && formData.id) {
      // For APIs that accept POST + _method=PUT:
      await axios.post(`${API_URL}/mentors/${formData.id}?_method=PUT`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    } else {
      await axios.post(`${API_URL}/mentors`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }

    isDialogOpen.value = false
    editingMentor.value = null
    resetForm()
    await fetchMentors()
  } catch (err) {
    console.error('handleSubmit error:', err.response?.data || err.message)
    // optionally show user-facing error toast here
  } finally {
    loading.value = false
  }
}

// Delete
const confirmDelete = (mentor) => {
  mentorToDelete.value = mentor
  isDeleteConfirmOpen.value = true
}

const performDelete = async () => {
  if (!mentorToDelete.value) return
  try {
    await axios.delete(`${API_URL}/mentors/${mentorToDelete.value.id}`)
    isDeleteConfirmOpen.value = false
    mentorToDelete.value = null
    await fetchMentors()
  } catch (err) {
    console.error('performDelete error:', err.response?.data || err.message)
  }
}

// Skills management
const handleSkillsManagement = (mentor) => {
  selectedMentorForSkills.value = { ...mentor } // shallow clone so template reactivity ok
  isSkillDialogOpen.value = true
}

const handleSkillToggle = async (skillId, checked) => {
  if (!selectedMentorForSkills.value) return
  const mentorId = selectedMentorForSkills.value.id
  try {
    if (checked) {
      await axios.post(`${API_URL}/mentors/${mentorId}/skills`, { skill_id: skillId })
    } else {
      // many APIs expect delete with skill id in path
      await axios.delete(`${API_URL}/mentors/${mentorId}/skills/${skillId}`)
    }
    // update mentors list
    await fetchMentors()
    // refresh selected mentor's skills for dialog UI
    const updated = mentorsData.value.find(m => m.id === mentorId)
    selectedMentorForSkills.value = updated ? { ...updated } : null
  } catch (err) {
    console.error('handleSkillToggle error:', err.response?.data || err.message)
  }
}

const isSkillSelected = (mentor, skillId) => {
  if (!mentor) return false
  return (mentor.skills || []).some(s => s.id === skillId)
}

// mounted
onMounted(() => {
  fetchMentors()
  fetchSkills()
  fetchCourses()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card class="p-3">
        <CardContent class="p-4">
          <div class="flex justify-between items-center">
            <div class="truncate">
              <p class="text-xs text-muted-foreground">Jami Mentorlar</p>
              <p class="text-lg font-semibold">{{ totalMentors }}</p>
            </div>
            <Award class="w-6 h-6 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card class="p-3">
        <CardContent class="p-4">
          <div class="flex justify-between items-center">
            <div class="truncate">
              <p class="text-xs text-muted-foreground">Jami Talabalar</p>
              <p class="text-lg font-semibold">{{ totalStudents }}</p>
            </div>
            <Award class="w-6 h-6 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card class="p-3">
        <CardContent class="p-4">
          <div class="flex justify-between items-center">
            <div class="truncate">
              <p class="text-xs text-muted-foreground">O‘rtacha Tajriba</p>
              <p class="text-lg font-semibold">{{ avgExperience }}</p>
            </div>
            <Award class="w-6 h-6 text-purple-500" />
          </div>
        </CardContent>
      </Card>

      <Card class="p-3">
        <CardContent class="p-4">
          <div class="flex justify-between items-center">
            <div class="truncate">
              <p class="text-xs text-muted-foreground">Faol Ko‘nikmalar</p>
              <p class="text-lg font-semibold">{{ activeSkillsCount }}</p>
            </div>
            <Award class="w-6 h-6 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Mentors Table -->
    <Card>
      <CardHeader>
        <CardTitle>Barcha Mentorlar ({{ totalMentors }})</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex justify-end mb-4">
          <Button @click="openCreateDialog">
            <Plus class="w-4 h-4 mr-2" /> Yangi Mentor
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rasm</TableHead>
              <TableHead>Ism Familiya</TableHead>
              <TableHead>Kurs</TableHead>
              <TableHead>Tajriba</TableHead>
              <TableHead>Talabalar</TableHead>
              <TableHead>Ko'nikmalar</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow v-for="mentor in mentorsData" :key="mentor.id">
              <TableCell>
                <img :src="mentor.image_url" alt="mentor" class="w-12 h-12 rounded-full object-cover" />
              </TableCell>

              <TableCell>
                <p>{{ mentor.first_name }} {{ mentor.last_name }}</p>
                <p class="text-sm text-muted-foreground">{{ (mentor.education || '').slice(0, 30) }}...</p>
              </TableCell>

              <TableCell>
                <Badge variant="outline">{{ getCourseName(mentor.course_id) }}</Badge>
              </TableCell>

              <TableCell>{{ mentor.experience_years }} yil</TableCell>
              <TableCell>{{ mentor.students }} ta</TableCell>

              <TableCell>
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="skill in getMentorSkills(mentor).slice(0, 2)"
                    :key="skill.id"
                    variant="secondary"
                    class="text-xs"
                  >
                    {{ skill.name }}
                  </Badge>
                  <Badge v-if="getMentorSkills(mentor).length > 2" variant="secondary" class="text-xs">
                    +{{ getMentorSkills(mentor).length - 2 }}
                  </Badge>
                </div>
              </TableCell>

              <TableCell>
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" @click="handleSkillsManagement(mentor)">
                    <Award class="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" @click="openEditDialog(mentor)">
                    <Edit class="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" @click="confirmDelete(mentor)">
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Add / Edit Dialog -->
    <Dialog v-model:open="isDialogOpen">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{{ editingMentor ? 'Mentorni Tahrirlash' : 'Yangi Mentor Qo\'shish' }}</DialogTitle>
        </DialogHeader>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label>Ism</label>
              <Input v-model="formData.first_name" placeholder="Ismni kiriting" required />
            </div>

            <div class="space-y-2">
              <label>Familiya</label>
              <Input v-model="formData.last_name" placeholder="Familiyani kiriting" required />
            </div>
          </div>

          <div class="space-y-2">
            <label>Kurs</label>
            <Select v-model="formData.course_id">
              <SelectTrigger>
                <SelectValue placeholder="Kursni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="course in courses" :key="course.id" :value="course.id">
                  {{ course.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <label>Ta'lim</label>
            <Textarea v-model="formData.education" placeholder="Ta'lim ma'lumotlarini kiriting" rows="2" required />
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div class="space-y-2">
              <label>Tajriba (yil)</label>
              <Input type="number" v-model.number="formData.experience_years" min="0" required />
            </div>

            <div class="space-y-2">
              <label>Talabalar soni</label>
              <Input type="number" v-model.number="formData.students" min="0" required />
            </div>

            <div class="space-y-2">
              <label>Profil rasmi</label>
              <ImageUpload v-model:value="formData.image_url" placeholder="Mentor rasmini yuklang" />
              <div v-if="formData.image_url && typeof formData.image_url === 'string'" class="mt-2">
                <p class="text-sm text-muted-foreground">Hozirgi rasm:</p>
                <img :src="formData.image_url" alt="preview" class="w-20 h-20 rounded object-cover mt-1" />
              </div>
            </div>
          </div>

          <div class="flex gap-2 justify-end">
            <Button type="button" variant="outline" @click="isDialogOpen = false">Bekor qilish</Button>
            <Button type="submit" :disabled="loading">{{ editingMentor ? "Saqlash" : "Qo'shish" }}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Skills Dialog -->
    <Dialog v-model:open="isSkillDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {{ selectedMentorForSkills?.first_name }} {{ selectedMentorForSkills?.last_name }} - Ko'nikmalar
          </DialogTitle>
        </DialogHeader>

        <div v-if="selectedMentorForSkills" class="space-y-4">
          <p class="text-sm text-muted-foreground">Mentor uchun ko'nikmalarni tanlang:</p>

          <div class="space-y-3">
            <div v-for="skill in skills" :key="skill.id" class="flex items-center gap-3">
              <Checkbox
                :id="`skill-${skill.id}`"
                :checked="isSkillSelected(selectedMentorForSkills, skill.id)"
                @update:checked="val => handleSkillToggle(skill.id, val)"
              />
              <img :src="skill.image_url" class="w-8 h-8 rounded object-cover" />
              <label :for="`skill-${skill.id}`">{{ skill.name }}</label>
            </div>
          </div>

          <div class="flex justify-end">
            <Button @click="isSkillDialogOpen = false">Saqlash</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation -->
    <Dialog v-model:open="isDeleteConfirmOpen">
      <DialogContent class="max-w-md">
        <DialogHeader>
          <DialogTitle>Ushbu ma'lumotni o'chirmoqchimisiz?</DialogTitle>
        </DialogHeader>

        <div class="space-y-4">
          <p class="text-sm text-muted-foreground">
            <strong>{{ mentorToDelete?.first_name }} {{ mentorToDelete?.last_name }}</strong> ismli mentor ma'lumotlari o'chiriladi. Ishonchingiz komilmi?
          </p>

          <div class="flex justify-end gap-2">
            <Button variant="outline" @click="isDeleteConfirmOpen = false">Yo‘q</Button>
            <Button variant="destructive" @click="performDelete">Ha, o‘chirish</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
