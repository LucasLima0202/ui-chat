import { createRouter, createWebHistory } from 'vue-router'
import Chatview from '../views/Chatview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Chatview,
    }
  ],
})

export default router
