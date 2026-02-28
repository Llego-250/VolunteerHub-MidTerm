<template>
  <div class="message-volunteers">
    <Navbar />
    <div class="container">
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import Navbar from '../components/common/Navbar.vue'

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
.message-volunteers { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }
.container { padding: 40px; max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; }
form { display: flex; flex-direction: column; gap: 15px; }
select, textarea { padding: 10px; }
textarea { min-height: 150px; }
</style>
