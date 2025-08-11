<script setup>
import { ref, reactive, onMounted } from 'vue'
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

// States
const mentorsData = ref([])
const skills = ref([])
const courses = ref([])
const isDialogOpen = ref(false)
const isSkillDialogOpen = ref(false)
const editingMentor = ref(null)
const selectedMentorForSkills = ref(null)
const isDeleteConfirmOpen = ref(false)
const mentorToDelete = ref(null)

// Form data
const formData = reactive({
  first_name: '',
  last_name: '',
  course_id: null,
  education: '',
  experience_years: 1,
  students: 0,
  image_url: ''
})

// Fetch data
const fetchMentors = async () => {
  const res = await axios.get(`${API_URL}/mentors`)
  mentorsData.value = res.data
}

const fetchSkills = async () => {
  const res = await axios.get(`${API_URL}/skills`)
  skills.value = res.data
}

const fetchCourses = async () => {
  const res = await axios.get(`${API_URL}/courses`)
  courses.value = res.data
}

// CRUD Operations
const handleSubmit = async () => {
  if (editingMentor.value) {
    await axios.put(`${API_URL}/mentors/${editingMentor.value.id}`, formData)
  } else {
    await axios.post(`${API_URL}/mentors`, formData)
  }
  isDialogOpen.value = false
  editingMentor.value = null
  resetForm()
  fetchMentors()
}

const handleEdit = (mentor) => {
  editingMentor.value = mentor
  Object.assign(formData, mentor)
  isDialogOpen.value = true
}

const confirmDelete = (mentor) => {
  mentorToDelete.value = mentor
  isDeleteConfirmOpen.value = true
}

const performDelete = async () => {
  if (mentorToDelete.value) {
    await axios.delete(`${API_URL}/mentors/${mentorToDelete.value.id}`)
    isDeleteConfirmOpen.value = false
    mentorToDelete.value = null
    fetchMentors()
  }
}

// Skills management
const handleSkillsManagement = (mentor) => {
  selectedMentorForSkills.value = mentor
  isSkillDialogOpen.value = true
}

const handleSkillToggle = async (skillId, checked) => {
  const mentorId = selectedMentorForSkills.value.id
  if (checked) {
    await axios.post(`${API_URL}/mentors/${mentorId}/skills`, { skill_id: skillId })
  } else {
    await axios.delete(`${API_URL}/mentors/${mentorId}/skills/${skillId}`)
  }
  fetchMentors()
}

const isSkillSelected = (mentor, skillId) => {
  return mentor.skills?.some(s => s.id === skillId)
}

// Helpers
const resetForm = () => {
  Object.assign(formData, {
    first_name: '',
    last_name: '',
    course_id: courses.value.length ? courses.value[0].id : null,
    education: '',
    experience_years: 1,
    students: 0,
    image_url: ''
  })
}

const getCourseName = (courseId) => {
  return courses.value.find(c => c.id === courseId)?.name || 'Noma\'lum kurs'
}

const getMentorSkills = (mentor) => {
  return mentor.skills || []
}

const mentorSkillsCount = () => {
  const allSkills = mentorsData.value.flatMap(m => m.skills || [])
  const uniqueSkillIds = new Set(allSkills.map(s => s.id))
  return uniqueSkillIds.size
}

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
      <Card
        v-for="(stat, i) in [
          { title: 'Jami Mentorlar', value: mentorsData.length, color: 'text-blue-500' },
          { title: 'Jami Talabalar', value: mentorsData.reduce((sum, m) => sum + m.students, 0), color: 'text-green-500' },
          { title: 'O‘rtacha Tajriba', value: mentorsData.length ? (mentorsData.reduce((sum, m) => sum + m.experience_years, 0) / mentorsData.length).toFixed(1) + ' yil' : '0 yil', color: 'text-purple-500' },
          { title: 'Faol Ko‘nikmalar', value: mentorSkillsCount(), color: 'text-orange-500' }
        ]"
        :key="i"
        class="p-3"
      >
        <CardContent class="p-4">
          <div class="flex justify-between items-center">
            <div class="truncate">
              <p class="text-xs text-muted-foreground">{{ stat.title }}</p>
              <p class="text-lg font-semibold">{{ stat.value }}</p>
            </div>
            <Award :class="`w-6 h-6 ${stat.color}`" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Mentors Table -->
    <Card>
      <CardHeader>
        <CardTitle>Barcha Mentorlar ({{ mentorsData.length }})</CardTitle>
      </CardHeader>
      <CardContent>
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
                <img :src="mentor.image_url" class="w-12 h-12 rounded-full object-cover" />
              </TableCell>
              <TableCell>
                <p>{{ mentor.first_name }} {{ mentor.last_name }}</p>
                <p class="text-sm text-muted-foreground">{{ mentor.education.slice(0, 30) }}...</p>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{{ getCourseName(mentor.course_id) }}</Badge>
              </TableCell>
              <TableCell>{{ mentor.experience_years }} yil</TableCell>
              <TableCell>{{ mentor.students }} ta</TableCell>
              <TableCell>
                <div class="flex flex-wrap gap-1">
                  <Badge v-for="skill in getMentorSkills(mentor).slice(0, 2)" :key="skill.id" variant="secondary" class="text-xs">
                    {{ skill.name }}
                  </Badge>
                  <Badge v-if="getMentorSkills(mentor).length > 2" variant="secondary" class="text-xs">
                    +{{ getMentorSkills(mentor).length - 2 }}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" @click="handleSkillsManagement(mentor)"><Award class="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" @click="handleEdit(mentor)"><Edit class="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" @click="confirmDelete(mentor)"><Trash2 class="w-4 h-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Add/Edit Dialog -->
    <Dialog :open="isDialogOpen" @update:open="val => isDialogOpen = val">
      <DialogTrigger as-child>
        <Button @click="() => { editingMentor = null; resetForm(); isDialogOpen = true }">
          <Plus class="w-4 h-4 mr-2" /> Yangi Mentor
        </Button>
      </DialogTrigger>
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
            <Textarea
              v-model="formData.education"
              placeholder="Ta'lim ma'lumotlarini kiriting"
              rows="2"
              required
            />
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
            </div>
          </div>

          <div class="flex gap-2 justify-end">
            <Button type="button" variant="outline" @click="isDialogOpen = false">Bekor qilish</Button>
            <Button type="submit">{{ editingMentor ? "Saqlash" : "Qo'shish" }}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Skills Dialog -->
    <Dialog :open="isSkillDialogOpen" @update:open="val => isSkillDialogOpen = val">
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
  </div>

  <!-- Delete Confirmation Dialog -->
  <Dialog :open="isDeleteConfirmOpen" @update:open="val => isDeleteConfirmOpen = val">
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
</template>
