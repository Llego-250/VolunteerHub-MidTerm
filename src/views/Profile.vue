<template>
  <div class="profile">
    <h1>Profile</h1>
    <form @submit.prevent="handleUpdate">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.phone" placeholder="Phone" />
      <input v-model="form.location" placeholder="Location" />
      <button type="submit">Update Profile</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const form = ref({ name: '', email: '', phone: '', location: '' })

onMounted(() => {
  if (authStore.currentUser) {
    form.value = { ...authStore.currentUser }
  }
})

const handleUpdate = () => {
  authStore.updateProfile(form.value)
  alert('Profile updated!')
  router.back()
}
</script>

<style scoped>
.profile { padding: 40px; max-width: 600px; margin: 0 auto; }
form { display: flex; flex-direction: column; gap: 15px; }
input { padding: 10px; }
</style>
