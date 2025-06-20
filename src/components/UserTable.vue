<template>
  <div>
    <div v-if="usersStore.loading" class="text-white">Cargando usuarios...</div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr class="bg-gray-200 text-gray-700 text-left">
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Usuario</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Teléfono</th>
            <th class="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in usersStore.users"
            :key="user.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.username }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.phone }}</td>
            <td class="px-4 py-2 space-x-2">
              <button
                @click="$emit('edit', user)"
                class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                @click="confirmDelete(user.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
