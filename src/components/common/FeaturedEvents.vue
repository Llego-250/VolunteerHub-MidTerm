<template>
  <section class="featured">
    <div class="events-grid">
      <div v-for="event in events" :key="event.id" class="event-card">
        <div class="event-header">
          <i :class="getIcon(event.category)" class="event-icon"></i>
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
.events-grid { 
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.event-card { 
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;
  position: relative;
}

.event-card::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.1));
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.event-card:hover { 
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-hover);
  background: var(--bg-card-hover);
}

.event-card:hover::before {
  opacity: 1;
}

.event-header { 
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3));
  border-bottom: 1px solid var(--border-primary);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
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
  font-size: 64px;
  color: var(--accent-primary);
  filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.6));
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.event-card:hover .event-icon {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 0 25px rgba(16, 185, 129, 0.8));
}

.event-body { padding: 25px; }

.category-badge { 
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: var(--shadow-glow);
}

.event-body h3 { 
  margin: 15px 0;
  font-size: 20px;
  color: var(--text-primary);
}

.event-meta { 
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 15px 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.event-meta span { 
  display: flex;
  align-items: center;
  gap: 6px;
}

.event-meta i { 
  font-size: 14px;
  color: var(--accent-primary);
}

.event-body p { 
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin: 15px 0;
}

.event-footer { 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid var(--border-primary);
  font-size: 14px;
  color: var(--text-muted);
}

.status-badge { 
  background: rgba(16, 185, 129, 0.15);
  color: var(--accent-primary);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  border: 1px solid var(--border-primary);
  font-weight: 600;
  transition: all 0.3s ease;
}

.event-card:hover .status-badge {
  background: rgba(16, 185, 129, 0.25);
  border-color: var(--accent-primary);
}

@media (max-width: 1024px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
}
</style>
