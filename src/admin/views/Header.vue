<template>
  <div class="flex items-center justify-between p-4 bg-background border-b md:hidden">
    <div class="flex items-center gap-3">
      <!-- Mobil menyu uchun Sheet -->
      <Sheet v-model:open="isOpen">
        <SheetTrigger as-child>
          <Button variant="ghost" size="sm">
            <Menu class="w-5 h-5" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          class="p-0 w-60"
          aria-describedby="sidebar-description"
        >
          <SheetHeader>
            <SheetTitle class="sr-only">Navigation Menu</SheetTitle>
          </SheetHeader>

          <!-- Sidebar -->
          <AdminSidebar
            :currentPage="currentPage"
            :username="username"
            :isMobile="true"
            :isOpen="isOpen"
            @update:page="handlePageChange"
            @logout="onLogout"
          />

          <!-- Accessibility description -->
          <p id="sidebar-description" class="sr-only">
            Bu navigatsiya menyusi orqali siz admin panelning bo‘limlarini tanlashingiz mumkin.
          </p>
        </SheetContent>
      </Sheet>

      <!-- Sahifa sarlavhasi -->
      <div>
        <h1 class="text-lg font-medium">{{ pageTitle }}</h1>
        <p class="text-xs text-muted-foreground">IT O'quv Markazi</p>
      </div>
    </div>

    <!-- Foydalanuvchi va chiqish -->
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User class="w-4 h-4 text-primary-foreground" />
        </div>
        <div class="hidden sm:block">
          <p class="text-sm font-medium">{{ username || 'Admin' }}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" @click="onLogout">
        <LogOut class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/admin/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader
} from '@/admin/components/ui/sheet'
import { Menu, User, LogOut } from 'lucide-vue-next'
import AdminSidebar from './AdminSidebar.vue'

// Props
interface Props {
  currentPage: string
  username?: string
  pageTitle: string
}

const props = defineProps<Props>()
const emit = defineEmits(['page-change', 'logout'])

const isOpen = ref(false)

// Sahifa o‘zgartirilganda
function handlePageChange(page: string) {
  emit('page-change', page)
  isOpen.value = false // menyuni yopamiz
}

// Logout
function onLogout() {
  emit('logout')
}
</script>
