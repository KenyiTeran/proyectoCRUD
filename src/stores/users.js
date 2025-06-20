import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    loading: false,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.users = res.data
      } catch (error) {
        console.error('Error fetching users', error)
      } finally {
        this.loading = false
      }
    },

    addUser(user) {
      // Generar ID único
      user.id = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1
      this.users.push(user)
    },

    updateUser(updatedUser) {
      const index = this.users.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = updatedUser
      }
    },

    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id)
    }
  }
})
