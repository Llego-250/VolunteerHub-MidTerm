<template>
  <div class="events">
    <Navbar @showLogin="showLogin = true" @showSignup="showSignup = true" />
    <div class="hero-section">
      <h1>Volunteer Events</h1>
      <p>Discover meaningful opportunities to make a difference in your community</p>
    </div>
    <div class="container">
      <div class="browse-section">
        <h2>Browse Events</h2>
        <div class="filters">
          <select v-model="category">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
          </select>
          <input v-model="search" placeholder="Search events..." />
        </div>
        <div v-if="filteredEvents.length === 0" class="error">No events found</div>
        <div v-else class="events-grid">
          <div v-for="event in filteredEvents" :key="event.id" class="event-card" @click="openEventModal(event)">
            <div class="event-header" :style="{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }">
              <i :class="event.icon || 'fas fa-calendar'" class="event-icon"></i>
            </div>
            <div class="event-body">
              <span class="category-badge">{{ event.category }}</span>
              <h3>{{ event.title }}</h3>
              <div class="event-meta">
                <span><i class="fas fa-calendar"></i> {{ event.date }}</span>
                <span><i class="fas fa-clock"></i> {{ event.time }}</span>
                <span><i class="fas fa-map-marker-alt"></i> {{ event.location }}</span>
              </div>
              <p>{{ event.description }}</p>
              <div class="event-footer">
                <span>{{ event.volunteers.length }}/{{ event.maxVolunteers }} volunteers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedEvent" class="modal-overlay" @click="closeEventModal">
      <div class="modal" @click.stop>
        <button class="modal-close" @click="closeEventModal">×</button>
        <div class="modal-header">
          <i :class="selectedEvent.icon" class="modal-icon"></i>
          <h2>{{ selectedEvent.title }}</h2>
          <span class="category-badge">{{ selectedEvent.category }}</span>
        </div>
        <div class="modal-body">
          <p class="description">{{ selectedEvent.description }}</p>
          <div class="modal-info">
            <div class="info-item">
              <i class="fas fa-calendar"></i> <strong>Date:</strong> {{ selectedEvent.date }}
            </div>
            <div class="info-item">
              <i class="fas fa-clock"></i> <strong>Time:</strong> {{ selectedEvent.time }}
            </div>
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> {{ selectedEvent.location }}
            </div>
            <div class="info-item">
              <i class="fas fa-users"></i> <strong>Volunteers:</strong> {{ selectedEvent.volunteers.length }}/{{ selectedEvent.maxVolunteers }}
            </div>
          </div>
          <button v-if="authStore.isAuthenticated && authStore.currentUser?.role === 'volunteer'" 
                  @click="toggleRegistration" 
                  :disabled="!canRegister"
                  :class="isRegistered ? 'btn-unregister' : 'btn-register'">
            {{ isRegistered ? 'Unregister' : canRegister ? 'Register' : 'Event Full' }}
          </button>
          <button v-else-if="!authStore.isAuthenticated" @click="showLogin = true; closeEventModal()" class="btn-register">
            Login to Register
          </button>
        </div>
      </div>
    </div>

    <LoginModal v-if="showLogin" @close="showLogin = false" @switchToSignup="showLogin = false; showSignup = true" />
    <SignupModal v-if="showSignup" @close="showSignup = false" @switchToLogin="showSignup = false; showLogin = true" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEventsStore } from '../stores/events'
import { useAuthStore } from '../stores/auth'
import Navbar from '../components/common/Navbar.vue'
import LoginModal from '../components/common/LoginModal.vue'
import SignupModal from '../components/common/SignupModal.vue'

const eventsStore = useEventsStore()
const authStore = useAuthStore()
const search = ref('')
const category = ref('')
const selectedEvent = ref(null)
const showLogin = ref(false)
const showSignup = ref(false)

const categories = computed(() => {
  const cats = [...new Set(eventsStore.events.map(e => e.category))]
  return cats.sort()
})

const filteredEvents = computed(() => 
  eventsStore.events.filter(e => 
    e.title.toLowerCase().includes(search.value.toLowerCase()) &&
    (category.value === '' || e.category === category.value)
  )
)

const isRegistered = computed(() => 
  selectedEvent.value && authStore.currentUser?.registeredEvents?.includes(selectedEvent.value.id)
)

const canRegister = computed(() => 
  selectedEvent.value && selectedEvent.value.volunteers.length < selectedEvent.value.maxVolunteers
)

const openEventModal = (event) => {
  selectedEvent.value = event
}

const closeEventModal = () => {
  selectedEvent.value = null
}

const toggleRegistration = () => {
  if (isRegistered.value) {
    eventsStore.unregisterFromEvent(selectedEvent.value.id, authStore.currentUser.id)
  } else {
    eventsStore.registerForEvent(selectedEvent.value.id, authStore.currentUser.id)
  }
}
</script>

<style scoped>
.events { background: var(--light-gray); min-height: 100vh; }
.hero-section { background: white; padding: 60px; text-align: center; margin-top: 80px; }
.hero-section h1 { font-size: 42px; margin-bottom: 15px; }
.hero-section p { color: var(--gray); font-size: 18px; }
.container { max-width: 1400px; margin: 0 auto; padding: 40px 60px; }
.browse-section { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.browse-section h2 { font-size: 28px; margin-bottom: 25px; }
.filters { display: flex; gap: 20px; margin-bottom: 30px; }
.filters select, .filters input { flex: 1; }
.error { text-align: center; padding: 40px; color: var(--gray); }
.events-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
.event-card { background: white; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); transition: transform 0.3s; }
.event-card:hover { transform: translateY(-5px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.event-header { height: 180px; display: flex; align-items: center; justify-content: center; }
.event-icon { font-size: 70px; color: white; }
.event-body { padding: 20px; }
.category-badge { background: var(--primary); color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.event-body h3 { margin: 12px 0; font-size: 18px; }
.event-meta { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; color: var(--gray); font-size: 13px; }
.event-meta span { display: flex; align-items: center; gap: 6px; }
.event-meta i { font-size: 14px; }
.event-body p { color: var(--gray); font-size: 14px; line-height: 1.5; }
.event-footer { margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border); font-size: 13px; color: var(--gray); }
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: white; border-radius: 16px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; position: relative; }
.modal-close { position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 32px; cursor: pointer; color: var(--gray); }
.modal-header { text-align: center; padding: 40px 40px 20px; border-bottom: 1px solid var(--border); }
.modal-icon { font-size: 60px; color: var(--primary); display: block; margin-bottom: 15px; }
.modal-header h2 { margin: 10px 0; font-size: 28px; }
.modal-body { padding: 30px 40px; }
.description { font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: var(--dark); }
.modal-info { background: var(--light-gray); padding: 20px; border-radius: 8px; margin-bottom: 25px; }
.info-item { margin: 10px 0; font-size: 15px; display: flex; align-items: center; gap: 8px; }
.info-item i { font-size: 16px; color: var(--primary); }
.info-item strong { color: var(--dark); margin-right: 8px; }
.btn-register, .btn-unregister { width: 100%; padding: 14px; font-size: 16px; font-weight: 600; border-radius: 8px; }
.btn-register { background: var(--primary); color: white; }
.btn-unregister { background: #dc3545; color: white; }
.btn-register:disabled { background: var(--gray); cursor: not-allowed; }
</style>
