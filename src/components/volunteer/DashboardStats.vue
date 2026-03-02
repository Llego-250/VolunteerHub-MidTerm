<template>
  <div class="stats">
    <div class="stat-card">
      <i class="fas fa-calendar-check"></i>
      <h3>{{ stats.registered }}</h3>
      <p>Registered Events</p>
    </div>
    <div class="stat-card">
      <i class="fas fa-clock"></i>
      <h3>{{ stats.upcoming }}</h3>
      <p>Upcoming Events</p>
    </div>
    <div class="stat-card">
      <i class="fas fa-check-circle"></i>
      <h3>{{ stats.completed }}</h3>
      <p>Completed Events</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['stats'])
</script>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
.stat-card { background: white; padding: 30px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.stat-card i { font-size: 40px; color: var(--primary); margin-bottom: 15px; }
.stat-card h3 { font-size: 36px; margin: 10px 0; color: var(--primary); }
.stat-card p { color: var(--gray); margin: 0; }
</style>
