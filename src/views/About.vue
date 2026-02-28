<template>
  <div class="about">
    <Navbar />
    <div class="about-content">
      <h1>About VolunteerHub</h1>
      <p>Connecting volunteers with meaningful opportunities to make a positive impact in communities.</p>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/common/Navbar.vue'
</script>

<style scoped>
.about { background: var(--light-gray); min-height: 100vh; }
.about-content { padding: 140px 60px 40px; max-width: 800px; margin: 0 auto; }
.about-content h1 { font-size: 36px; margin-bottom: 20px; }
.about-content p { color: var(--gray); font-size: 18px; line-height: 1.8; }
</style>
