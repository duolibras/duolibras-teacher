import { LucideBook } from "lucide-react";
import { CollapsibleItem } from "./components/app-sidebar";

export const collapsibleItems: CollapsibleItem[] = [
  {
    title: 'Conteúdos',
    url: '/dashboard',
    icon: LucideBook,
    isActive: true,
    items: [
      {
        title: 'Meus conteúdos',
        url: '/dashboard'
      },
      {
        title: 'Criar contéudo gratuito',
        url: '/dashboard/create-course/free'
      },
      {
        title: 'Criar conteúdo pago',
        url: '/dashboard/create-course/paid'
      }
    ]
  }
];