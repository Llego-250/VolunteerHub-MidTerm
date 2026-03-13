<template>
  <div class="dashboard">
    <DashboardNavbar />
    <DashboardSidebar role="organizer" :activeTab="activeTab" @navigate="handleNavigate" />

    <CalendarSidebar :isOpen="calendarOpen" :events="myEvents" @close="calendarOpen = false" />

    <div class="container" :class="{ 'calendar-open': calendarOpen }">
      <div class="dashboard-header">
        <div>
          <h1>Organizer Dashboard</h1>
          <p>Manage your events and coordinate with volunteers</p>
        </div>
        <button v-if="activeTab === 'overview'" @click="activeTab = 'create'" class="btn-primary">Create New Event</button>
      </div>

      <div v-if="activeTab === 'overview'">
        <div class="stats-grid">
          <div class="stat-card">
            <h3>{{ stats.events }}</h3>
            <p>Total Events</p>
          </div>
          <div class="stat-card">
            <h3>{{ stats.volunteers }}</h3>
            <p>Total Volunteers</p>
          </div>
          <div class="stat-card">
            <h3>{{ stats.active }}</h3>
            <p>Active Events</p>
          </div>
        </div>
        <MyEvents @switchTab="activeTab = $event" />
      </div>
      <CreateEventForm v-else-if="activeTab === 'create'" @created="activeTab = 'overview'" />
      <ManageEventsPanel v-else-if="activeTab === 'manage'" />
      <MessageVolunteersPanel v-else-if="activeTab === 'message'" />
      <div v-else-if="activeTab === 'profile'" class="profile-section">
        <button @click="activeTab = 'overview'" class="btn-back">← Back to Dashboard</button>
        <ProfileSettings />
      </div>
      <SettingsPanel v-else-if="activeTab === 'settings'" />
      <NotificationsPanel v-else-if="activeTab === 'notifications'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import DashboardNavbar from '../components/common/DashboardNavbar.vue'
import DashboardSidebar from '../components/common/DashboardSidebar.vue'
import CalendarSidebar from '../components/common/CalendarSidebar.vue'
import MyEvents from '../components/organizer/MyEvents.vue'
import CreateEventForm from '../components/organizer/CreateEventForm.vue'
import ManageEventsPanel from '../components/organizer/ManageEventsPanel.vue'
import MessageVolunteersPanel from '../components/organizer/MessageVolunteersPanel.vue'
import ProfileSettings from '../components/common/ProfileSettings.vue'
import SettingsPanel from '../components/common/SettingsPanel.vue'
import NotificationsPanel from '../components/common/NotificationsPanel.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const activeTab = ref('overview')
const calendarOpen = ref(false)

const myEvents = computed(() => eventsStore.events.filter(e => e.organizerId === authStore.currentUser?.id))

const handleNavigate = (id) => {
  if (id === 'calendar') {
    toggleCalendarSidebar()
  } else {
    activeTab.value = id
  }
}

const stats = computed(() => {
  return {
    events: myEvents.value.length,
    volunteers: myEvents.value.reduce((sum, e) => sum + e.volunteers.length, 0),
    active: myEvents.value.filter(e => new Date(e.date) >= new Date()).length
  }
})

const toggleCalendarSidebar = () => {
  calendarOpen.value = !calendarOpen.value
}
</script>

<style scoped>
/* Dashboard Base - Dark Mode Enhanced */
.dashboard { 
  min-height: 100vh; 
  background: var(--dashboard-bg, #f3f4f6); 
  padding-top: 80px; 
  position: relative;
  transition: background 0.3s ease;
}

/* Dark Theme Dashboard */
.dark-theme .dashboard {
  background: linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%);
}

.container { 
  margin-left: 70px; 
  max-width: 1400px; 
  padding: 40px 60px; 
  transition: margin-right 0.3s; 
}

.container.calendar-open { 
  margin-right: 300px; 
}

/* Dashboard Header */
.dashboard-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-start; 
  margin-bottom: 30px; 
}

.dashboard-header h1 { 
  font-size: 32px; 
  margin-bottom: 5px;
  color: var(--text-primary, #1f2937);
  transition: color 0.3s ease;
}

.dashboard-header p { 
  color: var(--text-secondary, #6b7280); 
  margin-bottom: 0;
  transition: color 0.3s ease;
}

/* Dark Theme Header */
.dark-theme .dashboard-header h1 {
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
}

.dark-theme .dashboard-header p {
  color: #d1d5db;
}

/* Primary Button */
.btn-primary { 
  padding: 12px 24px; 
  background: linear-gradient(135deg, var(--primary, #10b981), var(--primary-dark, #059669)); 
  color: white; 
  border: none; 
  border-radius: 10px; 
  cursor: pointer; 
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover { 
  background: linear-gradient(135deg, var(--primary-dark, #059669), #047857);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

/* Dark Theme Button */
.dark-theme .btn-primary {
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.5);
}

.dark-theme .btn-primary:hover {
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
}

/* Stats Grid */
.stats-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
  gap: 20px; 
  margin-bottom: 30px; 
}

/* Stat Cards */
.stat-card { 
  background: white; 
  padding: 24px; 
  border-radius: 12px; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.stat-card h3 { 
  font-size: 36px; 
  margin: 0 0 8px 0; 
  color: var(--primary, #10b981);
  transition: color 0.3s ease;
}

.stat-card p { 
  margin: 0; 
  color: var(--gray, #6b7280); 
  font-size: 14px;
  transition: color 0.3s ease;
}

/* Dark Theme Stat Cards */
.dark-theme .stat-card {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.dark-theme .stat-card:hover {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.3);
}

.dark-theme .stat-card h3 {
  color: #10b981;
  text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
}

.dark-theme .stat-card p {
  color: #d1d5db;
}

/* Profile Section */
.profile-section { 
  background: white; 
  padding: 30px; 
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

/* Dark Theme Profile Section */
.dark-theme .profile-section {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Back Button */
.btn-back { 
  padding: 10px 20px; 
  background: white; 
  border: 1px solid var(--border, #e5e7eb); 
  border-radius: 8px; 
  cursor: pointer; 
  margin-bottom: 20px;
  color: var(--text-primary, #1f2937);
  transition: all 0.3s ease;
}

.btn-back:hover { 
  background: var(--light-gray, #f3f4f6);
  transform: translateX(-4px);
}

/* Dark Theme Back Button */
.dark-theme .btn-back {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.dark-theme .btn-back:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 20px 30px;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
