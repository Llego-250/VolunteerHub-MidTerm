<template>
  <div class="stats">
    <div class="stat-card">
      <h3>{{ stats.registered }}</h3>
      <p>Registered Events</p>
    </div>
    <div class="stat-card">
      <h3>{{ stats.hours }}</h3>
      <p>Hours Volunteered</p>
    </div>
    <div class="stat-card">
      <h3>{{ stats.badges }}</h3>
      <p>Badges Earned</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['stats'])
</script>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
.stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
.stat-card h3 { font-size: 32px; margin: 0; color: #007bff; }
</style>
