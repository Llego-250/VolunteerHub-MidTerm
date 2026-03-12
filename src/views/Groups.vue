<template>
  <div class="groups-page">
    <DashboardNavbar />
    <div class="layout">
      <DashboardSidebar role="volunteer" :activeTab="'groups'" @navigate="handleNavigate" />
      
      <main class="content">
        <div class="page-container">
          <div class="page-header">
            <h1>Your Groups</h1>
            <p>Connect with communities that share your passion for volunteering</p>
          </div>

          <div class="groups-grid">
            <GroupCard
              v-for="(group, index) in allGroups" 
              :key="group.id"
              :icon="group.icon"
              :emoji="group.emoji"
              :icon-color="group.color"
              :title="group.name"
              :description="group.description"
              :member-count="group.members"
              :event-count="group.events"
              :category="group.category"
              :button-text="isJoined(group.id) ? 'Leave Group' : 'Join Group'"
              :button-variant="isJoined(group.id) ? 'secondary' : 'primary'"
              :is-disabled="false"
              :animation-delay="`${index * 0.05}s`"
              @action="toggleGroup(group.id)"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardNavbar from '../components/common/DashboardNavbar.vue'
import DashboardSidebar from '../components/common/DashboardSidebar.vue'
import GroupCard from '../components/common/GroupCard.vue'

const router = useRouter()
const joinedGroups = ref([1, 2, 3, 4])

const categoryColors = {
  'Environment': { primary: '#10b981' },
  'Education': { primary: '#f59e0b' },
  'Healthcare': { primary: '#ef4444' },
  'Community': { primary: '#3b82f6' },
  'Animals': { primary: '#ec4899' },
  'Disaster Relief': { primary: '#f97316' },
  'Elderly Care': { primary: '#8b5cf6' },
  'Youth Programs': { primary: '#a855f7' }
}

const allGroups = ref([
  { 
    id: 1, 
    name: 'Environmental Warriors', 
    icon: 'Leaf',
    emoji: '🌱', 
    members: 234, 
    events: 12,
    category: 'Environment',
    description: 'Join us in making the planet greener, one tree at a time',
    color: categoryColors['Environment'].primary
  },
  { 
    id: 2, 
    name: 'Community Builders', 
    icon: 'Home',
    emoji: '🏘️', 
    members: 567, 
    events: 24,
    category: 'Community',
    description: 'Building stronger communities through volunteer work',
    color: categoryColors['Community'].primary
  },
  { 
    id: 3, 
    name: 'Education Champions', 
    icon: 'BookOpen',
    emoji: '📚', 
    members: 189, 
    events: 8,
    category: 'Education',
    description: 'Empowering minds through education and mentorship',
    color: categoryColors['Education'].primary
  },
  { 
    id: 4, 
    name: 'Healthcare Heroes', 
    icon: 'Heart',
    emoji: '❤️', 
    members: 423, 
    events: 16,
    category: 'Healthcare',
    description: 'Supporting health and wellness in our communities',
    color: categoryColors['Healthcare'].primary
  },
  { 
    id: 5, 
    name: 'Animal Advocates', 
    icon: 'Dog',
    emoji: '🐾', 
    members: 312, 
    events: 14,
    category: 'Animals',
    description: 'Protecting and caring for animals in need',
    color: categoryColors['Animals'].primary
  },
  { 
    id: 6, 
    name: 'Disaster Response Team', 
    icon: 'AlertCircle',
    emoji: '🆘', 
    members: 156, 
    events: 9,
    category: 'Disaster Relief',
    description: 'First responders for community emergencies',
    color: categoryColors['Disaster Relief'].primary
  }
])

const isJoined = (groupId) => {
  return joinedGroups.value.includes(groupId)
}

const toggleGroup = (groupId) => {
  if (isJoined(groupId)) {
    // Leave group
    joinedGroups.value = joinedGroups.value.filter(id => id !== groupId)
  } else {
    // Join group
    joinedGroups.value.push(groupId)
  }
}

const handleNavigate = (id) => {
  if (id === 'browse') {
    router.push('/volunteer-dashboard')
  }
}
</script>

<style scoped>
.groups-page {
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
  padding: 40px 60px;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
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

.groups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .content {
    padding: 20px 30px;
  }
  
  .groups-grid {
    grid-template-columns: 1fr;
  }
}
</style>
