//stores/auth.js used to manage user authentication and profile data
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('volunteerHubUser')) || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.currentUser
  },
  actions: {
    login(email, password) {
      const users = JSON.parse(localStorage.getItem('volunteerHubUsers')) || []
      const user = users.find(u => u.email === email && u.password === password)
      if (user) {
        const { password, ...userWithoutPassword } = user
        this.currentUser = userWithoutPassword
        localStorage.setItem('volunteerHubUser', JSON.stringify(userWithoutPassword))
        return true
      }
      return false
    },
    signup(userData) {
      const users = JSON.parse(localStorage.getItem('volunteerHubUsers')) || []
      if (users.find(u => u.email === userData.email)) return false
      const newUser = { ...userData, id: Date.now(), registeredEvents: [] }
      users.push(newUser)
      localStorage.setItem('volunteerHubUsers', JSON.stringify(users))
      const { password, ...userWithoutPassword } = newUser
      this.currentUser = userWithoutPassword
      localStorage.setItem('volunteerHubUser', JSON.stringify(userWithoutPassword))
      return true
    },
    logout() {
      this.currentUser = null
      localStorage.removeItem('volunteerHubUser')
    },
    updateProfile(data) {
      this.currentUser = { ...this.currentUser, ...data }
      localStorage.setItem('volunteerHubUser', JSON.stringify(this.currentUser))
      const users = JSON.parse(localStorage.getItem('volunteerHubUsers')) || []
      const index = users.findIndex(u => u.id === this.currentUser.id)
      if (index !== -1) {
        users[index] = { ...users[index], ...data }
        localStorage.setItem('volunteerHubUsers', JSON.stringify(users))
      }
    }
  }
})
