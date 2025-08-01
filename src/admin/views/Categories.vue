<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1>Kategoriyalar</h1>
        <p class="text-muted-foreground">Kurs kategoriyalarini boshqaring</p>
      </div>

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
                  <Button size="sm" variant="destructive" @click="handleDelete(category.id)">
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Plus, Edit, Trash2 } from 'lucide-vue-next';

// UI komponentlar (shadcn-vue dan yoki o'zingiz yaratgan variantlar)
import { Card, CardContent, CardHeader, CardTitle } from '@/admin/components/ui/card';
import { Button } from '@/admin/components/ui/button';
import { Input } from '@/admin/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/admin/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/admin/components/ui/table';
import { Badge } from '@/admin/components/ui/badge';

// Ma'lumotlar
import { categories, courses } from '@/admin/data/mockData';
import type { Category } from '@/admin/types/database';

const categoriesData = ref<Category[]>([...categories]);
const isDialogOpen = ref(false);
const editingCategory = ref<Category | null>(null);
const newCategoryName = ref('');

const setDialogOpen = (value: boolean) => {
  isDialogOpen.value = value;
  if (!value) {
    editingCategory.value = null;
    newCategoryName.value = '';
  }
};

const prepareAddCategory = () => {
  editingCategory.value = null;
  newCategoryName.value = '';
  isDialogOpen.value = true;
};

const handleSubmit = () => {
  const name = newCategoryName.value.trim();
  if (!name) return;

  if (editingCategory.value) {
    categoriesData.value = categoriesData.value.map((cat) =>
      cat.id === editingCategory.value!.id ? { ...cat, name } : cat
    );
  } else {
    const newId =
      Math.max(...categoriesData.value.map((c) => c.id)) + 1;
    categoriesData.value.push({ id: newId, name });
  }

  setDialogOpen(false);
};

const handleEdit = (category: Category) => {
  editingCategory.value = { ...category };
  newCategoryName.value = category.name;
  isDialogOpen.value = true;
};

const handleDelete = (id: number) => {
  categoriesData.value = categoriesData.value.filter((cat) => cat.id !== id);
};

const getCourseCount = (categoryId: number) => {
  return courses.filter((course) => course.category_id === categoryId).length;
};
</script>
