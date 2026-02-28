<template>
  <div class="create-event-form">
    <h2>Create Event</h2>
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
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useEventsStore } from '../../stores/events'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const emit = defineEmits(['created'])

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
    organizerId: authStore.currentUser.id
  })
  alert('Event created!')
  emit('created')
}
</script>

<style scoped>
.create-event-form { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
h2 { margin-bottom: 20px; }
form { display: flex; flex-direction: column; gap: 15px; }
input, textarea { padding: 10px; }
textarea { min-height: 100px; }
</style>
