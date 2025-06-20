<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-white">👥 Gestión de Usuarios</h1>

    <div class="flex justify-end mb-4">
      <button
        @click="showForm = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
      >
        ➕ Agregar Usuario
      </button>
    </div>

    <UserTable @edit="editUser" />

    <!-- Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">
          {{ selectedUser ? 'Editar Usuario' : 'Agregar Usuario' }}
        </h2>
        <UserForm
          :user="selectedUser"
          @save="closeForm"
          @cancel="closeForm"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import UserForm from '@/components/UserForm.vue'
import UserTable from '@/components/UserTable.vue'

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
