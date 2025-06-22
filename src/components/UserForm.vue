<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label class="block text-gray-700">Nombre</label>
      <input v-model="userData.name" required class="w-full px-3 py-2 border border-gray-300 rounded" />
    </div>

    <div>
      <label class="block text-gray-700">Usuario</label>
      <input v-model="userData.username" required class="w-full px-3 py-2 border border-gray-300 rounded" />
    </div>

    <div>
      <label class="block text-gray-700">Email</label>
      <input v-model="userData.email" required type="email" class="w-full px-3 py-2 border border-gray-300 rounded" />
    </div>

    <div>
      <label class="block text-gray-700">Teléfono</label>
      <input v-model="userData.phone" required class="w-full px-3 py-2 border border-gray-300 rounded" />
    </div>

    <div class="flex justify-end space-x-2 pt-4">
      <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Guardar</button>
      <button type="button" @click="$emit('cancel')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Cancelar
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUsersStore } from '@/stores/users'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])
const usersStore = useUsersStore()

const userData = ref({
  name: '',
  username: '',
  email: '',
  phone: ''
})

watch(() => props.user, (newVal) => {
  if (newVal) {
    userData.value = { ...newVal }
  } else {
    userData.value = {
      name: '',
      username: '',
      email: '',
      phone: ''
    }
  }
}, { immediate: true })

function onSubmit() {
  const userToSave = { ...userData.value }

  if (props.user && props.user.id) {
    userToSave.id = props.user.id
    usersStore.updateUser(userToSave)
  } else {
    usersStore.addUser(userToSave)
  }

  emit('save')
}
</script>
