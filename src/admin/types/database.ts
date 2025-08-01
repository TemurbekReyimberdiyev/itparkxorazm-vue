export interface Category {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  category_id: number;
  name: string;
  heading: string;
  description: string;
  duration_month: number;
  image_url: string;
  cost: number;
}

export interface Mentor {
  id: number;
  first_name: string;
  last_name: string;
  course_id: number;
  education: string;
  experience_years: number;
  students: number;
  image_url: string;
}

export interface Skill {
  id: number;
  name: string;
  image_url: string;
}

export interface MentorSkill {
  id: number;
  mentor_id: number;
  skill_id: number;
}

export interface Request {
  id: number;
  name: string;
  number: string;
  mail: string;
  course_id: number;
  message: string;
}

export interface News {
  id: number;
  heading: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}