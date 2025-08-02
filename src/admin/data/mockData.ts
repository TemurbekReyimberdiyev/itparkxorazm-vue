import { Category, Course, Mentor, Skill, Request, News } from '../types/database';

export const categories: Category[] = [
  { id: 1, name: "Frontend Development" },
  { id: 2, name: "Backend Development" },
  { id: 3, name: "Mobile Development" },
  { id: 4, name: "Data Science" },
  { id: 5, name: "DevOps" }
];

export const courses: Course[] = [
  {
    id: 1,
    category_id: 1,
    name: "React.js Kursi",
    heading: "Zamonaviy Frontend Development",
    description: "React.js yordamida zamonaviy web ilovalar yaratishni o'rganing",
    duration_month: 6,
    image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
    cost: 1200000
  },
  {
    id: 2,
    category_id: 2,
    name: "Node.js Kursi",
    heading: "Server-side JavaScript",
    description: "Node.js va Express.js bilan backend development",
    duration_month: 4,
    image_url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
    cost: 1000000
  },
  {
    id: 3,
    category_id: 3,
    name: "Flutter Kursi",
    heading: "Cross-platform Mobile Development",
    description: "Flutter bilan iOS va Android ilovalar yaratish",
    duration_month: 8,
    image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
    cost: 1500000
  }
];

export const mentors: Mentor[] = [
  {
    id: 1,
    first_name: "Aziz",
    last_name: "Karimov",
    course_id: 1,
    education: "Toshkent Axborot Texnologiyalari Universiteti",
    experience_years: 5,
    students: 120,
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    first_name: "Dilnoza",
    last_name: "Abdullayeva",
    course_id: 2,
    education: "Samarqand Davlat Universiteti",
    experience_years: 7,
    students: 95,
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    first_name: "Bobur",
    last_name: "Rahimov",
    course_id: 3,
    education: "Mirzo Ulug'bek Nomidagi O'zMU",
    experience_years: 4,
    students: 78,
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
  }
];

export const skills: Skill[] = [
  { id: 1, name: "JavaScript", image_url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop" },
  { id: 2, name: "React", image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop" },
  { id: 3, name: "Node.js", image_url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop" },
  { id: 4, name: "Flutter", image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop" },
  { id: 5, name: "Python", image_url: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100&h=100&fit=crop" }
];

export const requests: Request[] = [
  {
    id: 1,
    name: "Sardor Alimov",
    number: "+998901234567",
    mail: "sardor@example.com",
    course_id: 1,
    message: "React.js kursiga qiziqaman. Batafsil ma'lumot olsam bo'ladimi?"
  },
  {
    id: 2,
    name: "Malika Tosheva",
    number: "+998907654321",
    mail: "malika@example.com",
    course_id: 3,
    message: "Flutter kursi haqida ma'lumot kerak"
  },
  {
    id: 3,
    name: "Jasur Nazarov",
    number: "+998901112233",
    mail: "jasur@example.com",
    course_id: 2,
    message: "Backend development bo'yicha maslahat kerak"
  }
];

export const news: News[] = [
  {
    id: 1,
    heading: "Yangi React.js kursi boshlandi",
    description: "Eng so'nggi React 18 xususiyatlari bilan yangi kurs dasturi tayyorlandi",
    image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    created_at: "2024-01-15",
    updated_at: "2024-01-15"
  },
  {
    id: 2,
    heading: "Mentorlar uchun seminar",
    description: "O'qituvchilar uchun yangi metodlar bo'yicha seminar o'tkazildi",
    image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    created_at: "2024-01-10",
    updated_at: "2024-01-12"
  },
  {
    id: 3,
    heading: "Bitiruvchilar uchun ish o'rinlari",
    description: "Eng yaxshi bitiruvchilar uchun IT kompaniyalarda ish o'rinlari taklif qilinmoqda",
    image_url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
    created_at: "2024-01-05",
    updated_at: "2024-01-08"
  }
];