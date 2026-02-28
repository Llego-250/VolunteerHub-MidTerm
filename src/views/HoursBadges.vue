<template>
  <div class="hours-badges">
    <Navbar />
    <div class="container">
      <h1>Hours & Badges</h1>
    <div class="tabs">
      <button @click="tab = 'hours'" :class="{ active: tab === 'hours' }">Hours</button>
      <button @click="tab = 'badges'" :class="{ active: tab === 'badges' }">Badges</button>
    </div>
    <div v-if="tab === 'hours'" class="content">
      <h2>Total Hours: 0</h2>
    </div>
    <div v-else class="content">
      <h2>Badges Earned: 0</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/common/Navbar.vue'

const tab = ref('hours')
</script>

<style scoped>
.hours-badges { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }
.container { padding: 40px; max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; margin-top: 40px; }
.tabs { display: flex; gap: 10px; margin: 20px 0; }
.tabs button { padding: 10px 20px; }
.tabs button.active { background: #007bff; color: white; }
.content { margin-top: 30px; }
</style>
