<template>
  <div>
    <!-- Loader -->
    <div
      v-if="usersStore.loading"
      class="flex flex-col items-center justify-center my-8 text-white"
    >
      <svg
        class="animate-spin h-10 w-10 mb-3 text-[#FEAF00]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <p class="text-lg font-semibold animate-pulse">Cargando usuarios...</p>
    </div>

    <!-- Encabezado -->
    <div
      v-else
      class="grid grid-cols-5 bg-gray-50 text-gray-500 font-medium px-4 py-2 text-left rounded-t-lg"
    >
      <div>Nombre</div>
      <div>Usuario</div>
      <div>Email</div>
      <div>Teléfono</div>
      <div>Acciones</div>
    </div>

    <!-- Lista de usuarios -->
    <div class="space-y-3 mt-1">
      <div
        v-for="user in usersStore.users"
        :key="user.id"
        class="grid grid-cols-5 items-center bg-white rounded-lg px-4 py-3"
      >
        <div class="text-sm text-gray-800 font-semibold">{{ user.name }}</div>
        <div class="text-sm text-gray-700">{{ user.username }}</div>
        <div class="text-sm text-gray-700">{{ user.email }}</div>
        <div class="text-sm text-gray-700">{{ user.phone }}</div>

        <div class="flex justify-between">
          <button
            @click="$emit('edit', user)"
            class="bg-yellow-500 hover:bg-[#E59D00] text-white w-21 py-2 rounded"
          >
            Editar
          </button>
          <button
            @click="confirmDelete(user.id)"
            class="bg-red-500 hover:bg-red-600 text-white w-21 py-2 rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUsersStore } from '@/stores/users'
const usersStore = useUsersStore()

function confirmDelete(id) {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    usersStore.deleteUser(id)
  }
}
</script>
