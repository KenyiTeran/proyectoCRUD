<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FDB205] to-[#F8D442] p-4"
  >
    <div class="bg-white p-6 lg:p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
      <div class="mb-8">
        <h1 class="text-xl lg:text-2xl font-bold text-gray-800">
          <span class="border-l-4 border-yellow-400 pl-2">PROYECTO</span> CRUD
        </h1>
        <h2 class="text-lg lg:text-xl mt-4 font-semibold text-gray-700">INGRESAR</h2>
        <p class="text-sm text-gray-600 mt-2">Ingrese cualquier credencial para poder ingresar</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4 lg:space-y-6">
        <div class="space-y-4">
          <div v-for="field in fields" :key="field.model" class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ field.label }}
            </label>
            <input
              v-model="form[field.model]"
              :type="field.type"
              :placeholder="field.placeholder"
              :required="field.required"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 text-sm lg:text-base"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg transition-colors duration-200 cursor-pointer text-sm lg:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          INGRESAR
        </button>
      </form>

      <div class="mt-6 text-[10px] text-gray-500">
        <p>© 2025 Proyecto CRUD. Desarrollado por Kenyi Wilson Zuñiga Teran</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
})

const fields = [
  {
    model: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'correo@ejemplo.com',
    required: true,
  },
  {
    model: 'password',
    type: 'password',
    label: 'Contraseña',
    placeholder: '••••••••',
    required: true,
  },
]

function handleLogin() {
  if (form.value.email && form.value.password) {
    router.push('/users')
  }
}
</script>
