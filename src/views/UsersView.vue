<template>
  <div class="flex h-screen bg-gray-50">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-800">Lista de usuarios</h1>
          </div>

          <button
            @click="showForm = true"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-sm transition-colors duration-200 flex items-center space-x-2 font-medium"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Agregar nuevo usuario</span>
          </button>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 overflow-y-auto p-6">
        <div class="bg-white rounded-lg shadow-sm">
          <UserTable @edit="editUser" />
        </div>
      </main>
    </div>

    <!-- Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white w-full max-w-lg p-6 rounded-lg shadow-xl">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">
          {{ selectedUser ? 'Editar Usuario' : 'Agregar Usuario' }}
        </h2>
        <UserForm :user="selectedUser" @save="closeForm" @cancel="closeForm" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import UserForm from '@/components/UserForm.vue'
import UserTable from '@/components/UserTable.vue'
import Sidebar from '@/components/Sidebar.vue'

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
