export interface Program {
  id: number;
  name: string;
  university: string;
  city: string;
  level: 'Bachelor' | 'Master' | 'PhD';
  duration: string;
  language: 'English' | 'Polish' | 'Both';
  tuition: number;
  rating: number;
  studentsCount: number;
  nextDeadline: string;
  tags: string[];
  description?: string;
  requirements?: string[];
}