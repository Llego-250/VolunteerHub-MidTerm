<template>
  <div class="message-volunteers-panel">
    <h2>Message Volunteers</h2>
    <p class="subtitle">Send messages to volunteers registered for your events</p>
    
    <form @submit.prevent="handleSend">
      <div class="form-group">
        <label for="event-select">Select Event</label>
        <select id="event-select" v-model="form.eventId" required>
          <option value="">Choose an event...</option>
          <option v-for="event in myEvents" :key="event.id" :value="event.id">
            {{ event.title }} ({{ event.volunteers.length }} volunteers)
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="message-text">Message</label>
        <textarea 
          id="message-text"
          v-model="form.message" 
          placeholder="Type your message to volunteers..." 
          required
          rows="6"
        ></textarea>
        <span class="char-count">{{ form.message.length }} / 500</span>
      </div>
      
      <div v-if="form.eventId" class="recipients-info">
        <i class="fas fa-info-circle"></i>
        This message will be sent to {{ getVolunteerCount(form.eventId) }} volunteer(s)
      </div>
      
      <button type="submit" class="btn-send" :disabled="!form.eventId || !form.message">
        <i class="fas fa-paper-plane"></i> Send Message
      </button>
      
      <p v-if="successMessage" class="success-message">
        <i class="fas fa-check-circle"></i> {{ successMessage }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useEventsStore } from '../../stores/events'
import { useNotificationsStore } from '../../stores/notifications'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const notificationsStore = useNotificationsStore()

const form = ref({ eventId: '', message: '' })
const successMessage = ref('')

const myEvents = computed(() => 
  eventsStore.events.filter(e => e.organizerId === authStore.currentUser?.id)
)

const getVolunteerCount = (eventId) => {
  const event = myEvents.value.find(e => e.id === eventId)
  return event ? event.volunteers.length : 0
}

const handleSend = () => {
  const event = myEvents.value.find(e => e.id === form.value.eventId)
  
  if (!event) {
    alert('Event not found')
    return
  }
  
  if (event.volunteers.length === 0) {
    alert('No volunteers registered for this event yet')
    return
  }
  
  // Send notification to all volunteers
  notificationsStore.sendMessageToVolunteers(
    form.value.eventId,
    form.value.message,
    authStore.currentUser.name,
    event.title
  )
  
  successMessage.value = `Message sent to ${event.volunteers.length} volunteer(s)!`
  form.value = { eventId: '', message: '' }
  
  // Clear success message after 3 seconds
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}
</script>

<style scoped>
.message-volunteers-panel { 
  background: white; 
  padding: 30px; 
  border-radius: 12px; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  max-width: 800px;
  transition: all 0.3s ease;
}

.dark-theme .message-volunteers-panel {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

h2 { 
  margin-bottom: 8px;
  color: var(--text-primary, #1f2937);
  transition: color 0.3s ease;
}

.dark-theme h2 {
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
}

.subtitle {
  color: var(--text-secondary, #6b7280);
  margin-bottom: 24px;
  font-size: 14px;
  transition: color 0.3s ease;
}

.dark-theme .subtitle {
  color: #d1d5db;
}

form { 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: var(--text-primary, #1f2937);
  font-size: 14px;
  transition: color 0.3s ease;
}

.dark-theme label {
  color: #ffffff;
}

select, textarea { 
  padding: 12px 15px;
  border: 2px solid var(--border-color, #e5e7eb);
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  background: var(--input-bg, white);
  color: var(--text-primary, #1f2937);
  transition: all 0.2s ease;
}

.dark-theme select,
.dark-theme textarea {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(16, 185, 129, 0.3);
  color: #ffffff;
}

select:focus, textarea:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}

textarea { 
  min-height: 120px;
  resize: vertical;
}

.char-count {
  font-size: 12px;
  color: var(--text-muted, #9ca3af);
  text-align: right;
  transition: color 0.3s ease;
}

.dark-theme .char-count {
  color: #9ca3af;
}

.recipients-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 8px;
  color: #059669;
  font-size: 14px;
  font-weight: 500;
}

.dark-theme .recipients-info {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
  color: #34d399;
}

.btn-send {
  padding: 14px 24px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.btn-send:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 8px;
  color: #059669;
  font-weight: 500;
  animation: slideDown 0.3s ease;
}

.dark-theme .success-message {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
  color: #34d399;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .message-volunteers-panel {
    padding: 20px;
  }
  
  h2 {
    font-size: 22px;
  }
  
  .subtitle {
    font-size: 13px;
  }
}
</style>
