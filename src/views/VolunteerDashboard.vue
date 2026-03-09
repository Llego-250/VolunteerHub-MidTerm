<template>
  <div class="dashboard">
    <Navbar />
    <div class="layout">
      <DashboardSidebar role="volunteer" :activeTab="activeTab" @navigate="handleNavigate" />
      <CalendarSidebar :isOpen="calendarOpen" :events="myEvents" @close="calendarOpen = false" />

          <main class="content">
        <BrowseEvents v-if="activeTab === 'browse'" />
        <div v-else-if="activeTab === 'registered'" class="main-content">
          <div class="page-header">
            <h1>My Registered Events</h1>
            <p>Events you've signed up for</p>
          </div>
          <MyEvents />
        </div>
        <HoursBadgesTracker v-else-if="activeTab === 'hours'" />
        <NotificationsPanel v-else-if="activeTab === 'notifications'" />
        <ProfileSettings v-else-if="activeTab === 'profile'" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import Navbar from '../components/common/Navbar.vue'
import DashboardSidebar from '../components/common/DashboardSidebar.vue'
import CalendarSidebar from '../components/common/CalendarSidebar.vue'
import DashboardStats from '../components/volunteer/DashboardStats.vue'
import MyEvents from '../components/volunteer/MyEvents.vue'
import BrowseEvents from '../components/volunteer/BrowseEvents.vue'
import HoursBadgesTracker from '../components/volunteer/HoursBadgesTracker.vue'
import NotificationsPanel from '../components/common/NotificationsPanel.vue'
import ProfileSettings from '../components/common/ProfileSettings.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const activeTab = ref('browse')
const calendarOpen = ref(false)

const myEvents = computed(() => 
  eventsStore.events.filter(e => e.volunteers.includes(authStore.currentUser?.id))
)

const stats = computed(() => {
  const registered = myEvents.value.length
  const upcoming = myEvents.value.filter(e => new Date(e.date) > new Date()).length
  return {
    registered,
    upcoming,
    completed: registered - upcoming
  }
})

const handleNavigate = (id) => {
  if (id === 'calendar') {
    calendarOpen.value = !calendarOpen.value
  } else {
    activeTab.value = id
  }
}

const handleProfileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      authStore.updateProfile({ profilePic: event.target.result })
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.dashboard { min-height: 100vh; background: #f3f4f6; padding-top: 80px; }
.layout { display: flex; position: relative; }
.content { margin-left: 70px; padding: 0; flex: 1; transition: margin-right 0.3s; }
.main-content { padding: 40px 60px; }
.page-header { margin-bottom: 40px; text-align: center; }
.page-header h1 { font-size: 42px; margin: 0 0 10px; color: #1f2937; font-weight: 700; }
.page-header p { font-size: 18px; color: #6b7280; margin: 0; }
.profile-upload { position: fixed; top: 100px; left: 90px; z-index: 100; }
.profile-pic { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.upload-btn { position: absolute; bottom: -5px; right: -5px; width: 24px; height: 24px; border-radius: 50%; background: #3b82f6; color: white; border: 2px solid white; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; }
.upload-btn:hover { background: #2563eb; }
</style>
