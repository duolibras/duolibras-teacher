import { LucideBook } from "lucide-react";
import { CollapsibleItem } from "./components/app-sidebar";

export const collapsibleItems: CollapsibleItem[] = [
  {
    title: 'Cursos',
    url: '/dashboard',
    icon: LucideBook,
    isActive: true,
    items: [
      {
        title: 'Meus cursos',
        url: '/dashboard'
      },
      {
        title: 'Criar curso gratuito',
        url: '/dashboard/create-course/free'
      },
      {
        title: 'Criar curso pago',
        url: '/dashboard/create-course/paid'
      }
    ]
  }
];