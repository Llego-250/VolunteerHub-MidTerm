<template>
  <div class="dashboard">
    <DashboardNavbar @search="handleSearch" />
    <div class="layout">
      <DashboardSidebar role="volunteer" :activeTab="activeTab" @navigate="handleNavigate" />
      <CalendarSidebar :isOpen="calendarOpen" :events="myEvents" @close="calendarOpen = false" />

      <main class="content" v-if="activeTab === 'browse'">
        <!-- Main Content Container -->
        <div class="main-container">
          <!-- Primary Content Area -->
          <div class="primary-content">
            <!-- Featured Event Spotlight -->
            <div class="featured-spotlight" v-if="featuredEvent">
              <div class="spotlight-banner" :style="{ background: `linear-gradient(135deg, ${featuredEvent.color1 || '#10b981'}, ${featuredEvent.color2 || '#059669'})` }">
                <div class="spotlight-content">
                  <span class="spotlight-badge">✨ Featured Event</span>
                  <h2>{{ featuredEvent.title }}</h2>
                  <p>{{ featuredEvent.description }}</p>
                  <div class="spotlight-meta">
                    <span><i class="fas fa-calendar"></i> {{ featuredEvent.date }}</span>
                    <span><i class="fas fa-map-marker-alt"></i> {{ featuredEvent.location }}</span>
                  </div>
                  <button @click="register(featuredEvent.id)" class="btn-spotlight">
                    {{ isRegistered(featuredEvent.id) ? '✓ Registered' : 'Join Now' }}
                  </button>
                </div>
                <div class="spotlight-icon">
                  <component :is="getIconComponent(featuredEvent.category)" :size="120" :stroke-width="1.5" />
                </div>
              </div>
            </div>

            <!-- Event Listings Grid -->
            <div class="events-section">
              <h3>Discover Events</h3>
              <div class="events-grid">
                <EventCard
                  v-for="(event, index) in filteredEvents" 
                  :key="event.id"
                  :icon="getIcon(event.category)"
                  :price="event.price"
                  :category="event.category"
                  :category-color="getCategoryColor(event.category)"
                  :title="event.title"
                  :description="event.description"
                  :date="event.date"
                  :location="event.location"
                  :attendee-count="event.volunteers.length"
                  :max-attendees="event.maxVolunteers"
                  :button-text="isRegistered(event.id) ? '✓ Registered' : 'Join Event'"
                  :button-variant="isRegistered(event.id) ? 'secondary' : 'primary'"
                  :is-disabled="isRegistered(event.id)"
                  :animation-delay="`${index * 0.05}s`"
                  @action="register(event.id)"
                />
              </div>
            </div>

            <!-- Discovery Call-to-Action -->
            <div class="discovery-cta">
              <div class="cta-content">
                <h3>🌟 Thousands of other events are waiting for you</h3>
                <p>Explore more opportunities to make a difference in your community</p>
                <button @click="loadMoreEvents" class="btn-explore">Explore More Events</button>
              </div>
            </div>
          </div>

          <!-- Sidebar Section -->
          <aside class="secondary-sidebar">
            <!-- Your Groups Section -->
            <div class="groups-section">
              <h3>Your groups</h3>
              <div class="groups-grid">
                <GroupCard
                  v-for="(group, index) in userGroups" 
                  :key="group.id"
                  :emoji="group.emoji"
                  :icon-color="group.color"
                  :title="group.name"
                  :description="group.description"
                  :member-count="group.members"
                  :event-count="group.events"
                  :category="group.category"
                  :button-text="'View Group'"
                  :button-variant="'secondary'"
                  :animation-delay="`${index * 0.1}s`"
                  @action="viewGroup(group.id)"
                />
              </div>
              <button class="btn-discover-groups">+ Discover new groups</button>
            </div>

            <!-- Premium Feature Promotion -->
            <div class="premium-promo">
              <div class="promo-icon">⭐</div>
              <h4>Find your people with Volunteer+</h4>
              <p>Get personalized recommendations and exclusive access to premium events</p>
              <button class="btn-premium">Learn More</button>
            </div>
          </aside>
        </div>
      </main>

      <!-- Other Tabs -->
      <main class="content" v-else>
        <div v-if="activeTab === 'registered'" class="main-content">
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
import DashboardNavbar from '../components/common/DashboardNavbar.vue'
import DashboardSidebar from '../components/common/DashboardSidebar.vue'
import CalendarSidebar from '../components/common/CalendarSidebar.vue'
import MyEvents from '../components/volunteer/MyEvents.vue'
import HoursBadgesTracker from '../components/volunteer/HoursBadgesTracker.vue'
import NotificationsPanel from '../components/common/NotificationsPanel.vue'
import ProfileSettings from '../components/common/ProfileSettings.vue'
import EventCard from '../components/common/EventCard.vue'
import GroupCard from '../components/common/GroupCard.vue'
import { 
  Leaf,
  BookOpen,
  Heart,
  Home,
  Paw,
  AlertCircle,
  UserCheck,
  Baby,
  Calendar
} from 'lucide-vue-next'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const activeTab = ref('browse')
const calendarOpen = ref(false)
const searchQuery = ref('')

const myEvents = computed(() => 
  eventsStore.events.filter(e => e.volunteers.includes(authStore.currentUser?.id))
)

const featuredEvent = computed(() => {
  const available = eventsStore.events.filter(e => !e.volunteers.includes(authStore.currentUser?.id))
  return available[0] || null
})

const filteredEvents = computed(() => {
  let events = eventsStore.events.filter(e => e.id !== featuredEvent.value?.id)
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    events = events.filter(e => 
      e.title.toLowerCase().includes(query) ||
      e.category.toLowerCase().includes(query) ||
      e.location.toLowerCase().includes(query)
    )
  }
  
  return events
})

const userGroups = ref([
  { 
    id: 1, 
    name: 'Environmental Warriors', 
    emoji: '🌱', 
    members: 234, 
    events: 12,
    category: 'Environment',
    description: 'Join us in making the planet greener, one tree at a time',
    color: '#10b981' 
  },
  { 
    id: 2, 
    name: 'Community Builders', 
    emoji: '🏘️', 
    members: 567, 
    events: 24,
    category: 'Community',
    description: 'Building stronger communities through volunteer work',
    color: '#3b82f6' 
  },
  { 
    id: 3, 
    name: 'Education Champions', 
    emoji: '📚', 
    members: 189, 
    events: 8,
    category: 'Education',
    description: 'Empowering minds through education and mentorship',
    color: '#f59e0b' 
  },
  { 
    id: 4, 
    name: 'Healthcare Heroes', 
    emoji: '❤️', 
    members: 423, 
    events: 16,
    category: 'Healthcare',
    description: 'Supporting health and wellness in our communities',
    color: '#ef4444' 
  }
])

const categoryEmojis = {
  'Environment': '🌱',
  'Education': '📚',
  'Healthcare': '❤️',
  'Community': '🏘️',
  'Animals': '🐾',
  'Disaster Relief': '🆘',
  'Elderly Care': '👴',
  'Youth Programs': '👶'
}

const categoryIcons = {
  'Environment': 'Leaf',
  'Education': 'BookOpen',
  'Healthcare': 'Heart',
  'Community': 'Home',
  'Animals': 'Paw',
  'Disaster Relief': 'AlertCircle',
  'Elderly Care': 'UserCheck',
  'Youth Programs': 'Baby'
}

const getEmoji = (category) => categoryEmojis[category] || '📅'
const getIcon = (category) => categoryIcons[category] || 'Calendar'

const getIconComponent = (category) => {
  const iconMap = {
    'Leaf': Leaf,
    'BookOpen': BookOpen,
    'Heart': Heart,
    'Home': Home,
    'Paw': Paw,
    'AlertCircle': AlertCircle,
    'UserCheck': UserCheck,
    'Baby': Baby,
    'Calendar': Calendar
  }
  const iconName = getIcon(category)
  return iconMap[iconName] || Calendar
}

const getCategoryColor = (category) => {
  const colors = {
    'Environment': '#dcfce7',
    'Education': '#fef3c7',
    'Healthcare': '#fee2e2',
    'Community': '#dbeafe',
    'Animals': '#fce7f3',
    'Disaster Relief': '#ffedd5',
    'Elderly Care': '#e0e7ff',
    'Youth Programs': '#fae8ff'
  }
  return colors[category] || '#e0f2fe'
}

const viewGroup = (groupId) => {
  console.log('Viewing group:', groupId)
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const isRegistered = (eventId) => {
  const event = eventsStore.events.find(e => e.id === eventId)
  return event?.volunteers.includes(authStore.currentUser?.id)
}

const register = (eventId) => {
  eventsStore.registerForEvent(eventId, authStore.currentUser.id)
}

const loadMoreEvents = () => {
  // Implement load more functionality
  console.log('Loading more events...')
}

const handleNavigate = (id) => {
  if (id === 'calendar') {
    calendarOpen.value = !calendarOpen.value
  } else {
    activeTab.value = id
  }
}

const handleSearch = (query) => {
  searchQuery.value = query
}
</script>

<style scoped>
/* Base Layout */
.dashboard { 
  min-height: 100vh; 
  background: #f9fafb; 
  padding-top: 80px; 
}

.layout { 
  display: flex; 
  position: relative; 
}

.content { 
  margin-left: 70px; 
  flex: 1; 
  transition: margin-right 0.3s; 
}

/* Main Container */
.main-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
  padding: 40px 60px;
  max-width: 1600px;
  margin: 0 auto;
}

/* Featured Spotlight */
.featured-spotlight {
  margin-bottom: 40px;
  animation: fadeInUp 0.6s ease-out;
}

.spotlight-banner {
  border-radius: 16px;
  padding: 50px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  position: relative;
  overflow: hidden;
}

.spotlight-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
}

.spotlight-content {
  flex: 1;
  z-index: 1;
}

.spotlight-badge {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 15px;
}

.spotlight-content h2 {
  font-size: 36px;
  margin: 0 0 15px;
  font-weight: 700;
}

.spotlight-content p {
  font-size: 18px;
  margin: 0 0 20px;
  opacity: 0.95;
  max-width: 600px;
}

.spotlight-meta {
  display: flex;
  gap: 25px;
  margin-bottom: 25px;
  font-size: 16px;
}

.spotlight-meta span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-spotlight {
  background: white;
  color: #10b981;
  padding: 14px 32px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-spotlight:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.spotlight-icon {
  font-size: 120px;
  opacity: 0.3;
  z-index: 1;
}

/* Events Section */
.events-section {
  margin-bottom: 40px;
}

.events-section h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 25px;
}

/* Animated Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Discovery CTA */
.discovery-cta {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 16px;
  padding: 60px;
  text-align: center;
  color: white;
  animation: fadeInUp 0.6s ease-out 0.3s backwards;
}

.cta-content h3 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 15px;
}

.cta-content p {
  font-size: 18px;
  margin: 0 0 30px;
  opacity: 0.95;
}

.btn-explore {
  background: white;
  color: #6366f1;
  padding: 14px 32px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-explore:hover {
  transform: scale(1.05);
}

/* Secondary Sidebar */
.secondary-sidebar {
  position: sticky;
  top: 200px;
  height: fit-content;
}

.groups-section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  animation: fadeInUp 0.6s ease-out 0.2s backwards;
}

.groups-section h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px;
}

.groups-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 20px;
}

.btn-discover-groups {
  width: 100%;
  padding: 12px;
  background: #f3f4f6;
  color: #1f2937;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-discover-groups:hover {
  background: #e5e7eb;
}

/* Premium Promo */
.premium-promo {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  animation: fadeInUp 0.6s ease-out 0.4s backwards;
}

.promo-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.premium-promo h4 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 10px;
}

.premium-promo p {
  font-size: 14px;
  margin: 0 0 20px;
  opacity: 0.95;
}

.btn-premium {
  background: white;
  color: #f59e0b;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-premium:hover {
  transform: scale(1.05);
}

/* Other Tabs */
.main-content { 
  padding: 40px 60px; 
}

.page-header { 
  margin-bottom: 40px; 
  text-align: center; 
}

.page-header h1 { 
  font-size: 42px; 
  margin: 0 0 10px; 
  color: #1f2937; 
  font-weight: 700; 
}

.page-header p { 
  font-size: 18px; 
  color: #6b7280; 
  margin: 0; 
}

/* Responsive */
@media (max-width: 1200px) {
  .main-container {
    grid-template-columns: 1fr;
  }
  
  .secondary-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .dashboard-header,
  .main-container {
    padding: 20px 30px;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .spotlight-banner {
    flex-direction: column;
    text-align: center;
    padding: 30px;
  }
  
  .spotlight-icon {
    display: none;
  }
}
</style>
