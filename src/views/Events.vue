<template>
  <div class="events">
    <!-- 3D Snowfall Effect -->
    <Parallax3D />
    
    <MinimalNavbar @showLogin="showLogin = true" @showSignup="showSignup = true" />
    <div class="hero-section">
      <video autoplay loop muted playsinline class="hero-video">
        <source :src="heroVideo" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Volunteer Events</h1>
        <p>Discover meaningful opportunities to make a difference in your community</p>
        <button @click="$router.push('/')" class="btn-home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Return to Home
        </button>
      </div>
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
            <div class="event-header">
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
import MinimalNavbar from '../components/common/MinimalNavbar.vue'
import Parallax3D from '../components/common/Parallax3D.vue'
import LoginModal from '../components/common/LoginModal.vue'
import SignupModal from '../components/common/SignupModal.vue'
import heroVideo from '../assets/vovo.mp4'

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
.events { 
  background: linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%);
  min-height: 100vh;
  position: relative;
}

.hero-section { 
  position: relative;
  color: white;
  padding: 120px 60px 60px;
  text-align: center;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(16, 185, 129, 0.2) 100%);
}

.hero-video { 
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.3;
}

.hero-overlay { 
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
}

.hero-content { 
  position: relative;
  z-index: 2;
}

.hero-section h1 { 
  font-size: 42px;
  margin-bottom: 15px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.hero-section p { 
  color: white;
  font-size: 18px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}
.btn-home { 
  margin-top: 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-home:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-2px);
}
.btn-home svg {
  flex-shrink: 0;
}
.container { 
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 60px;
  position: relative;
  z-index: 2;
}

.browse-section { 
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.browse-section h2 { 
  font-size: 28px;
  margin-bottom: 25px;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
}
.filters { display: flex; gap: 20px; margin-bottom: 30px; }
.filters select, .filters input { 
  flex: 1;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
}
.filters select:focus, .filters input:focus {
  outline: none;
  border-color: rgba(16, 185, 129, 0.6);
  background: rgba(16, 185, 129, 0.1);
}
.filters input::placeholder {
  color: #9ca3af;
}
.filters select option {
  background: #1a1a1a;
  color: #ffffff;
}
.error { 
  text-align: center;
  padding: 40px;
  color: #9ca3af;
}
.events-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
.event-card { 
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  cursor: pointer;
}
.event-card:hover { 
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  border-color: rgba(16, 185, 129, 0.5);
  background: rgba(16, 185, 129, 0.1);
}
.event-header { 
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3));
  border-bottom: 1px solid rgba(16, 185, 129, 0.3);
  position: relative;
  overflow: hidden;
}

.event-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(16, 185, 129, 0.1), transparent);
}

.event-icon { 
  font-size: 70px;
  color: #10b981;
  filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.6));
  position: relative;
  z-index: 1;
}
.event-body { padding: 20px; }
.category-badge { 
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}
.event-body h3 { 
  margin: 12px 0;
  font-size: 18px;
  color: #ffffff;
}
.event-meta { 
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 12px 0;
  color: #d1d5db;
  font-size: 13px;
}
.event-meta span { display: flex; align-items: center; gap: 6px; }
.event-meta i { font-size: 14px; color: #10b981; }
.event-body p { 
  color: #d1d5db;
  font-size: 14px;
  line-height: 1.5;
}
.event-footer { 
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(16, 185, 129, 0.2);
  font-size: 13px;
  color: #9ca3af;
}
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { 
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}
.modal-close { 
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #ffffff;
}
.modal-header { 
  text-align: center;
  padding: 40px 40px 20px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
}
.modal-icon { 
  font-size: 60px;
  color: #10b981;
  display: block;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
}
.modal-header h2 { 
  margin: 10px 0;
  font-size: 28px;
  color: #ffffff;
}
.modal-body { padding: 30px 40px; }
.description { 
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 25px;
  color: #d1d5db;
}
.modal-info { 
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
}
.info-item { 
  margin: 10px 0;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #d1d5db;
}
.info-item i { 
  font-size: 16px;
  color: #10b981;
}
.info-item strong { 
  color: #ffffff;
  margin-right: 8px;
}
.btn-register, .btn-unregister { 
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-register { 
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}
.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}
.btn-unregister { 
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
}
.btn-unregister:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
}
.btn-register:disabled { 
  background: #4b5563;
  cursor: not-allowed;
  box-shadow: none;
}
.btn-register:disabled:hover {
  transform: none;
}
</style>
