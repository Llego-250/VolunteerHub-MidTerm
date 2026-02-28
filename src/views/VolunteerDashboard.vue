<template>
  <div class="dashboard">
    <Navbar />
    <div class="container">
      <div class="dashboard-header">
        <h1>Volunteer Dashboard</h1>
        <div class="tabs">
          <button @click="activeTab = 'overview'" :class="{ active: activeTab === 'overview' }">Overview</button>
          <button @click="activeTab = 'hours'" :class="{ active: activeTab === 'hours' }">Hours & Badges</button>
          <button @click="activeTab = 'profile'" :class="{ active: activeTab === 'profile' }">Profile</button>
          <button @click="activeTab = 'settings'" :class="{ active: activeTab === 'settings' }">Settings</button>
          <button @click="activeTab = 'notifications'" :class="{ active: activeTab === 'notifications' }">Notifications</button>
        </div>
      </div>
      <div v-if="activeTab === 'overview'">
        <DashboardStats :stats="stats" />
        <div class="sections">
          <MyEvents />
          <BrowseEvents />
        </div>
      </div>
      <HoursBadgesTracker v-else-if="activeTab === 'hours'" />
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
import DashboardStats from '../components/volunteer/DashboardStats.vue'
import MyEvents from '../components/volunteer/MyEvents.vue'
import BrowseEvents from '../components/volunteer/BrowseEvents.vue'
import HoursBadgesTracker from '../components/volunteer/HoursBadgesTracker.vue'
import ProfileSettings from '../components/common/ProfileSettings.vue'
import SettingsPanel from '../components/common/SettingsPanel.vue'
import NotificationsPanel from '../components/common/NotificationsPanel.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const activeTab = ref('overview')

const stats = computed(() => ({
  registered: authStore.currentUser?.registeredEvents?.length || 0,
  hours: 0,
  badges: 0
}))
</script>

<style scoped>
.dashboard { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }
.container { max-width: 1400px; margin: 0 auto; padding: 40px 60px; }
.dashboard-header { margin-bottom: 30px; }
.dashboard-header h1 { font-size: 32px; margin-bottom: 20px; }
.tabs { display: flex; gap: 10px; flex-wrap: wrap; }
.tabs button { padding: 10px 20px; background: white; border: 1px solid var(--border); border-radius: 8px; }
.tabs button.active { background: var(--primary); color: white; border-color: var(--primary); }
.sections { margin-top: 30px; }
</style>
