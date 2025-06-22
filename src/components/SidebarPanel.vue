<template>
  <div>
    <div class="h-screen w-64 bg-[#F2EAE1] flex flex-col shadow-lg">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-8 bg-[#F2EAE1] rounded-sm"></div>
          <h1 class="text-xl font-bold text-gray-800">PROYECTO CRUD</h1>
        </div>
      </div>

      <!-- Profile Section -->
      <div class="p-6 text-center border-b border-gray-200">
        <div
          class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center"
        >
          <img :src="administrador" alt="Imagen del administrador" class="rounded-full" />
        </div>
        <h3 class="font-semibold text-gray-800 text-lg">Kenyi Teran</h3>
        <p class="text-yellow-600 text-sm font-medium">Admin</p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/users"
              class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-yellow-600 group"
              :class="{
                'bg-yellow-500 text-white': $route.path === '/users',
                'text-gray-700': $route.path !== '/users',
              }"
            >
              <iconUser />
              <span class="font-medium">Lista de usuarios</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Logout Button -->
      <div class="p-4 border-t border-gray-200">
        <button
          @click="handleLogout"
          class="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200 group"
        >
          <svg
            class="w-5 h-5 text-gray-500 group-hover:text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span class="font-medium">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import IconUser from '@/components/icons/IconUser.vue'
import administrador from '@/assets/img/perfil.png'

const router = useRouter()

function handleLogout() {
  router.push('/')
}
</script>
