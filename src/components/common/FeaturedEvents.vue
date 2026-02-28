<template>
  <section class="featured">
    <div class="events-grid">
      <div v-for="event in events" :key="event.id" class="event-card">
        <div class="event-header" :style="{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }">
          <i :class="getIcon(event.category)" style="font-size: 64px; color: white;"></i>
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
            <span v-if="event.status" class="status-badge">{{ event.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps(['events'])

const categoryIcons = {
  'Environment': 'fas fa-leaf',
  'Education': 'fas fa-book',
  'Healthcare': 'fas fa-heartbeat',
  'Community': 'fas fa-heart',
  'Animals': 'fas fa-paw',
  'Disaster Relief': 'fas fa-hands-helping',
  'Elderly Care': 'fas fa-user-friends',
  'Youth Programs': 'fas fa-child'
}

const getIcon = (category) => {
  return categoryIcons[category] || 'fas fa-calendar'
}
</script>

<style scoped>
.events-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width: 1200px; margin: 0 auto; }
.event-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.3s; }
.event-card:hover { transform: translateY(-5px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
.event-header { height: 200px; display: flex; align-items: center; justify-content: center; }
.event-body { padding: 25px; }
.category-badge { background: var(--primary); color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.event-body h3 { margin: 15px 0; font-size: 20px; }
.event-meta { display: flex; flex-direction: column; gap: 8px; margin: 15px 0; color: var(--gray); font-size: 14px; }
.event-meta span { display: flex; align-items: center; gap: 6px; }
.event-meta i { font-size: 14px; }
.event-body p { color: var(--gray); font-size: 14px; line-height: 1.6; margin: 15px 0; }
.event-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; font-size: 14px; color: var(--gray); }
.status-badge { background: var(--light-gray); padding: 5px 10px; border-radius: 5px; font-size: 12px; }
</style>
