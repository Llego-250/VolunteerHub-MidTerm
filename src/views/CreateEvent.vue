<template>
  <div class="create-event">
    <Navbar />
    <div class="container">
      <h1>Create Event</h1>
      <form @submit.prevent="handleCreate">
        <input v-model="form.title" placeholder="Event Title" required />
        <input v-model="form.category" placeholder="Category" required />
        <input v-model="form.date" type="date" required />
        <input v-model="form.time" type="time" required />
        <input v-model="form.location" placeholder="Location" required />
        <textarea v-model="form.description" placeholder="Description" required></textarea>
        <input v-model.number="form.maxVolunteers" type="number" placeholder="Max Volunteers" required />
        <button type="submit">Create Event</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import { useRouter } from 'vue-router'
import Navbar from '../components/common/Navbar.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const router = useRouter()

const form = ref({
  title: '',
  category: '',
  date: '',
  time: '',
  location: '',
  description: '',
  maxVolunteers: 30
})

const handleCreate = () => {
  eventsStore.createEvent({
    ...form.value,
    organizerId: authStore.currentUser.id,
    icon: '📅'
  })
  alert('Event created!')
  router.push('/organizer-dashboard')
}
</script>

<style scoped>
.create-event { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }
.container { padding: 40px; max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; }
form { display: flex; flex-direction: column; gap: 15px; }
input, textarea { padding: 10px; }
textarea { min-height: 100px; }
</style>
