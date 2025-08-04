<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p class="text-muted-foreground">IT O'quv Markazi boshqaruv paneli</p>
    </div>

    <!-- Stat Cards (always 4 in 1 row even on mobile) -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card
        v-for="(stat, index) in stats"
        :key="index"
        class="p-3"
      >
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">{{ stat.title }}</CardTitle>
          <div :class="`p-2 rounded-md text-white ${stat.color}`">
            <component :is="stat.icon" class="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-lg font-semibold">{{ stat.value }}</div>
        </CardContent>
      </Card>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>So'nggi So'rovlar</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div
            v-for="request in requests.slice(0, 3)"
            :key="request.id"
            class="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div class="space-y-1">
              <p>{{ request.name }}</p>
              <p class="text-sm text-muted-foreground">
                {{ getCourseName(request.course_id) }}
              </p>
            </div>
            <Badge variant="secondary">Yangi</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistika</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-muted-foreground">Jami Talabalar</span>
            <span class="flex items-center gap-2">
              <TrendingUp class="w-4 h-4 text-green-500" />
              {{ totalStudents }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-muted-foreground">O'rtacha Tajriba</span>
            <span>{{ averageExperience.toFixed(1) }} yil</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-muted-foreground">Yangiliklar</span>
            <span>{{ news.length }}</span>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Mashhur Kurslar</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div
            v-for="course in courses"
            :key="course.id"
            class="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div class="flex items-center gap-4">
              <img
                :src="course.image_url"
                :alt="course.name"
                class="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p>{{ course.name }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ getCategoryName(course.category_id) }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p>{{ getMentor(course.id)?.students || 0 }} talaba</p>
              <p class="text-sm text-muted-foreground">{{ course.duration_month }} oy</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/admin/components/ui/card'
import { Badge } from '@/admin/components/ui/badge'
import { BookOpen, Users, FolderOpen, MessageCircle, TrendingUp } from 'lucide-vue-next'
import { categories, courses, mentors, requests, news } from '@/admin/data/mockData'

const stats = [
  { title: 'Jami Kurslar', value: courses.length, icon: BookOpen, color: 'bg-blue-500' },
  { title: 'Mentorlar', value: mentors.length, icon: Users, color: 'bg-green-500' },
  { title: 'Kategoriyalar', value: categories.length, icon: FolderOpen, color: 'bg-purple-500' },
  { title: "Yangi So'rovlar", value: requests.length, icon: MessageCircle, color: 'bg-orange-500' },
]

const totalStudents = computed(() =>
  mentors.reduce((sum, m) => sum + m.students, 0)
)

const averageExperience = computed(() =>
  mentors.reduce((sum, m) => sum + m.experience_years, 0) / mentors.length
)

const getCourseName = (id) => courses.find((c) => c.id === id)?.name || 'Nomalum'
const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || 'Nomalum'
const getMentor = (courseId) => mentors.find((m) => m.course_id === courseId)
</script>

<style scoped>
.text-muted-foreground {
  color: #6b7280;
}
.bg-muted\/50 {
  background-color: rgba(243, 244, 246, 0.5);
}
</style>
