<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Ko'nikmalar</h1>
        <p class="text-muted-foreground">Texnologik ko'nikmalarni boshqaring</p>
      </div>

      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button @click="handleAddSkill">
            <Plus class="w-4 h-4 mr-2" /> Yangi Ko'nikma
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {{ editingSkill ? "Ko'nikmani Tahrirlash" : "Yangi Ko'nikma Qo'shish" }}
            </DialogTitle>
            <DialogDescription>
              {{ editingSkill ? "Ko'nikma ma'lumotlarini o'zgartiring va saqlang." : "Yangi ko'nikma ma'lumotlarini to'ldiring va qo'shing." }}
            </DialogDescription>
          </DialogHeader>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <Label>Ko'nikma nomi</Label>
              <Input v-model="formData.name" required placeholder="Ko'nikma nomini kiriting" />
            </div>

            <div class="space-y-2">
              <Label>Ko'nikma rasmi</Label>
              <ImageUpload v-model:value="formData.full_image_url" @change="handleImageChange" placeholder="Ko'nikma rasmini yuklang" />
            </div>

            <div v-if="formData.name" class="space-y-2">
              <Label>Preview</Label>
              <div class="flex items-center gap-3 p-3 border rounded-lg">
                <img :src="formData.full_image_url || '/no-image.png'" :alt="formData.name" class="w-12 h-12 rounded object-cover" />
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
    <TableHead>№</TableHead> <!-- 🟢 Yangi ustun qo‘shildi -->
    <TableHead>Rasm</TableHead>
    <TableHead>Nom</TableHead>
    <TableHead>Mentorlar</TableHead>
    <TableHead>Amallar</TableHead>
  </TableRow>
</TableHeader>

          <TableBody>
  <TableRow v-for="(skill, index) in skillsData" :key="skill.id">
    <TableCell>{{ index + 1 }}</TableCell> <!-- 🟢 Tartib raqam chiqadi -->

    <TableCell>
      <img
        :src="skill.full_image_url || '/no-image.png'"
        :alt="skill.name"
        class="w-10 h-10 rounded object-cover"
      />
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
        <Button size="sm" variant="destructive" @click="handleDeleteClick(skill)">
          <Trash2 class="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
</TableBody>

        </Table>

        <div v-if="skillsData.length === 0" class="text-center py-8">
          <p class="text-muted-foreground">Hozircha ko'nikmalar yo'q</p>
        </div>
      </CardContent>
    </Card>

    <!-- Delete Confirmation -->
    <Dialog v-model:open="isDeleteDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ko'nikmani o'chirishni tasdiqlaysizmi?</DialogTitle>
          <DialogDescription>Bu amal qaytarib bo'lmaydigan amal hisoblanadi.</DialogDescription>
        </DialogHeader>
        <p class="text-sm text-muted-foreground">
          "{{ skillToDelete?.name }}" nomli ko'nikma o'chiriladi.
        </p>
        <div class="flex justify-end gap-2 mt-4">
          <Button variant="outline" @click="isDeleteDialogOpen = false">Bekor qilish</Button>
          <Button variant="destructive" @click="handleDeleteConfirm">Ha, o'chir</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { Card, CardContent, CardHeader, CardTitle } from "@/admin/components/ui/card"
import { Button } from "@/admin/components/ui/button"
import { Input } from "@/admin/components/ui/input"
import { Label } from "@/admin/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/admin/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/admin/components/ui/table"
import { Badge } from "@/admin/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-vue-next"
import { toast } from "@/admin/components/ui/toast"

import ImageUpload from "./ImageUpload.vue"

const API_URL = "https://itparkxorazm-laravel.test/api/skills"

interface Skill {
  id: number
  name: string
  image_path: string
  full_image_url: string
  mentors?: any[]
}

interface SkillFormData {
  name: string
  image_path: string
  full_image_url: string
}

// state
const skillsData = ref<Skill[]>([])
const isDialogOpen = ref(false)
const editingSkill = ref<Skill | null>(null)
const formData = reactive<SkillFormData>({ name: "", image_path: "", full_image_url: "" })

const isDeleteDialogOpen = ref(false)
const skillToDelete = ref<Skill | null>(null)

const fetchSkills = async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error("API error")
    skillsData.value = await res.json()
  } catch (e) {
    // toast.error("Ko'nikmalarni yuklashda xatolik yuz berdi")
    skillsData.value = []
  }
}

onMounted(fetchSkills)

const handleSubmit = async () => {
  if (!formData.name.trim()) {
    // toast.error("Ko'nikma nomi kiritilishi shart")
    return
  }

  try {
    const url = editingSkill.value ? `${API_URL}/${editingSkill.value.id}` : API_URL
    const method = "POST" // PUT uchun _method ishlatamiz
    const fd = new FormData()
    fd.append("name", formData.name)

    // 🔽 To‘g‘ri maydon nomi
    if (formData.image_path instanceof File) {
      fd.append("image", formData.image_path) // ✅ backend image kutilmoqda
    }

    if (editingSkill.value) {
      fd.append("_method", "PUT")
    }

    const res = await fetch(url, {
      method,
      body: fd,
    })

    if (!res.ok) throw new Error("Save error")

    await fetchSkills()
    isDialogOpen.value = false
    editingSkill.value = null
    resetForm()
    // toast.success(editingSkill.value ? "Ko'nikma yangilandi" : "Ko'nikma qo'shildi")
  } catch (e) {
    // toast.error("Saqlashda xatolik yuz berdi")
  }
}

const resetForm = () => {
  formData.name = ""
  formData.image_path = ""
  formData.full_image_url = ""
}

const handleEdit = (skill: Skill) => {
  editingSkill.value = skill
  formData.name = skill.name
  formData.image_path = skill.image_path
  formData.full_image_url = skill.full_image_url
  isDialogOpen.value = true
}

const getMentorCount = (skill: Skill) => skill.mentors ? skill.mentors.length : 0

const handleImageChange = (payload: File | string | null) => {
  if (payload instanceof File) {
    formData.image_path = payload
    formData.full_image_url = URL.createObjectURL(payload)
  } else if (typeof payload === "string") {
    formData.full_image_url = payload
  } else {
    formData.image_path = ""
    formData.full_image_url = ""
  }
}

const handleAddSkill = () => {
  editingSkill.value = null
  resetForm()
  isDialogOpen.value = true
}

const handleDeleteClick = (skill: Skill) => {
  skillToDelete.value = skill
  isDeleteDialogOpen.value = true
}

const handleDeleteConfirm = async () => {
  if (!skillToDelete.value) return
  try {
    const res = await fetch(`${API_URL}/${skillToDelete.value.id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Delete error")
    await fetchSkills()
    // toast.success("Ko'nikma o'chirildi")
  } catch (e) {
    // toast.error("O'chirishda xatolik yuz berdi")
  }
  isDeleteDialogOpen.value = false
  skillToDelete.value = null
}
</script>
