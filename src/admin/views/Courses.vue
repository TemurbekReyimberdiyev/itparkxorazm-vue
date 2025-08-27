<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/admin/components/ui/card";
import { Button } from "@/admin/components/ui/button";
import { Input } from "@/admin/components/ui/input";
import { Label } from "@/admin/components/ui/label";
import { Textarea } from "@/admin/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/admin/components/ui/select";
import { Badge } from "@/admin/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/admin/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/admin/components/ui/table";
import { Plus, Edit, Trash2, Eye } from "lucide-vue-next";
import { useToast } from "@/admin/components/ui/toast";

const API_URL = "https://itparkxorazm-laravel.test/api/courses";
const BASE_URL = "https://itparkxorazm-laravel.test";
const CATEGORIES_URL = `${BASE_URL}/api/categories`;

interface Category {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}

interface Mentor {
  id: number;
  first_name: string;
  last_name: string;
  course_id: number;
  education: string;
  experience_years: number;
  students: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface Course {
  id: number;
  category_id: number;
  name: string;
  heading: string;
  description: string;
  duration_month: number;
  image_url: string;
  cost: number;
  created_at: string | null;
  updated_at: string | null;
  category: Category;
  mentors: Mentor[];
}

interface CourseFormData {
  name: string;
  heading: string;
  description: string;
  category_id: number | null;
  duration_month: number | null;
  cost: number | null;
}

const { toast } = useToast();

// State management
const coursesData = ref<Course[]>([]);
const categories = ref<Category[]>([]);
const isDialogOpen = ref(false);
const editingCourse = ref<Course | null>(null);
const isViewDialogOpen = ref(false);
const viewingCourse = ref<Course | null>(null);
const isConfirmDeleteOpen = ref(false);
const courseToDelete = ref<Course | null>(null);
const uploadedFile = ref<File | null>(null);
const previewUrl = ref<string>("");

// Form data
const formData = ref<CourseFormData>({
  name: "",
  heading: "",
  description: "",
  category_id: null,
  duration_month: null,
  cost: null,
});

// Fetch courses
const fetchCourses = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch courses");
    const data: Course[] = await res.json();
    coursesData.value = data;
  } catch (err) {
    console.error("Kurslarni olishda xatolik:", err);
    toast({
      title: "Xatolik",
      description: "Kurslar yuklanmadi",
      variant: "destructive",
    });
  }
};

// Fetch categories
const fetchCategories = async () => {
  try {
    const res = await fetch(CATEGORIES_URL);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data: Category[] = await res.json();
    categories.value = data;
  } catch (err) {
    console.error("Kategoriyalarni olishda xatolik:", err);
    toast({
      title: "Xatolik",
      description: "Kategoriyalar yuklanmadi",
      variant: "destructive",
    });
  }
};

// Handle image change
const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    uploadedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  } else {
    uploadedFile.value = null;
    previewUrl.value = "";
  }
};

// Submit handler
const handleSubmit = async (e: Event) => {
  e.preventDefault();

  if (
    !formData.value.name ||
    !formData.value.heading ||
    !formData.value.description
  ) {
    toast({
      title: "Xatolik",
      description: "Barcha majburiy maydonlarni to'ldiring",
      variant: "destructive",
    });
    return;
  }

  if (!formData.value.category_id) {
    toast({
      title: "Xatolik",
      description: "Kategoriyani tanlang",
      variant: "destructive",
    });
    return;
  }

  try {
    const data = new FormData();
    data.append("name", formData.value.name);
    data.append("heading", formData.value.heading);
    data.append("description", formData.value.description);
    data.append("category_id", formData.value.category_id.toString());
    data.append(
      "duration_month",
      formData.value.duration_month?.toString() || ""
    );
    data.append("cost", formData.value.cost?.toString() || "");

    if (uploadedFile.value) {
      data.append("image", uploadedFile.value);
    }

    let url = API_URL;
    let method = "POST";

    if (editingCourse.value) {
      url = `${API_URL}/${editingCourse.value.id}`;
      method = "POST"; // Laravel often uses POST with _method=PUT for file uploads
      data.append("_method", "PUT");
    }

    const res = await fetch(url, {
      method,
      body: data,
    });

    if (!res.ok) throw new Error("Failed to save course");

    const savedCourse: Course = await res.json();

    if (editingCourse.value) {
      coursesData.value = coursesData.value.map((course) =>
        course.id === editingCourse.value?.id ? savedCourse : course
      );
      toast({
        title: "Muvaffaqiyat",
        description: "Kurs muvaffaqiyatli yangilandi",
      });
    } else {
      coursesData.value = [savedCourse, ...coursesData.value];
      toast({
        title: "Muvaffaqiyat",
        description: "Yangi kurs muvaffaqiyatli qo'shildi",
      });
    }

    isDialogOpen.value = false;
  } catch (err) {
    console.error("Saqlashda xatolik:", err);
    toast({
      title: "Xatolik",
      description: "Saqlashda xatolik yuz berdi",
      variant: "destructive",
    });
  }
};

// Helper functions
const prepareAddCourse = () => {
  editingCourse.value = null;
  resetForm();
  isDialogOpen.value = true;
};

const resetForm = () => {
  formData.value = {
    name: "",
    heading: "",
    description: "",
    category_id: categories.value.length > 0 ? categories.value[0].id : null,
    duration_month: 1,
    cost: 0,
  };
  uploadedFile.value = null;
  previewUrl.value = "";
};

const handleEdit = (course: Course) => {
  editingCourse.value = course;
  formData.value = {
    name: course.name,
    heading: course.heading,
    description: course.description,
    category_id: course.category_id,
    duration_month: course.duration_month,
    cost: course.cost,
  };
  previewUrl.value = getImageUrl(course.image_url);
  uploadedFile.value = null;
  isDialogOpen.value = true;
};

const handleView = (course: Course) => {
  viewingCourse.value = course;
  isViewDialogOpen.value = true;
};

const confirmDelete = (course: Course) => {
  courseToDelete.value = course;
  isConfirmDeleteOpen.value = true;
};

const performDelete = async () => {
  if (!courseToDelete.value) return;

  try {
    const res = await fetch(`${API_URL}/${courseToDelete.value.id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete course");

    coursesData.value = coursesData.value.filter(
      (course) => course.id !== courseToDelete.value?.id
    );
    toast({
      title: "Muvaffaqiyat",
      description: "Kurs muvaffaqiyatli o'chirildi",
    });

    isConfirmDeleteOpen.value = false;
    courseToDelete.value = null;
  } catch (err) {
    console.error("O'chirishda xatolik:", err);
    toast({
      title: "Xatolik",
      description: "O'chirishda xatolik yuz berdi",
      variant: "destructive",
    });
  }
};

const getImageUrl = (url?: string) => {
  if (!url) return "/placeholder.jpg";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}/${url.replace(/^\/+/, "")}`;
};

const getCategoryName = (category_id: number) => {
  const cat = categories.value.find((c) => c.id === category_id);
  return cat ? cat.name : "Noma'lum";
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
};

// Effects
onMounted(() => {
  fetchCourses();
  fetchCategories();
});

watch(
  () => categories.value,
  (newCategories) => {
    if (newCategories.length > 0 && !formData.value.category_id) {
      formData.value.category_id = newCategories[0].id;
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="space-y-6">
    <!-- Header and modal trigger -->
    <div class="flex items-center justify-between">
      <div>
        <h1>Kurslar</h1>
        <p class="text-muted-foreground">O'quv kurslarini boshqaring</p>
      </div>

      <!-- Course add dialog -->
      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button @click="prepareAddCourse">
            <Plus class="w-4 h-4 mr-2" />
            Yangi Kurs
          </Button>
        </DialogTrigger>

        <DialogContent class="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {{ editingCourse ? "Kursni Tahrirlash" : "Yangi Kurs Qo'shish" }}
            </DialogTitle>
          </DialogHeader>

          <form @submit="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label>Kurs nomi</Label>
                <Input
                  v-model="formData.name"
                  required
                  placeholder="Kurs nomi"
                />
              </div>
              <div class="space-y-2">
                <Label>Kategoriya</Label>
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
              <Label>Sarlavha</Label>
              <Input
                v-model="formData.heading"
                required
                placeholder="Sarlavha"
              />
            </div>

            <div class="space-y-2">
              <Label>Tavsif</Label>
              <Textarea
                v-model="formData.description"
                :rows="3"
                required
                placeholder="Kurs tavsifi"
              />
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div class="space-y-2">
                <Label>Davomiyligi (oy)</Label>
                <Input
                  type="number"
                  v-model="formData.duration_month"
                  min="1"
                  required
                />
              </div>
              <div class="space-y-2">
                <Label>Narxi (so'm)</Label>
                <Input type="number" v-model="formData.cost" min="0" required />
              </div>
              <div class="space-y-2">
                <Label>Kurs Rasmi</Label>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleImageChange"
                  />
                  <img
                    v-if="previewUrl"
                    :src="previewUrl"
                    class="w-32 h-32 object-cover mt-2"
                    alt="Preview"
                  />
                </div>
              </div>
            </div>

            <div class="flex gap-2 justify-end">
              <Button
                variant="outline"
                type="button"
                @click="isDialogOpen = false"
              >
                Bekor qilish
              </Button>
              <Button type="submit">
                {{ editingCourse ? "Saqlash" : "Qo'shish" }}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    <!-- Courses table -->
    <Card>
      <CardHeader>
        <CardTitle>Barcha Kurslar ({{ coursesData.length }})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>№</TableHead>
              <TableHead>Rasm</TableHead>
              <TableHead>Nomi</TableHead>
              <TableHead>Kategoriya</TableHead>
              <TableHead>Davomiyligi</TableHead>
              <TableHead>Narxi</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(course, index) in coursesData" :key="course.id">
              <TableCell>{{ index + 1 }}</TableCell>
              <TableCell>
                <img
                  :src="getImageUrl(course.image_url)"
                  class="w-12 h-12 object-cover rounded-lg"
                  :alt="course.name || 'Kurs rasmi'"
                />
              </TableCell>
              <TableCell>
                <div>
                  <p>{{ course.name }}</p>
                  <p class="text-sm text-muted-foreground">
                    {{ course.heading }}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {{ getCategoryName(course.category_id) }}
                </Badge>
              </TableCell>
              <TableCell>{{ course.duration_month }} oy</TableCell>
              <TableCell>{{ formatPrice(course.cost) }}</TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    @click="handleView(course)"
                  >
                    <Eye class="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    @click="handleEdit(course)"
                  >
                    <Edit class="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    @click="confirmDelete(course)"
                  >
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Course details dialog -->
    <Dialog v-model:open="isViewDialogOpen">
      <DialogContent class="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Kurs Tafsilotlari</DialogTitle>
        </DialogHeader>
        <div v-if="viewingCourse" class="space-y-4">
          <img
            :src="getImageUrl(viewingCourse.image_url)"
            class="w-full h-64 object-cover rounded-lg"
            :alt="viewingCourse.name || 'Kurs rasmi'"
          />
          <div>
            <h3 class="text-xl font-semibold">{{ viewingCourse.name }}</h3>
            <p class="text-muted-foreground">{{ viewingCourse.heading }}</p>
            <p class="mt-2 whitespace-pre-line">
              {{ viewingCourse.description }}
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <p>
              <strong>Kategoriya:</strong>
              {{ getCategoryName(viewingCourse.category_id) }}
            </p>
            <p>
              <strong>Davomiyligi:</strong>
              {{ viewingCourse.duration_month }} oy
            </p>
            <p><strong>Narxi:</strong> {{ formatPrice(viewingCourse.cost) }}</p>
          </div>
          <div class="flex justify-end">
            <Button variant="outline" @click="isViewDialogOpen = false"
              >Yopish</Button
            >
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Delete confirmation -->
    <Dialog v-model:open="isConfirmDeleteOpen">
      <DialogContent class="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Kursni o'chirishni tasdiqlang</DialogTitle>
        </DialogHeader>
        <div class="space-y-4">
          <p>Ushbu kursni o'chirishni xohlaysizmi?</p>
          <p>
            <strong>{{ courseToDelete ? courseToDelete.name : "" }}</strong>
          </p>
          <div class="flex justify-end gap-2">
            <Button variant="outline" @click="isConfirmDeleteOpen = false"
              >Yo'q</Button
            >
            <Button variant="destructive" @click="performDelete">Ha</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
