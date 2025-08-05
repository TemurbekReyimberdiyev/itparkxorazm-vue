<script setup>
import { ref, reactive, computed } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/admin/components/ui/dialog'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/admin/components/ui/card'
import { Button } from '@/admin/components/ui/button'
import { Input } from '@/admin/components/ui/input'
import { Textarea } from '@/admin/components/ui/textarea'
import ImageUpload from '@/admin/views/ImageUpload.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/admin/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/admin/components/ui/table'
import { Badge } from '@/admin/components/ui/badge'
import { Checkbox } from '@/admin/components/ui/checkbox'
import { Plus, Edit, Trash2, Eye, Award } from 'lucide-vue-next'
import { mentors as initialMentors, courses, skills } from '@/admin/data/mockData'

const mentorsData = ref([...initialMentors])
const mentorSkills = ref([
  { id: 1, mentor_id: 1, skill_id: 1 },
  { id: 2, mentor_id: 1, skill_id: 2 },
  { id: 3, mentor_id: 2, skill_id: 1 },
  { id: 4, mentor_id: 2, skill_id: 3 },
  { id: 5, mentor_id: 3, skill_id: 4 },
])

const isDialogOpen = ref(false)
const isSkillDialogOpen = ref(false)
const editingMentor = ref(null)
const selectedMentorForSkills = ref(null)

const formData = reactive({
  first_name: '',
  last_name: '',
  course_id: 1,
  education: '',
  experience_years: 1,
  students: 0,
  image_url: ''
})

const resetForm = () => {
  Object.assign(formData, {
    first_name: '',
    last_name: '',
    course_id: 1,
    education: '',
    experience_years: 1,
    students: 0,
    image_url: ''
  })
}

const handleSubmit = () => {
  if (editingMentor.value) {
    const index = mentorsData.value.findIndex(m => m.id === editingMentor.value.id)
    mentorsData.value[index] = { ...editingMentor.value, ...formData }
  } else {
    const newMentor = {
      id: Math.max(...mentorsData.value.map(m => m.id)) + 1,
      ...formData
    }
    mentorsData.value.push(newMentor)
  }
  isDialogOpen.value = false
  editingMentor.value = null
  resetForm()
}

const handleEdit = (mentor) => {
  editingMentor.value = mentor
  Object.assign(formData, mentor)
  isDialogOpen.value = true
}

const handleDelete = (id) => {
  mentorsData.value = mentorsData.value.filter(m => m.id !== id)
  mentorSkills.value = mentorSkills.value.filter(ms => ms.mentor_id !== id)
}

const handleSkillsManagement = (mentor) => {
  selectedMentorForSkills.value = mentor
  isSkillDialogOpen.value = true
}

const handleSkillToggle = (skillId, checked) => {
  const mentorId = selectedMentorForSkills.value.id
  if (checked) {
    mentorSkills.value.push({
      id: Math.max(...mentorSkills.value.map(ms => ms.id), 0) + 1,
      mentor_id: mentorId,
      skill_id: skillId,
    })
  } else {
    mentorSkills.value = mentorSkills.value.filter(ms => !(ms.mentor_id === mentorId && ms.skill_id === skillId))
  }
}

const getCourseName = (courseId) => courses.find(course => course.id === courseId)?.name || 'Noma\'lum kurs'
const getMentorSkills = (mentorId) => skills.filter(skill => mentorSkills.value.some(ms => ms.mentor_id === mentorId && ms.skill_id === skill.id))
const isSkillSelected = (mentorId, skillId) => mentorSkills.value.some(ms => ms.mentor_id === mentorId && ms.skill_id === skillId)
</script>

<template>
  <div class="space-y-6">
    <!-- Cards and Stats -->
    <!-- Cards and Stats -->
<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
  <Card
    v-for="(stat, i) in [
      { title: 'Jami Mentorlar', value: mentorsData.length, color: 'text-blue-500' },
      { title: 'Jami Talabalar', value: mentorsData.reduce((sum, m) => sum + m.students, 0), color: 'text-green-500' },
      { title: 'O‘rtacha Tajriba', value: (mentorsData.reduce((sum, m) => sum + m.experience_years, 0) / mentorsData.length).toFixed(1) + ' yil', color: 'text-purple-500' },
      { title: 'Faol Ko‘nikmalar', value: mentorSkills.length, color: 'text-orange-500' }
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

    <!-- Table of Mentors -->
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
                  <Badge v-for="skill in getMentorSkills(mentor.id).slice(0, 2)" :key="skill.id" variant="secondary" class="text-xs">
                    {{ skill.name }}
                  </Badge>
                  <Badge v-if="getMentorSkills(mentor.id).length > 2" variant="secondary" class="text-xs">
                    +{{ getMentorSkills(mentor.id).length - 2 }}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" @click="handleSkillsManagement(mentor)"><Award class="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" @click="handleEdit(mentor)"><Edit class="w-4 h-4" /></Button>
                  <Button size="sm" variant="destructive" @click="handleDelete(mentor.id)"><Trash2 class="w-4 h-4" /></Button>
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
        <Button @click="() => { editingMentor = null; resetForm() }">
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
      <Select v-model="selectedCourseId">
        <SelectTrigger>
          <SelectValue placeholder="Kursni tanlang" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="course in courses"
            :key="course.id"
            :value="course.id.toString()"
          >
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
        <Input
          type="number"
          v-model.number="formData.experience_years"
          min="0"
          required
        />
      </div>
      <div class="space-y-2">
        <label>Talabalar soni</label>
        <Input
          type="number"
          v-model.number="formData.students"
          min="0"
          required
        />
      </div>
      <div class="space-y-2">
        <label>Profil rasmi</label>
        <ImageUpload
    v-model:value="formData.image_url"
    placeholder="Mentor rasmini yuklang"
  />
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
              <Checkbox :id="`skill-${skill.id}`" :checked="isSkillSelected(selectedMentorForSkills.id, skill.id)" @update:checked="val => handleSkillToggle(skill.id, val)" />
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
</template>

<style scoped></style>
