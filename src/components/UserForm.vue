<template>
  <form @submit.prevent="onSubmit" class="space-y-4 lg:space-y-6">
    <!-- Fields in two columns -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="(field, index) in twoColumnFields" :key="index">
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ field.label }}</label>
        <input
          v-model="userData[field.model]"
          :type="field.type || 'text'"
          :placeholder="field.placeholder"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors text-sm lg:text-base"
        />
      </div>
    </div>

    <!-- Single column fields -->
    <div v-for="(field, index) in singleColumnFields" :key="'single-' + index">
      <label class="block text-sm font-medium text-gray-700 mb-1">{{ field.label }}</label>
      <input
        v-model="userData[field.model]"
        :type="field.type || 'text'"
        :placeholder="field.placeholder"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors text-sm lg:text-base"
      />
    </div>

    <!-- Buttons -->
    <div
      class="flex flex-col sm:flex-row gap-y-3 justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200"
    >
      <button
        type="button"
        @click="$emit('cancel')"
        class="w-full sm:w-auto px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors text-sm lg:text-base order-2 sm:order-1"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="w-full sm:w-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-medium transition-colors text-sm lg:text-base order-1 sm:order-2"
      >
        {{ props.user ? 'Actualizar' : 'Guardar' }}
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
    default: null,
  },
})

const emit = defineEmits(['save', 'cancel'])
const usersStore = useUsersStore()

const userData = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
})

watch(
  () => props.user,
  (newVal) => {
    if (newVal) {
      userData.value = { ...newVal }
    } else {
      userData.value = {
        name: '',
        username: '',
        email: '',
        phone: '',
      }
    }
  },
  { immediate: true },
)

const twoColumnFields = [
  {
    label: 'Nombre',
    model: 'name',
    placeholder: 'Nombre completo',
  },
  {
    label: 'Usuario',
    model: 'username',
    placeholder: 'Nombre de usuario',
  },
]

const singleColumnFields = [
  {
    label: 'Email',
    model: 'email',
    type: 'email',
    placeholder: 'correo@ejemplo.com',
  },
  {
    label: 'Teléfono',
    model: 'phone',
    type: 'tel',
    placeholder: '+51 999 999 999',
  },
]

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
