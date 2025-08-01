<script setup lang="ts">
import { ref, computed } from 'vue'
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

import { requests as mockRequests, courses } from '@/admin/data/mockData'
import type { Request } from '@/admin/types/database'

const requestsData = ref<Request[]>([...mockRequests])
const selectedRequest = ref<Request | null>(null)
const isDetailDialogOpen = ref(false)

const handleDelete = (id: number) => {
  requestsData.value = requestsData.value.filter(req => req.id !== id)
}

const handleViewDetails = (request: Request) => {
  selectedRequest.value = request
  isDetailDialogOpen.value = true
}

const getCourseName = (courseId: number) => {
  return courses.find(course => course.id === courseId)?.name || 'Noma\'lum kurs'
}

const formatPhoneNumber = (phone: string) => {
  return phone.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5')
}

const totalRequests = computed(() => requestsData.value.length)
const todayRequests = computed(() => Math.floor(totalRequests.value / 3))
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
    <div class="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">Jami So'rovlar</p>
              <p class="text-2xl font-semibold">{{ totalRequests }}</p>
            </div>
            <Mail class="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">Bugun</p>
              <p class="text-2xl font-semibold">{{ todayRequests }}</p>
            </div>
            <CheckCircle class="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">Javob kutmoqda</p>
              <p class="text-2xl font-semibold">{{ totalRequests }}</p>
            </div>
            <Phone class="w-8 h-8 text-orange-500" />
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ism</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Kurs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="req in requestsData" :key="req.id">
              <TableCell>{{ req.name }}</TableCell>
              <TableCell>{{ formatPhoneNumber(req.number) }}</TableCell>
              <TableCell>{{ req.mail }}</TableCell>
              <TableCell>
                <Badge variant="outline">{{ getCourseName(req.course_id) }}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Yangi</Badge>
              </TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <Button size="sm" variant="outline" @click="handleViewDetails(req)">
                    <Eye class="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" @click="handleDelete(req.id)">
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Dialog -->
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
              <p>{{ getCourseName(selectedRequest.course_id) }}</p>
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
  </div>
</template>
