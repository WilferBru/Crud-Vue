import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//importar vistas de los estudiantes
import EstudianteNew from '../views/estudiantes/EstudianteNew.vue'
import EstudianteEdit from '../views/estudiantes/EstudianteEdit.vue'
import EstudianteView from '../views/estudiantes/EstudianteView.vue'
//importar vistas de los cursos
import CursoList from '../views/curso/CursoList.vue'
import CursoNew from '../views/curso/CursoNew.vue'
import CursoEdit from '../views/curso/CursoEdit.vue'
import CursoView from '../views/curso/CursoView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // Ruta de los estudiantes
  {
    path: '/createE',
    name: 'createE',
    component: EstudianteNew
  },
  {
    path: '/editE/:id',
    name: 'editE',
    component: EstudianteEdit
  },
  {
    path: '/viewE/:id',
    name: 'viewE',
    component: EstudianteView
  },
  // Rutas de los Cursos
  {
    path: '/listC',
    name: 'listC',
    component: CursoList
  },
  {
    path: '/createC',
    name: 'createC',
    component: CursoNew
  },
  {
    path: '/editC/:id',
    name: 'editC',
    component: CursoEdit
  },
  {
    path: '/viewC/:id',
    name: 'viewC',
    component: CursoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
