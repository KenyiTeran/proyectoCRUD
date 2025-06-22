<template>
  <div>
    <button
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-yellow-500 text-white rounded-md shadow-lg hover:bg-yellow-600 transition-colors"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Overlay -->
    <div
      v-if="isOpen"
      @click="closeSidebar"
      class="lg:hidden fixed inset-0 bg-black/50 z-40"
    ></div>

    <!-- Sidebar -->
    <div
      :class="[
        'fixed lg:relative h-screen bg-[#F2EAE1] flex flex-col shadow-lg transition-transform duration-300',
        'w-64 lg:w-64',
        isOpen ? 'z-50 translate-x-0' : 'z-0 -translate-x-full lg:translate-x-0 lg:z-auto'
      ]"
    >
      <div class="p-4 lg:p-6">
        <div class="flex items-center space-x-2 lg:space-x-3">
          <div class="w-2 lg:w-3 h-6 lg:h-8 bg-yellow-500 rounded-sm"></div>
          <h1 class="text-lg lg:text-xl font-bold text-gray-800">PROYECTO CRUD</h1>
        </div>
      </div>

      <div class="p-4 lg:p-6 text-center">
        <div class="w-16 lg:w-20 h-16 lg:h-20 rounded-full mx-auto mb-3 flex items-center justify-center">
          <img :src="administrador" alt="Imagen del administrador" class="rounded-full w-full h-full object-cover" />
        </div>
        <h3 class="font-semibold text-gray-800 text-base lg:text-lg">Kenyi Teran</h3>
        <p class="text-yellow-600 text-xs lg:text-sm font-medium">Admin</p>
      </div>

      <nav class="flex-1 px-3 lg:px-4 py-4 lg:py-6">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/users"
              @click="closeSidebar"
              class="flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors duration-200 hover:bg-yellow-600 group"
              :class="{
                'bg-yellow-500 text-white': $route.path === '/users',
                'text-gray-700': $route.path !== '/users',
              }"
            >
              <iconUser class="w-5 h-5 flex-shrink-0" />
              <span class="font-medium text-sm lg:text-base">Lista de usuarios</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="p-3 lg:p-4 border-t border-gray-200">
        <button
          @click="handleLogout"
          class="flex items-center space-x-3 w-full px-3 lg:px-4 py-2 lg:py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200 group"
        >
          <svg
            class="w-5 h-5 text-gray-500 group-hover:text-red-600 flex-shrink-0"
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
          <span class="font-medium text-sm lg:text-base">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconUser from '@/components/icons/IconUser.vue'
import administrador from '@/assets/img/perfil.png'

const router = useRouter()
const isOpen = ref(false)

function handleLogout() {
  closeSidebar()
  router.push('/')
}

function toggleSidebar() {
  isOpen.value = !isOpen.value
}

function closeSidebar() {
  isOpen.value = false
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      isOpen.value = false
    }
  })
}
</script>
