<template>
  <div class="space-y-6">
    <!-- Header va modal trigger -->
    <div class="flex items-center justify-between">
      <div>
        <h1>Kurslar</h1>
        <p class="text-muted-foreground">O'quv kurslarini boshqaring</p>
      </div>

      <Dialog :open="isDialogOpen" @update:open="setDialogOpen">
        <DialogTrigger as-child>
          <Button @click="prepareAddCourse">
            <Plus class="w-4 h-4 mr-2" />
            Yangi Kurs
          </Button>
        </DialogTrigger>

        <DialogContent class="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{{ editingCourse ? 'Kursni Tahrirlash' : 'Yangi Kurs Qo\'shish' }}</DialogTitle>
          </DialogHeader>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label>Kurs nomi</label>
                <Input v-model="formData.name" required placeholder="Kurs nomi" />
              </div>
              <div class="space-y-2">
                <label>Kategoriya</label>
                <Select v-model="formData.category_id">
                  <SelectTrigger>
                    <SelectValue placeholder="Kategoriyani tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
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
                <label>Rasm URL</label>
                <Input
                  v-model="formData.image_url"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div class="flex gap-2 justify-end">
              <Button variant="outline" type="button" @click="setDialogOpen(false)">
                Bekor qilish
              </Button>
              <Button type="submit">
                {{ editingCourse ? 'Saqlash' : 'Qo\'shish' }}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    <!-- Table qismi -->
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
                  :src="course.image_url"
                  class="w-12 h-12 object-cover rounded-lg"
                  :alt="course.name"
                />
              </TableCell>
              <TableCell>
                <div>
                  <p>{{ course.name }}</p>
                  <p class="text-sm text-muted-foreground">{{ course.heading }}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{{ getCategoryName(course.category_id) }}</Badge>
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
                  <Button size="sm" variant="destructive" @click="handleDelete(course.id)">
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <Dialog :open="isViewDialogOpen" @update:open="val => isViewDialogOpen = val">
  <DialogContent class="w-full max-w-2xl">
    <DialogHeader>
      <DialogTitle>Kurs Tafsilotlari</DialogTitle>
    </DialogHeader>
    <div v-if="viewingCourse" class="space-y-4">
      <img :src="viewingCourse.image_url" class="w-full h-64 object-cover rounded-lg" alt="Kurs rasmi" />
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Plus, Edit, Trash2, Eye } from 'lucide-vue-next';

import {Button} from '@/admin/components/ui/button';
import {Input} from '@/admin/components/ui/input';
import {Textarea} from '@/admin/components/ui/textarea';
import {Badge} from '@/admin/components/ui/badge';

import {Card, CardContent, CardHeader, CardTitle} from '@/admin/components/ui/card';

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/admin/components/ui/dialog';


import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/admin/components/ui/table';

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/admin/components/ui/select';

import { courses as initialCourses, categories } from '@/admin/data/mockData';
import type { Course } from '@/admin/types/database';
const isViewDialogOpen = ref(false);
const viewingCourse = ref<Course | null>(null);

const handleView = (course: Course) => {
  viewingCourse.value = course;
  isViewDialogOpen.value = true;
};
const coursesData = ref<Course[]>([...initialCourses]);
const isDialogOpen = ref(false);
const editingCourse = ref<Course | null>(null);

const formData = ref<Partial<Course>>({
  name: '',
  heading: '',
  description: '',
  category_id: 1,
  duration_month: 1,
  cost: 0,
  image_url: ''
});

const prepareAddCourse = () => {
  editingCourse.value = null;
  resetForm();
  isDialogOpen.value = true;
};

const resetForm = () => {
  formData.value = {
    name: '',
    heading: '',
    description: '',
    category_id: 1,
    duration_month: 1,
    cost: 0,
    image_url: ''
  };
};

const setDialogOpen = (val: boolean) => {
  isDialogOpen.value = val;
  if (!val) {
    editingCourse.value = null;
    resetForm();
  }
};

const handleSubmit = () => {
  if (editingCourse.value) {
    coursesData.value = coursesData.value.map((c) =>
      c.id === editingCourse.value!.id ? { ...c, ...formData.value } as Course : c
    );
  } else {
    const newId = Math.max(...coursesData.value.map((c) => c.id)) + 1;
    coursesData.value.push({ id: newId, ...formData.value } as Course);
  }
  setDialogOpen(false);
};

const handleEdit = (course: Course) => {
  editingCourse.value = { ...course };
  formData.value = { ...course };
  isDialogOpen.value = true;
};

const handleDelete = (id: number) => {
  coursesData.value = coursesData.value.filter((c) => c.id !== id);
};

const getCategoryName = (categoryId: number) => {
  return categories.find((cat) => cat.id === categoryId)?.name || 'Noma\'lum';
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
};
</script>
