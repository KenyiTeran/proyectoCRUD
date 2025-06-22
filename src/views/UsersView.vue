<template>
  <div class="flex h-screen bg-gray-50">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden lg:ml-0">
      <header class="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <h1 class="text-xl lg:text-2xl font-bold text-gray-800 ml-12 lg:ml-0">Lista de usuarios</h1>
          </div>

          <button
            @click="showForm = true"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 lg:px-6 py-2 rounded-lg shadow-sm transition-colors duration-200 flex items-center space-x-1 lg:space-x-2 font-medium cursor-pointer text-sm lg:text-base"
          >
            <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span class="hidden sm:inline">Agregar nuevo usuario</span>
            <span class="sm:hidden">Agregar</span>
          </button>
        </div>
      </header>

      <!-- Content Table Area -->
      <main class="flex-1 overflow-y-auto p-3 lg:p-6">
        <div class="bg-white rounded-lg shadow-sm lg:shadow-sm">
          <div class="p-3 lg:p-6">
            <UserTable @edit="editUser" />
          </div>
        </div>
      </main>
    </div>

    <!-- Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 flex items-center justify-center bg-black/50 z-[70] p-4"
    >
      <div class="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
        <div class="sticky top-0 bg-white border-b px-4 lg:px-6 py-4 rounded-t-lg">
          <div class="flex justify-between items-center">
            <h2 class="text-lg lg:text-xl font-semibold text-gray-800">
              {{ selectedUser ? 'Editar Usuario' : 'Agregar Usuario' }}
            </h2>
            <button
              @click="closeForm"
              class="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4 lg:p-6">
          <UserForm :user="selectedUser" @save="closeForm" @cancel="closeForm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import UserForm from '@/components/UserForm.vue'
import UserTable from '@/components/UserTable.vue'
import Sidebar from '@/components/SidebarPanel.vue'

const showForm = ref(false)
const selectedUser = ref(null)
const usersStore = useUsersStore()

onMounted(() => usersStore.fetchUsers())

function editUser(user) {
  selectedUser.value = user
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  selectedUser.value = null
}
</script>
