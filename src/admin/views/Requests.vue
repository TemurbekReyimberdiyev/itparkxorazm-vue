<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { Eye, Mail, Phone, Trash2, CheckCircle } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/admin/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/admin/components/ui/table'
import { Badge } from '@/admin/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/admin/components/ui/dialog'
import { Button } from '@/admin/components/ui/button'

import type { Request } from '@/admin/types/database'

const API_URL = 'https://itparkxorazm-laravel.test/api/requests'

// State
const isDeleteDialogOpen = ref(false)
const requestToDelete = ref<Request | null>(null)

const requestsData = ref<Request[]>([])
const selectedRequest = ref<Request | null>(null)
const isDetailDialogOpen = ref(false)
const loading = ref(false)

// Fetch data
const fetchRequests = async () => {
  loading.value = true
  try {
    const res = await axios.get(API_URL)
    requestsData.value = res.data
  } catch (error) {
    console.error("So'rovlarni olishda xatolik:", error)
  } finally {
    loading.value = false
  }
}

// Delete confirm
const handleDeleteConfirm = async () => {
  if (requestToDelete.value) {
    try {
      await axios.delete(`${API_URL}/${requestToDelete.value.id}`)
      requestsData.value = requestsData.value.filter(
        (req) => req.id !== requestToDelete.value?.id
      )
    } catch (error) {
      console.error("O'chirishda xatolik:", error)
    }
    requestToDelete.value = null
  }
  isDeleteDialogOpen.value = false
}

// View details
const handleViewDetails = (request: Request) => {
  selectedRequest.value = request
  isDetailDialogOpen.value = true
}

// Helpers
const getCourseName = (req: Request) => {
  return req.course?.name || "Noma'lum kurs"
}

const formatPhoneNumber = (phone: string) => {
  return phone.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5')
}

const totalRequests = computed(() => requestsData.value.length)
const todayRequests = computed(() => Math.floor(totalRequests.value / 3))

onMounted(fetchRequests)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">So'rovlar</h1>
        <p class="text-muted-foreground">Mijozlardan kelgan so'rovlarni ko'ring va boshqaring</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="flex flex-wrap gap-4">
      <Card class="flex-1 min-w-[150px]">
        <CardContent class="p-4 sm:p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm text-muted-foreground">Jami So'rovlar</p>
              <p class="text-lg sm:text-2xl font-semibold">{{ totalRequests }}</p>
            </div>
            <Mail class="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card class="flex-1 min-w-[150px]">
        <CardContent class="p-4 sm:p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm text-muted-foreground">Bugun</p>
              <p class="text-lg sm:text-2xl font-semibold">{{ todayRequests }}</p>
            </div>
            <CheckCircle class="w-6 sm:w-8 h-6 sm:h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card class="flex-1 min-w-[150px]">
        <CardContent class="p-4 sm:p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm text-muted-foreground">Javob kutmoqda</p>
              <p class="text-lg sm:text-2xl font-semibold">{{ totalRequests }}</p>
            </div>
            <Phone class="w-6 sm:w-8 h-6 sm:h-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Table -->
    <Card>
      <CardHeader>
        <CardTitle>Barcha So'rovlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="loading" class="text-center py-6 text-muted-foreground">
          Yuklanmoqda...
        </div>
        <Table v-else>
          <TableHeader>
  <TableRow>
    <TableHead>№</TableHead> <!-- 🟢 Yangi ustun qo‘shildi -->
    <TableHead>Ism</TableHead>
    <TableHead>Telefon</TableHead>
    <TableHead>Email</TableHead>
    <TableHead>Kurs</TableHead>
    <TableHead>Status</TableHead>
    <TableHead>Amallar</TableHead>
  </TableRow>
</TableHeader>

          <TableBody>
  <TableRow v-for="(req, index) in requestsData" :key="req.id">
    <TableCell>{{ index + 1 }}</TableCell> <!-- 🟢 Tartib raqam chiqadi -->

    <TableCell>{{ req.name }}</TableCell>
    <TableCell>{{ formatPhoneNumber(req.number) }}</TableCell>
    <TableCell>{{ req.mail }}</TableCell>
    <TableCell>
      <Badge variant="outline">{{ getCourseName(req) }}</Badge>
    </TableCell>
    <TableCell>
      <Badge variant="secondary">Yangi</Badge>
    </TableCell>
    <TableCell>
      <div class="flex gap-2">
        <Button size="sm" variant="outline" @click="handleViewDetails(req)">
          <Eye class="w-4 h-4" />
        </Button>
        <Button size="sm" variant="destructive" 
                @click="() => { requestToDelete = req; isDeleteDialogOpen = true }">
          <Trash2 class="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
</TableBody>

        </Table>
      </CardContent>
    </Card>

    <!-- Detail Dialog -->
    <Dialog :open="isDetailDialogOpen" @update:open="val => isDetailDialogOpen = val">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>So'rov Tafsilotlari</DialogTitle>
        </DialogHeader>

        <div v-if="selectedRequest" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-muted-foreground">Ism</label>
              <p>{{ selectedRequest.name }}</p>
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Telefon</label>
              <p>{{ formatPhoneNumber(selectedRequest.number) }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-muted-foreground">Email</label>
              <p>{{ selectedRequest.mail }}</p>
            </div>
            <div>
              <label class="text-sm text-muted-foreground">Kurs</label>
              <p>{{ getCourseName(selectedRequest) }}</p>
            </div>
          </div>

          <div>
            <label class="text-sm text-muted-foreground">Xabar</label>
            <div class="mt-2 p-3 bg-muted rounded-lg">
              <p>{{ selectedRequest.message }}</p>
            </div>
          </div>

          <div class="flex gap-2 justify-end">
            <Button variant="outline" @click="isDetailDialogOpen = false">
              Yopish
            </Button>
            <Button>
              <Phone class="w-4 h-4 mr-2" />
              Qo'ng'iroq qilish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Delete Dialog -->
    <Dialog :open="isDeleteDialogOpen" @update:open="val => isDeleteDialogOpen = val">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>So'rovni o'chirishni tasdiqlaysizmi?</DialogTitle>
        </DialogHeader>
        <p class="text-sm text-muted-foreground">
          "{{ requestToDelete?.name }}" ismli foydalanuvchining so‘rovi o‘chiriladi. Davom etasizmi?
        </p>
        <div class="flex justify-end gap-2 mt-4">
          <Button variant="outline" @click="isDeleteDialogOpen = false">Bekor qilish</Button>
          <Button variant="destructive" @click="handleDeleteConfirm">Ha, o'chir</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
