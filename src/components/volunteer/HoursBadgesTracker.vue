<template>
  <div class="hours-badges-tracker">
    <h2>Hours & Badges</h2>
    <div class="tabs">
      <button @click="tab = 'hours'" :class="{ active: tab === 'hours' }">Hours</button>
      <button @click="tab = 'badges'" :class="{ active: tab === 'badges' }">Badges</button>
    </div>
    <div v-if="tab === 'hours'" class="content">
      <h3>Total Hours: 0</h3>
    </div>
    <div v-else class="content">
      <h3>Badges Earned: 0</h3>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('hours')
</script>

<style scoped>
.hours-badges-tracker { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
h2 { margin-bottom: 20px; }
.tabs { display: flex; gap: 10px; margin-bottom: 20px; }
.tabs button { padding: 10px 20px; }
.tabs button.active { background: var(--primary); color: white; }
.content h3 { font-size: 24px; color: var(--primary); }
</style>
