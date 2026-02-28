<template>
  <div class="dashboard">
    <Navbar />
    <div class="container">
      <div class="dashboard-header">
        <div>
          <h1>Organizer Dashboard</h1>
          <p>Manage your events and coordinate with volunteers</p>
        </div>
        <div class="tabs">
          <button @click="activeTab = 'overview'" :class="{ active: activeTab === 'overview' }">Overview</button>
          <button @click="activeTab = 'create'" :class="{ active: activeTab === 'create' }">Create Event</button>
          <button @click="activeTab = 'manage'" :class="{ active: activeTab === 'manage' }">Manage</button>
          <button @click="activeTab = 'message'" :class="{ active: activeTab === 'message' }">Message</button>
          <button @click="activeTab = 'profile'" :class="{ active: activeTab === 'profile' }">Profile</button>
          <button @click="activeTab = 'settings'" :class="{ active: activeTab === 'settings' }">Settings</button>
          <button @click="activeTab = 'notifications'" :class="{ active: activeTab === 'notifications' }">Notifications</button>
        </div>
      </div>
      <div v-if="activeTab === 'overview'">
        <DashboardStats :stats="stats" />
        <MyEvents @switchTab="activeTab = $event" />
      </div>
      <CreateEventForm v-else-if="activeTab === 'create'" @created="activeTab = 'overview'" />
      <ManageEventsPanel v-else-if="activeTab === 'manage'" />
      <MessageVolunteersPanel v-else-if="activeTab === 'message'" />
      <ProfileSettings v-else-if="activeTab === 'profile'" />
      <SettingsPanel v-else-if="activeTab === 'settings'" />
      <NotificationsPanel v-else-if="activeTab === 'notifications'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import Navbar from '../components/common/Navbar.vue'
import DashboardStats from '../components/organizer/DashboardStats.vue'
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

const stats = computed(() => {
  const myEvents = eventsStore.events.filter(e => e.organizerId === authStore.currentUser?.id)
  return {
    events: myEvents.length,
    volunteers: myEvents.reduce((sum, e) => sum + e.volunteers.length, 0),
    active: myEvents.filter(e => !e.status).length
  }
})
</script>

<style scoped>
.dashboard { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }
.container { max-width: 1400px; margin: 0 auto; padding: 40px 60px; }
.dashboard-header { margin-bottom: 30px; }
.dashboard-header h1 { font-size: 32px; margin-bottom: 5px; }
.dashboard-header p { color: var(--gray); margin-bottom: 20px; }
.tabs { display: flex; gap: 10px; flex-wrap: wrap; }
.tabs button { padding: 10px 20px; background: white; border: 1px solid var(--border); border-radius: 8px; }
.tabs button.active { background: var(--primary); color: white; border-color: var(--primary); }
</style>
