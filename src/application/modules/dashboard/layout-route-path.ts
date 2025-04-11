export const routePath: { [key: string]: { label: string, route?: string } } = {
  'dashboard': {
    label: 'Meus conteúdos',
    route: '/dashboard'
  },
  'create-course': {
    label: 'Criar conteúdo',
  },
  'paid': {
    label: 'conteúdo pago',
    route: '/dashboard/create-course/paid'
  },
  'free': {
    label: 'conteúdo gratuito',
    route: '/dashboard/create-course/free'
  },
  'course': {
    label: 'Ver conteúdo',
  },
  'create-class': {
    label: 'Criar aula',
  },
};