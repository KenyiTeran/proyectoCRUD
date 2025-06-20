import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import UsersView from '@/views/UsersView.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/users', name: 'Users', component: UsersView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
