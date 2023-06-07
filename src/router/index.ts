import { createRouter, createWebHistory } from 'vue-router'
import TodosList from '../views/TodosList.vue'
import HomeComponent from '../views/HomeComponent.vue'
import { links } from './links'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: links.home,
      name: 'home',
      component: HomeComponent
    },
    {
      path: links.todos,
      name: 'todos',
      component: TodosList
    }
  ]
})

export default router
