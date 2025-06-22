<template>
  <div>
    <!-- Loader -->
    <div
      v-if="usersStore.loading"
      class="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50"
    >
      <svg
        class="animate-spin h-12 w-12 lg:h-16 lg:w-16 mb-4 text-[#FEAF00]"
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
      <p class="text-lg lg:text-xl font-semibold animate-pulse text-gray-600">
        Cargando usuarios...
      </p>
    </div>
    <!--  -->

    <div v-else>
      <div
        class="hidden lg:grid lg:grid-cols-5 bg-gray-50 text-gray-500 font-medium px-4 py-3 text-left rounded-t-lg"
      >
        <div>Nombre</div>
        <div>Usuario</div>
        <div>Email</div>
        <div>Teléfono</div>
        <div>Acciones</div>
      </div>

      <div class="space-y-3 lg:space-y-1 lg:mt-0 mt-4">
        <div
          v-for="user in usersStore.users"
          :key="user.id"
          class="bg-white rounded-lg shadow-xs lg:shadow-none border border-gray-300 lg:border-0 p-4 lg:p-0 lg:grid lg:grid-cols-5 lg:items-center lg:px-4 lg:py-3 lg:hover:bg-gray-50 transition-colors"
        >
          <div class="lg:hidden space-y-3">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-gray-800 text-lg">{{ user.name }}</h3>
                <p class="text-gray-600 text-sm">{{ user.username }}</p>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="$emit('edit', user)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Editar
                </button>
                <button
                  @click="confirmDelete(user.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <span class="text-gray-500 w-16 flex-shrink-0">Email:</span>
                <span class="text-gray-700 break-all">{{ user.email }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-500 w-16 flex-shrink-0">Teléfono:</span>
                <span class="text-gray-700">{{ user.phone }}</span>
              </div>
            </div>
          </div>

          <div class="hidden lg:contents">
            <div class="text-sm text-gray-800 font-semibold truncate pr-2">{{ user.name }}</div>
            <div class="text-sm text-gray-700 truncate pr-2">{{ user.username }}</div>
            <div class="text-sm text-gray-700 truncate pr-2">{{ user.email }}</div>
            <div class="text-sm text-gray-700 truncate pr-2">{{ user.phone }}</div>
            <div class="flex space-x-2">
              <button
                @click="$emit('edit', user)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
              >
                Editar
              </button>
              <button
                @click="confirmDelete(user.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!usersStore.loading && usersStore.users.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay usuarios</h3>
        <p class="text-gray-500">Comienza agregando tu primer usuario.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUsersStore } from '@/stores/users'
const usersStore = useUsersStore()

defineEmits(['edit'])

function confirmDelete(id) {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    usersStore.deleteUser(id)
  }
}
</script>
