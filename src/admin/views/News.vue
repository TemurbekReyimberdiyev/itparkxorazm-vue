<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Yangiliklar</h1>
        <p class="text-muted-foreground">O'quv markazi yangiliklarini boshqaring</p>
      </div>
      <Dialog :open="isDialogOpen" @update:open="val => isDialogOpen = val">
        <DialogTrigger as="div">
          <Button @click="openNewDialog">
            <Plus class="w-4 h-4 mr-2" /> Yangi Xabar
          </Button>
        </DialogTrigger>
        <DialogContent class="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{{ editingNews ? 'Xabarni Tahrirlash' : 'Yangi Xabar Qo\'shish' }}</DialogTitle>
          </DialogHeader>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <label>Sarlavha</label>
              <Input v-model="formData.heading" placeholder="Xabar sarlavhasini kiriting" required />
            </div>
            <div class="space-y-2">
              <label>Matn</label>
              <Textarea v-model="formData.description" rows="5" placeholder="Xabar matnini kiriting" required />
            </div>
            <div class="space-y-2">
              <label>Rasm URL</label>
              <Input v-model="formData.image_url" placeholder="https://example.com/image.jpg" />
              <p class="text-sm text-muted-foreground">Bo'sh qoldiring, default rasm ishlatiladi</p>
            </div>
            <div v-if="formData.heading || formData.description" class="space-y-2">
              <label>Preview</label>
              <div class="border rounded-lg p-4 space-y-3">
                <img :src="formData.image_url || defaultImage" alt="Preview" class="w-full h-48 rounded object-cover" />
                <div>
                  <h4>{{ formData.heading || 'Sarlavha' }}</h4>
                  <p class="text-sm text-muted-foreground mt-2">{{ previewDescription }}</p>
                </div>
              </div>
            </div>
            <div class="flex justify-end gap-2">
              <Button variant="outline" type="button" @click="isDialogOpen = false">Bekor qilish</Button>
              <Button type="submit">{{ editingNews ? 'Saqlash' : 'Qo\'shish' }}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <StatCard title="Jami Yangiliklar" :value="newsData.length" icon="Calendar" color="blue" />
      <StatCard title="Bu Hafta" :value="recentNewsCount" icon="TrendingUp" color="green" />
      <StatCard title="So'ngi Xabar" :value="latestDate" icon="Calendar" color="purple" />
      <StatCard title="O'rtacha Uzunlik" :value="averageLength" icon="Eye" color="orange" />
    </div>

    <!-- News Table -->
    <Card>
      <CardHeader>
        <CardTitle>Barcha Yangiliklar ({{ newsData.length }})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rasm</TableHead>
              <TableHead>Sarlavha</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in newsData" :key="item.id">
              <TableCell><img :src="item.image_url || defaultImage" class="w-12 h-12 rounded object-cover" /></TableCell>
              <TableCell>
                <p class="font-medium">{{ item.heading }}</p>
                <p class="text-sm text-muted-foreground">{{ item.description.slice(0, 60) }}...</p>
              </TableCell>
              <TableCell>
                <p class="text-sm">{{ formatDate(item.created_at) }}</p>
                <p v-if="item.updated_at !== item.created_at" class="text-xs text-muted-foreground">
                  Yangilangan: {{ formatDate(item.updated_at) }}
                </p>
              </TableCell>
              <TableCell>
                <Badge :variant="getStatus(item.created_at)">{{ getStatusLabel(item.created_at) }}</Badge>
              </TableCell>
              <TableCell class="flex gap-2">
                <Button size="sm" variant="outline" @click="handleView(item)"><Eye class="w-4 h-4" /></Button>
                <Button size="sm" variant="outline" @click="handleEdit(item)"><Edit class="w-4 h-4" /></Button>
                <Button size="sm" variant="destructive" @click="handleDelete(item.id)"><Trash2 class="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  <!-- View Dialog -->
<Dialog :open="isViewDialogOpen" @update:open="val => isViewDialogOpen = val">
  <DialogContent class="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Xabar Ko'rish</DialogTitle>
    </DialogHeader>
    <div v-if="viewingNews" class="space-y-4">
      <img :src="viewingNews.image_url || defaultImage" class="w-full h-64 rounded-lg object-cover" />
      <div class="space-y-2">
        <h3>{{ viewingNews.heading }}</h3>
        <div class="flex gap-4 text-sm text-muted-foreground">
          <span>Yaratilgan: {{ formatDate(viewingNews.created_at) }}</span>
          <span v-if="viewingNews.updated_at !== viewingNews.created_at">
            Yangilangan: {{ formatDate(viewingNews.updated_at) }}
          </span>
        </div>
      </div>
      <div class="prose max-w-none">
        <p>{{ viewingNews.description }}</p>
      </div>
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="isViewDialogOpen = false">Yopish</Button>
        <Button @click="editFromView">Tahrirlash</Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import {Button} from '@/admin/components/ui/button';
import {Input} from '@/admin/components/ui/input';
import {Textarea} from '@/admin/components/ui/textarea';
import {Badge} from '@/admin/components/ui/badge';

import {Card, CardContent, CardHeader, CardTitle} from '@/admin/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/admin/components/ui/table';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/admin/components/ui/dialog';

import { Plus, Edit, Trash2, Eye, Calendar, TrendingUp } from 'lucide-vue-next';
import { news as initialNews } from '@/admin/data/mockData';

const newsData = ref([...initialNews]);
const isDialogOpen = ref(false);
const isViewDialogOpen = ref(false);
// isViewDialogOpen = ref(false);

const formData = ref({ heading: '', description: '', image_url: '' });
const editingNews = ref(null);
const viewingNews = ref(null);

const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop';

function openNewDialog() {
  editingNews.value = null;
  resetForm();
  isDialogOpen.value = true;
}

function resetForm() {
  formData.value = { heading: '', description: '', image_url: '' };
}

function handleSubmit() {
  const currentDate = new Date().toISOString().split('T')[0];
  if (editingNews.value) {
    newsData.value = newsData.value.map(n => n.id === editingNews.value.id ? { ...n, ...formData.value, updated_at: currentDate } : n);
  } else {
    const newId = Math.max(...newsData.value.map(n => n.id)) + 1;
    newsData.value.unshift({ id: newId, ...formData.value, created_at: currentDate, updated_at: currentDate });
  }
  isDialogOpen.value = false;
  resetForm();
  editingNews.value = null;
}

function handleEdit(item) {
  editingNews.value = item;
  formData.value = { heading: item.heading, description: item.description, image_url: item.image_url };
  isDialogOpen.value = true;
}

function handleView(item) {
  viewingNews.value = item;
  isViewDialogOpen.value = true;
}

function editFromView() {
  handleEdit(viewingNews.value);
  isViewDialogOpen.value = false;
}

function handleDelete(id) {
  newsData.value = newsData.value.filter(item => item.id !== id);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getStatus(dateStr) {
  const daysDiff = (new Date() - new Date(dateStr)) / (1000 * 3600 * 24);
  return daysDiff < 7 ? 'default' : 'secondary';
}

function getStatusLabel(dateStr) {
  const daysDiff = Math.floor((new Date() - new Date(dateStr)) / (1000 * 3600 * 24));
  if (daysDiff === 0) return 'Bugun';
  if (daysDiff === 1) return 'Kecha';
  if (daysDiff < 7) return `${daysDiff} kun oldin`;
  return 'Eski';
}

const previewDescription = computed(() => {
  return formData.value.description?.length > 100 ? formData.value.description.slice(0, 100) + '...' : formData.value.description;
});

const recentNewsCount = computed(() => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return newsData.value.filter(n => new Date(n.created_at) >= oneWeekAgo).length;
});

const latestDate = computed(() => {
  return newsData.value.length > 0 ? formatDate(newsData.value[0].created_at) : '-';
});

const averageLength = computed(() => {
  if (!newsData.value.length) return 0;
  return Math.round(newsData.value.reduce((sum, item) => sum + item.description.length, 0) / newsData.value.length);
});
</script>