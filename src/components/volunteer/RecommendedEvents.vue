<template>
  <section class="recommended-events">
    <div class="section-header">
      <h2>Recommended for You</h2>
      <p>Based on your interests and location</p>
    </div>
    <div class="events-grid">
      <div v-for="event in recommendedEvents" :key="event.id" class="event-card">
        <i :class="event.icon" class="event-icon"></i>
        <div class="event-content">
          <h3>{{ event.title }}</h3>
          <p class="category">{{ event.category }}</p>
          <p><i class="fas fa-calendar"></i> {{ event.date }} • {{ event.time }}</p>
          <p><i class="fas fa-map-marker-alt"></i> {{ event.location }}</p>
        </div>
        <button @click="register(event.id)" :disabled="isRegistered(event.id)" class="btn-register">
          {{ isRegistered(event.id) ? 'Registered' : 'Register' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useEventsStore } from '../../stores/events'

const authStore = useAuthStore()
const eventsStore = useEventsStore()

const recommendedEvents = computed(() => 
  eventsStore.events.filter(e => !e.volunteers.includes(authStore.currentUser?.id)).slice(0, 3)
)

const isRegistered = (eventId) => {
  const event = eventsStore.events.find(e => e.id === eventId)
  return event?.volunteers.includes(authStore.currentUser?.id)
}

const register = (eventId) => {
  eventsStore.registerForEvent(eventId, authStore.currentUser.id)
}
</script>

<style scoped>
.recommended-events { margin-bottom: 40px; }
.section-header { margin-bottom: 20px; }
.section-header h2 { margin: 0 0 5px; font-size: 24px; }
.section-header p { margin: 0; color: var(--gray); font-size: 14px; }
.events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
.event-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 15px; }
.event-icon { font-size: 36px; color: var(--primary); }
.event-content h3 { margin: 0 0 5px; font-size: 18px; }
.event-content .category { display: inline-block; padding: 4px 12px; background: #e0f2fe; color: var(--primary); border-radius: 12px; font-size: 12px; font-weight: 600; margin-bottom: 10px; }
.event-content p { margin: 5px 0; color: var(--gray); font-size: 14px; }
.event-content p i { margin-right: 8px; color: var(--primary); }
.btn-register { padding: 10px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
.btn-register:hover { background: #059669; }
.btn-register:disabled { background: #9ca3af; cursor: not-allowed; }
</style>
