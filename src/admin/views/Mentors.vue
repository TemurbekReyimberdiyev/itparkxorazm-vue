<template>
  <div class="space-y-6">
    <!-- Statistics Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card class="p-3">
        <CardContent class="p-4">
          <div class="flex justify-between items-center">
            <div class="truncate">
              <p class="text-xs text-muted-foreground">Jami Mentorlar</p>
              <p class="text-lg font-semibold">{{ totalMentors }}</p>
            </div>
            <User class="w-6 h-6 text-blue-500" />
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
            <Users class="w-6 h-6 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card class="p-3">
        <CardContent class="p-4">
          <div class="flex justify-between items-center">
            <div class="truncate">
              <p class="text-xs text-muted-foreground">O'rtacha Tajriba</p>
              <p class="text-lg font-semibold">{{ avgExperience }}</p>
            </div>
            <Clock class="w-6 h-6 text-purple-500" />
          </div>
        </CardContent>
      </Card>

      <Card class="p-3">
        <CardContent class="p-4">
          <div class="flex justify-between items-center">
            <div class="truncate">
              <p class="text-xs text-muted-foreground">Faol Ko'nikmalar</p>
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
                <img
                  v-if="mentor.image_url"
                  :src="mentor.image_url"
                  alt="mentor"
                  class="w-12 h-12 rounded-full object-cover"
                />
              </TableCell>

              <TableCell>
                <p>{{ mentor.first_name }} {{ mentor.last_name }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ (mentor.education || '').slice(0, 30) }}...
                </p>
              </TableCell>

              <TableCell>
                <Badge variant="outline">
                  {{ mentor.course ? mentor.course.name : "Noma'lum kurs" }}
                </Badge>
              </TableCell>

              <TableCell>{{ mentor.experience_years }} yil</TableCell>
              <TableCell>{{ mentor.students || 0 }} ta</TableCell>

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
                  <Badge
                    v-if="getMentorSkills(mentor).length > 2"
                    variant="secondary"
                    class="text-xs"
                  >
                    +{{ getMentorSkills(mentor).length - 2 }}
                  </Badge>
                </div>
              </TableCell>

              <TableCell>
                <div class="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    @click="handleSkillsManagement(mentor)"
                  >
                    <Award class="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    @click="openEditDialog(mentor)"
                  >
                    <Edit class="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    @click="confirmDelete(mentor)"
                  >
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
    <Dialog :open="isDialogOpen" @update:open="setIsDialogOpen">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {{ editingMentor ? "Mentorni Tahrirlash" : "Yangi Mentor Qo'shish" }}
          </DialogTitle>
        </DialogHeader>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>Ism</Label>
              <Input
                v-model="formData.first_name"
                placeholder="Ismni kiriting"
                required
              />
            </div>

            <div class="space-y-2">
              <Label>Familiya</Label>
              <Input
                v-model="formData.last_name"
                placeholder="Familiyani kiriting"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label>Kurs</Label>
            <Select v-model="formData.course_id">
              <SelectTrigger>
                <SelectValue placeholder="Kursni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="course in courses"
                  :key="course.id"
                  :value="course.id"
                >
                  {{ course.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label>Ta'lim</Label>
            <Textarea
              v-model="formData.education"
              placeholder="Ta'lim ma'lumotlarini kiriting"
              :rows="2"
              required
            />
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div class="space-y-2">
              <Label>Tajriba (yil)</Label>
              <Input
                type="number"
                v-model="formData.experience_years"
                min="0"
                required
              />
            </div>

            <div class="space-y-2">
              <Label>Talabalar soni</Label>
              <Input
                type="number"
                v-model="formData.students"
                min="0"
                required
              />
            </div>

            <div class="space-y-2">
              <Label>Profil rasmi</Label>
              <Input type="file" accept="image/*" @change="onImageChange" />
              <div v-if="previewImage" class="mt-2">
                <p class="text-sm text-muted-foreground">Hozirgi rasm:</p>
                <img
                  :src="previewImage"
                  alt="preview"
                  class="w-20 h-20 rounded object-cover mt-1"
                />
              </div>
            </div>
          </div>

          <div class="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              @click="isDialogOpen = false"
            >
              Bekor qilish
            </Button>
            <Button type="submit" :disabled="loading">
              {{ editingMentor ? "Saqlash" : "Qo'shish" }}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Skills Dialog -->
    <Dialog :open="isSkillDialogOpen" @update:open="setIsSkillDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {{ selectedMentorForSkills?.first_name }}
            {{ selectedMentorForSkills?.last_name }} - Ko'nikmalar
          </DialogTitle>
        </DialogHeader>

        <div v-if="selectedMentorForSkills" class="space-y-4">
          <p class="text-sm text-muted-foreground">
            Mentor uchun ko'nikmalarni tanlang:
          </p>

          <div class="space-y-3">
            <div
              v-for="skill in skills"
              :key="skill.id"
              class="flex items-center gap-3"
            >
              <Checkbox
                :id="`skill-${skill.id}`"
                :checked="isSkillSelected(selectedMentorForSkills, skill.id)"
                @update:checked="
                  (checked) => handleSkillToggle(skill.id, checked)
                "
              />
              <img
                v-if="skill.icon_url"
                :src="skill.icon_url"
                class="w-8 h-8 rounded object-cover"
                :alt="skill.name"
              />
              <Label :for="`skill-${skill.id}`">{{ skill.name }}</Label>
            </div>
          </div>

          <div class="flex justify-end">
            <Button @click="isSkillDialogOpen = false">Yopish</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation -->
    <Dialog :open="isDeleteConfirmOpen" @update:open="setIsDeleteConfirmOpen">
      <DialogContent class="max-w-md">
        <DialogHeader>
          <DialogTitle>Ushbu ma'lumotni o'chirmoqchimisiz?</DialogTitle>
        </DialogHeader>

        <div class="space-y-4">
          <p class="text-sm text-muted-foreground">
            <strong
              >{{ mentorToDelete?.first_name }}
              {{ mentorToDelete?.last_name }}</strong
            >
            ismli mentor ma'lumotlari o'chiriladi. Ishonchingiz komilmi?
          </p>

          <div class="flex justify-end gap-2">
            <Button
              variant="outline"
              @click="isDeleteConfirmOpen = false"
            >
              Yo'q
            </Button>
            <Button variant="destructive" @click="performDelete">
              Ha, o'chirish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/admin/components/ui/card'
import { Button } from '@/admin/components/ui/button'
import { Input } from '@/admin/components/ui/input'
import { Label } from '@/admin/components/ui/label'
import { Textarea } from '@/admin/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/admin/components/ui/select'
import { Badge } from '@/admin/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/admin/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/admin/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Edit, Trash2, Award, User, Users, Clock } from 'lucide-vue-next'
// Assume toast is available, e.g., from vue-sonner
import { toast } from '@/admin/components/ui/toast'

import type { Mentor, Course, Skill } from '../types/database'

const API_URL = 'https://itparkxorazm-laravel.test/api'

// State management
const mentorsData = ref<Mentor[]>([])
const skills = ref<Skill[]>([])
const courses = ref<Course[]>([])
const isDialogOpen = ref(false)
const setIsDialogOpen = (value: boolean) => { isDialogOpen.value = value }
const isSkillDialogOpen = ref(false)
const setIsSkillDialogOpen = (value: boolean) => { isSkillDialogOpen.value = value }
const editingMentor = ref<Mentor | null>(null)
const selectedMentorForSkills = ref<Mentor | null>(null)
const isDeleteConfirmOpen = ref(false)
const setIsDeleteConfirmOpen = (value: boolean) => { isDeleteConfirmOpen.value = value }
const mentorToDelete = ref<Mentor | null>(null)
const loading = ref(false)
const previewImage = ref<string>('')

// Form data
interface MentorFormData {
  id?: number
  first_name: string
  last_name: string
  course_id: number | string
  education: string
  experience_years: number
  students: number
  image?: string | File
  email?: string
  phone?: string
}
const formData = ref<MentorFormData>({
  first_name: '',
  last_name: '',
  course_id: '',
  education: '',
  experience_years: 1,
  students: 0,
  image: '',
  email: '',
  phone: '',
})

// Computed values
const totalMentors = computed(() => mentorsData.value.length)
const totalStudents = computed(() =>
  mentorsData.value.reduce((sum, mentor) => sum + (mentor.students || 0), 0)
)
const avgExperience = computed(() => {
  if (!mentorsData.value.length) return '0 yil'
  const avg =
    mentorsData.value.reduce((sum, mentor) => sum + (mentor.experience_years || 0), 0) /
    mentorsData.value.length
  return `${avg.toFixed(1)} yil`
})
const activeSkillsCount = computed(() => {
  const allSkills = mentorsData.value.flatMap((mentor) => mentor.skill_ids || [])
  const uniqueSkills = new Set(allSkills)
  return uniqueSkills.size
})

// API functions
const fetchMentors = async () => {
  try {
    const res = await fetch(`${API_URL}/mentors`)
    const data = await res.json()
    mentorsData.value = data.map((m: any) => ({
      ...m,
      skill_ids: m.skills ? m.skills.map((s: Skill) => s.id) : [],
    }))
  } catch (err) {
    console.error('fetchMentors error:', err)
    toast.error("Mentorlar yuklanmadi")
  }
}

const fetchSkills = async () => {
  try {
    const res = await fetch(`${API_URL}/skills`)
    const data = await res.json()
    skills.value = data || []
  } catch (err) {
    console.error('fetchSkills error:', err)
    toast.error("Ko'nikmalar yuklanmadi")
  }
}

const fetchCourses = async () => {
  try {
    const res = await fetch(`${API_URL}/courses`)
    const data = await res.json()
    courses.value = data || []
    if (!formData.value.course_id && courses.value.length) {
      formData.value.course_id = courses.value[0].id
    }
  } catch (err) {
    console.error('fetchCourses error:', err)
    toast.error('Kurslar yuklanmadi')
  }
}

// Utility functions
const resetForm = (keepCourse = false) => {
  formData.value = {
    first_name: '',
    last_name: '',
    course_id: keepCourse
      ? formData.value.course_id
      : courses.value.length
      ? courses.value[0].id
      : '',
    education: '',
    experience_years: 1,
    students: 0,
    image: '',
    email: '',
    phone: '',
  }
  previewImage.value = ''
}

const openCreateDialog = () => {
  editingMentor.value = null
  resetForm()
  isDialogOpen.value = true
}

const openEditDialog = (mentor: Mentor) => {
  editingMentor.value = mentor
  formData.value = {
    id: mentor.id,
    first_name: mentor.first_name || '',
    last_name: mentor.last_name || '',
    course_id: mentor.course_id || (courses.value[0]?.id || ''),
    education: mentor.education || '',
    experience_years: mentor.experience_years || 1,
    students: mentor.students || 0,
    image: mentor.image_url || '',
    email: mentor.email || '',
    phone: mentor.phone || '',
  }
  previewImage.value = mentor.image_url || ''
  isDialogOpen.value = true
}

const getMentorSkills = (mentor: Mentor) => {
  if (!mentor.skill_ids) return []
  return skills.value.filter((skill) => mentor.skill_ids?.includes(skill.id))
}

const onImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    formData.value.image = file
    previewImage.value = URL.createObjectURL(file)
  }
}

// Submit handler
const handleSubmit = async () => {
  loading.value = true

  // Validation
  if (!formData.value.first_name || !formData.value.last_name) {
    toast.error("Ism va familya majburiy")
    loading.value = false
    return
  }

  if (!editingMentor.value && !formData.value.image) {
    toast.error("Rasm yuklash majburiy")
    loading.value = false
    return
  }

  try {
    const fd = new FormData()
    fd.append('first_name', formData.value.first_name)
    fd.append('last_name', formData.value.last_name)
    fd.append('course_id', formData.value.course_id.toString())
    fd.append('education', formData.value.education)
    fd.append('experience_years', formData.value.experience_years.toString())
    fd.append('students', formData.value.students.toString())
    if (formData.value.email) fd.append('email', formData.value.email)
    if (formData.value.phone) fd.append('phone', formData.value.phone)
    if (formData.value.image instanceof File) fd.append('image', formData.value.image)

    const url = editingMentor.value
      ? `${API_URL}/mentors/${editingMentor.value.id}`
      : `${API_URL}/mentors`
    const method = editingMentor.value ? 'PUT' : 'POST'

    const res = await fetch(url, { method, body: fd })
    if (!res.ok) throw new Error('API error')

    await fetchMentors() // Refetch to update list
    toast.success(editingMentor.value ? "Mentor muvaffaqiyatli tahrirlandi" : "Mentor muvaffaqiyatli qo'shildi")
    isDialogOpen.value = false
    resetForm()
  } catch (error) {
    console.error(error)
    toast.error('Xatolik yuz berdi')
  } finally {
    loading.value = false
  }
}

// Delete handlers
const confirmDelete = (mentor: Mentor) => {
  mentorToDelete.value = mentor
  isDeleteConfirmOpen.value = true
}

const performDelete = async () => {
  if (!mentorToDelete.value) return

  try {
    await fetch(`${API_URL}/mentors/${mentorToDelete.value.id}`, { method: 'DELETE' })
    await fetchMentors()
    isDeleteConfirmOpen.value = false
    mentorToDelete.value = null
    toast.success("Mentor muvaffaqiyatli o'chirildi")
  } catch (err) {
    console.error('performDelete error:', err)
    toast.error("O'chirishda xatolik yuz berdi")
  }
}

// Skills management
const handleSkillsManagement = (mentor: Mentor) => {
  selectedMentorForSkills.value = { ...mentor }
  isSkillDialogOpen.value = true
}

const handleSkillToggle = async (skillId: number, checked: boolean) => {
  if (!selectedMentorForSkills.value) return
  const mentorId = selectedMentorForSkills.value.id

  try {
    const url = checked
      ? `${API_URL}/mentors/${mentorId}/skills`
      : `${API_URL}/mentors/${mentorId}/skills/${skillId}`
    const method = checked ? 'POST' : 'DELETE'
    const body = checked ? JSON.stringify({ skill_id: skillId }) : null
    const headers = checked ? { 'Content-Type': 'application/json' } : undefined

    const res = await fetch(url, { method, body, headers })
    if (!res.ok) throw new Error('API error')

    // Update local state
    mentorsData.value = mentorsData.value.map((mentor) => {
      if (mentor.id === mentorId) {
        const skillIds = mentor.skill_ids || []
        const updatedSkillIds = checked
          ? [...new Set([...skillIds, skillId])]
          : skillIds.filter((id) => id !== skillId)
        return { ...mentor, skill_ids: updatedSkillIds }
      }
      return mentor
    })

    selectedMentorForSkills.value = {
      ...selectedMentorForSkills.value,
      skill_ids: mentorsData.value.find((m) => m.id === mentorId)?.skill_ids || [],
    }

    toast.success(checked ? "Ko'nikma qo'shildi" : "Ko'nikma olib tashlandi")
  } catch (err) {
    console.error('handleSkillToggle error:', err)
    toast.error("Ko'nikmani o'zgartirishda xatolik")
  }
}

const isSkillSelected = (mentor: Mentor | null, skillId: number): boolean => {
  if (!mentor) return false
  return (mentor.skill_ids || []).includes(skillId)
}

// Effects
onMounted(() => {
  fetchMentors()
  fetchSkills()
  fetchCourses()
})
</script>