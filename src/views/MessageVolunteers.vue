<template>
  <div class="message-volunteers">
    <h1>Message Volunteers</h1>
    <form @submit.prevent="handleSend">
      <select v-model="form.eventId" required>
        <option value="">Select Event</option>
        <option v-for="event in myEvents" :key="event.id" :value="event.id">{{ event.title }}</option>
      </select>
      <textarea v-model="form.message" placeholder="Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'

const authStore = useAuthStore()
const eventsStore = useEventsStore()

const form = ref({ eventId: '', message: '' })

const myEvents = computed(() => 
  eventsStore.events.filter(e => e.organizerId === authStore.currentUser?.id)
)

const handleSend = () => {
  alert('Message sent to volunteers!')
  form.value = { eventId: '', message: '' }
}
</script>

<style scoped>
.message-volunteers { padding: 40px; max-width: 600px; margin: 0 auto; }
form { display: flex; flex-direction: column; gap: 15px; }
select, textarea { padding: 10px; }
textarea { min-height: 150px; }
</style>
