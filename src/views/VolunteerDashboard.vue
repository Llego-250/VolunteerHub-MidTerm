<template>
  <div class="dashboard">
    <DashboardNavbar />
    
    <div class="dashboard-container">
      <!-- Header Section -->
      <header class="dashboard-header">
        <h1>Welcome back, {{ authStore.currentUser?.name }}! 👋</h1>
        <p>Discover events and connect with your community</p>
      </header>

      <!-- For You Section -->
      <section class="for-you-section">
        <h2>For You</h2>
        <div class="personalized-content">
          <div class="quick-stats">
            <div class="stat-card">
              <div class="stat-icon">📅</div>
              <div class="stat-info">
                <h3>{{ stats.upcoming }}</h3>
                <p>Upcoming Events</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-info">
                <h3>{{ stats.totalHours }}</h3>
                <p>Hours Volunteered</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏆ts/volunteer/DashboardStats.vue'
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
</script>

<style scoped>
.dashboard { min-height: 100vh; background: #f3f4f6; padding-top: 80px; }
.layout { display: flex; position: relative; }
.content { margin-left: 70px; padding: 0; flex: 1; transition: margin-right 0.3s; }
.main-content { padding: 40px 60px; }
.page-header { margin-bottom: 40px; text-align: center; }
.page-header h1 { font-size: 42px; margin: 0 0 10px; color: #1f2937; font-weight: 700; }
.page-header p { font-size: 18px; color: #6b7280; margin: 0; }
</style>
