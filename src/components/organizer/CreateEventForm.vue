<template>
  <div class="create-event-form">
    <h2>Create Event</h2>
    <form @submit.prevent="handleCreate">
      <input v-model="form.title" placeholder="Event Title" required />
      <select v-model="form.category" required>
        <option value="">Select Category</option>
        <option>Environment</option>
        <option>Education</option>
        <option>Healthcare</option>
        <option>Community</option>
        <option>Animals</option>
        <option>Disaster Relief</option>
        <option>Elderly Care</option>
        <option>Youth Programs</option>
      </select>
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
import { useNotificationsStore } from '../../stores/notifications'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const notificationsStore = useNotificationsStore()
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
  // Create the event
  const eventData = {
    ...form.value,
    organizerId: authStore.currentUser.id
  }
  eventsStore.createEvent(eventData)
  
  // Get the newly created event (it will be the last one)
  const newEvent = eventsStore.events[eventsStore.events.length - 1]
  
  // Format date for notification
  const formattedDate = new Date(form.value.date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
  
  // Notify all volunteers about the new event
  notificationsStore.notifyNewEvent(
    newEvent.id,
    form.value.title,
    formattedDate,
    form.value.category
  )
  
  alert('Event created and volunteers notified!')
  emit('created')
}
</script>

<style scoped>
.create-event-form { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
h2 { margin-bottom: 20px; }
form { display: flex; flex-direction: column; gap: 15px; }
input, textarea, select { padding: 10px; }
textarea { min-height: 100px; }
</style>
