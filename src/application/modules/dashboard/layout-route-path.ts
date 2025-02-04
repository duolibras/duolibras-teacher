export const routePath: { [key: string]: { label: string, route?: string } } = {
  'dashboard': {
    label: 'Meus cursos',
    route: '/dashboard'
  },
  'create-course': {
    label: 'Criar curso',
  },
  'paid': {
    label: 'Curso pago',
    route: '/dashboard/create-course/paid'
  },
  'free': {
    label: 'Curso gratuito',
    route: '/dashboard/create-course/free'
  },
  'course': {
    label: 'Ver Curso',
  },
  'create-class': {
    label: 'Criar aula',
  },
};