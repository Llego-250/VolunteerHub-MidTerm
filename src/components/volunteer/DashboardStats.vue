<template>
  <div class="stats">
    <div class="stat-card">
      <div class="icon-circle">
        <i class="fas fa-calendar-check"></i>
      </div>
      <h3>{{ stats.registered }}</h3>
      <p>Registered Events</p>
    </div>
    <div class="stat-card">
      <div class="icon-circle">
        <i class="fas fa-clock"></i>
      </div>
      <h3>{{ stats.upcoming }}</h3>
      <p>Upcoming Events</p>
    </div>
    <div class="stat-card">
      <div class="icon-circle">
        <i class="fas fa-trophy"></i>
      </div>
      <h3>{{ stats.completed }}</h3>
      <p>Completed Events</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['stats'])
</script>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 40px; }
.stat-card { background: white; padding: 40px 30px; border-radius: 16px; text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
.icon-circle { 
  width: 80px; 
  height: 80px; 
  margin: 0 auto 20px; 
  border-radius: 50%; 
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-circle i { font-size: 36px; color: white; }
.stat-card h3 { font-size: 48px; margin: 10px 0; color: #1f2937; font-weight: 700; }
.stat-card p { color: #6b7280; margin: 0; font-size: 16px; }
</style>
