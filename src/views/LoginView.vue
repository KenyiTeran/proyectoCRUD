<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FDB205] to-[#F8D442]">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
      <h1 class="text-2xl font-bold">
        <span class="border-l-4 border-yellow-400 pl-2">PROYECTO</span> CRUD
      </h1>
      <h2 class="text-lg mt-4 font-semibold">INGRESAR</h2>
      <p class="text-sm text-gray-600 mt-1">Ingrese cualquier credencial para poder ingresar</p>

      <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
        <input
          v-for="field in fields"
          :key="field.model"
          v-model="form[field.model]"
          :type="field.type"
          :placeholder="field.placeholder"
          :required="field.required"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          type="submit"
          class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md transition-colors cursor-pointer"
        >
          INGRESAR
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const fields = [
  {
    model: 'email',
    type: 'email',
    placeholder: 'Correo electrónico',
    required: true
  },
  {
    model: 'password',
    type: 'password',
    placeholder: 'Contraseña',
    required: true
  }
]

function handleLogin() {
  if (form.value.email && form.value.password) {
    router.push('/users')
  }
}
</script>
