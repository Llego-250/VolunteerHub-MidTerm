<template>
  <header class="nav-header">
    <div class="logo">
      <HandHeart :size="32" color="white" />
      <h1>VolunteerHub</h1>
    </div>
    <nav class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/events">Events</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
  </header>
</template>

<script setup>
import { HandHeart } from 'lucide-vue-next'
</script>

<style scoped>
.nav-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; background: rgba(0,0,0,0.3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: none; position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
.logo { display: flex; align-items: center; gap: 10px; }
.logo h1 { font-size: 24px; color: white; margin: 0; }
.nav-links { display: flex; gap: 30px; }
.nav-links a { color: white; font-weight: 500; }
.nav-links a:hover { opacity: 0.8; }
</style>
