<script setup lang="ts">
import { ref } from 'vue'
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

import { skills as initialSkills, mentors } from '@/admin/data/mockData'
import type { Skill } from '@/admin/types/database'

// State
const skillsData = ref<Skill[]>([...initialSkills])
const isDialogOpen = ref(false)
const editingSkill = ref<Skill | null>(null)
const formData = ref<Partial<Skill>>({
  name: '',
  image_url: ''
})

// Mock skill-mentor relationships
const mentorSkills = [
  { id: 1, mentor_id: 1, skill_id: 1 },
  { id: 2, mentor_id: 1, skill_id: 2 },
  { id: 3, mentor_id: 2, skill_id: 1 },
  { id: 4, mentor_id: 2, skill_id: 3 },
  { id: 5, mentor_id: 3, skill_id: 4 }
]

// Utils
function resetForm() {
  formData.value = { name: '', image_url: '' }
}

function handleEdit(skill: Skill) {
  editingSkill.value = skill
  formData.value = { ...skill }
  isDialogOpen.value = true
}

function handleDelete(id: number) {
  skillsData.value = skillsData.value.filter(skill => skill.id !== id)
}

function handleSubmit(e: Event) {
  e.preventDefault()
  if (editingSkill.value) {
    skillsData.value = skillsData.value.map(s =>
      s.id === editingSkill.value!.id ? { ...s, ...formData.value } as Skill : s
    )
  } else {
    const newSkill: Skill = {
      id: Math.max(...skillsData.value.map(s => s.id)) + 1,
      name: formData.value.name || '',
      image_url: formData.value.image_url || ''
    }
    skillsData.value.push(newSkill)
  }
  isDialogOpen.value = false
  editingSkill.value = null
  resetForm()
}

function getMentorCount(skillId: number) {
  return mentorSkills.filter(ms => ms.skill_id === skillId).length
}

function getMentorsWithSkill(skillId: number) {
  const mentorIds = mentorSkills.filter(ms => ms.skill_id === skillId).map(ms => ms.mentor_id)
  return mentors.filter(m => mentorIds.includes(m.id))
}

function getDefaultImageUrl(skillName: string) {
  const skillImages: Record<string, string> = {
    'JavaScript': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop',
    'React': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop',
    'Node.js': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop',
    'Flutter': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop',
    'Python': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100&h=100&fit=crop'
  }
  return skillImages[skillName] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop'
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
            <Plus class="w-4 h-4 mr-2" />
            Yangi Ko'nikma
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {{ editingSkill ? "Ko'nikmani Tahrirlash" : "Yangi Ko'nikma Qo'shish" }}
            </DialogTitle>
          </DialogHeader>

          <form @submit="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <label>Ko'nikma nomi</label>
              <Input v-model="formData.name" required placeholder="Ko'nikma nomini kiriting" />
            </div>
            <div class="space-y-2">
  <label>Ko'nikma rasmi</label>
  <ImageUpload
    :value="formData.image_url"
    @change="(url) => formData.image_url = url"
    placeholder="Ko'nikma rasmini yuklang"
  />
  <!-- <p class="text-sm text-muted-foreground">Bo'sh qoldirilsa, default rasm avtomatik qo‘shiladi</p> -->
</div>
            <div v-if="formData.name" class="space-y-2">
              <label>Preview</label>
              <div class="flex items-center gap-3 p-3 border rounded-lg">
                <img :src="formData.image_url || getDefaultImageUrl(formData.name)" class="w-12 h-12 rounded object-cover" />
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

    <!-- Skills Stats -->
<div class="flex flex-wrap gap-4">
  <Card class="flex-1 min-w-[150px]">
    <CardContent class="p-4 sm:p-6 flex justify-between items-center">
      <div>
        <p class="text-xs sm:text-sm text-muted-foreground">Jami Ko'nikmalar</p>
        <p class="text-lg sm:text-2xl font-semibold">{{ skillsData.length }}</p>
      </div>
      <Award class="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
    </CardContent>
  </Card>

  <Card class="flex-1 min-w-[150px]">
    <CardContent class="p-4 sm:p-6 flex justify-between items-center">
      <div>
        <p class="text-xs sm:text-sm text-muted-foreground">Faol Ko'nikmalar</p>
        <p class="text-lg sm:text-2xl font-semibold">
          {{ skillsData.filter(s => getMentorCount(s.id) > 0).length }}
        </p>
      </div>
      <Users class="w-6 sm:w-8 h-6 sm:h-8 text-green-500" />
    </CardContent>
  </Card>

  <Card class="flex-1 min-w-[150px]">
    <CardContent class="p-4 sm:p-6 flex justify-between items-center">
      <div>
        <p class="text-xs sm:text-sm text-muted-foreground">Eng Mashhur</p>
        <p class="text-lg sm:text-2xl font-semibold">
          {{ skillsData.length ? skillsData.reduce((a, b) => getMentorCount(b.id) > getMentorCount(a.id) ? b : a).name.slice(0, 10) : '-' }}
        </p>
      </div>
      <Award class="w-6 sm:w-8 h-6 sm:h-8 text-purple-500" />
    </CardContent>
  </Card>
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
                <img :src="skill.image_url || getDefaultImageUrl(skill.name)" class="w-10 h-10 rounded object-cover" />
              </TableCell>
              <TableCell>{{ skill.name }}</TableCell>
              <TableCell><Badge variant="secondary">{{ getMentorCount(skill.id) }} mentor</Badge></TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" @click="handleEdit(skill)">
                    <Edit class="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" @click="handleDelete(skill.id)">
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Skill Statistics -->
    <Card>
      <CardHeader><CardTitle>Ko'nikmalar Statistikasi</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div v-for="skill in skillsData" :key="skill.id" class="space-y-2">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
              <img :src="skill.image_url || getDefaultImageUrl(skill.name)" class="w-6 h-6 rounded object-cover" />
              <span class="text-sm">{{ skill.name }}</span>
            </div>
            <span class="text-sm text-muted-foreground">{{ getMentorCount(skill.id) }} mentor</span>
          </div>
          <div class="w-full bg-muted rounded-full h-2">
            <div class="bg-primary h-2 rounded-full" :style="{ width: `${Math.min((getMentorCount(skill.id) / mentors.length) * 100, 100)}%` }"></div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Mentors by Skill -->
    <Card>
      <CardHeader><CardTitle>Ko'nikmalar bo'yicha Mentorlar</CardTitle></CardHeader>
      <CardContent class="space-y-6">
        <div v-for="skill in skillsData.filter(s => getMentorCount(s.id) > 0)" :key="skill.id" class="space-y-3">
          <div class="flex items-center gap-3">
            <img :src="skill.image_url || getDefaultImageUrl(skill.name)" class="w-8 h-8 rounded object-cover" />
            <h4>{{ skill.name }}</h4>
            <Badge variant="outline">{{ getMentorCount(skill.id) }} mentor</Badge>
          </div>
          <div class="ml-11 space-y-2">
            <div v-for="mentor in getMentorsWithSkill(skill.id)" :key="mentor.id" class="flex items-center gap-3 p-2 bg-muted/50 rounded">
              <img :src="mentor.image_url" class="w-8 h-8 rounded-full object-cover" />
              <div>
                <p class="text-sm">{{ mentor.first_name }} {{ mentor.last_name }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ mentor.experience_years }} yil tajriba • {{ mentor.students }} talaba
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
