<template>
  <div class="stats">
    <div class="stat-card">
      <h3>{{ stats.events }}</h3>
      <p>Total Events</p>
    </div>
    <div class="stat-card">
      <h3>{{ stats.volunteers }}</h3>
      <p>Total Volunteers</p>
    </div>
    <div class="stat-card">
      <h3>{{ stats.active }}</h3>
      <p>Active Events</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['stats'])
</script>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
.stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
.stat-card h3 { font-size: 32px; margin: 0; color: #28a745; }
</style>
