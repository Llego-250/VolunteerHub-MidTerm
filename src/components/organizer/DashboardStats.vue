<template>
  <div class="stats">
    <div class="stat-card">
      <div class="stat-icon" style="background: linear-gradient(135deg, #10b981, #34d399);">📅</div>
      <div class="stat-content">
        <h3>{{ stats.events }}</h3>
        <p>Total Events</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b, #fbbf24);">👥</div>
      <div class="stat-content">
        <h3>{{ stats.volunteers }}</h3>
        <p>Total Volunteers</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: linear-gradient(135deg, #10b981, #f59e0b);">📋</div>
      <div class="stat-content">
        <h3>{{ stats.active }}</h3>
        <p>Active Events</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['stats'])
</script>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-bottom: 40px; }
.stat-card { background: white; padding: 30px; border-radius: 12px; display: flex; align-items: center; gap: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.stat-icon { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.stat-content h3 { font-size: 32px; margin: 0; color: var(--dark); }
.stat-content p { margin: 5px 0 0; color: var(--gray); font-size: 14px; }
</style>
