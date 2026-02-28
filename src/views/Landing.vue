<template>
  <div class="landing">
    <header class="nav-header">
      <div class="logo">
        <HandHeart :size="32" color="#10b981" />
        <h1>VolunteerHub</h1>
      </div>
      <nav class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/events">Events</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
      <div class="auth-buttons">
        <button @click="showLogin = true" class="btn-outline">Login</button>
        <button @click="showSignup = true">Sign Up</button>
      </div>
    </header>
    
    <section class="hero">
      <div class="hero-content">
        <h1>Connect. Volunteer. Make a Difference.</h1>
        <p>Join thousands of volunteers making positive impact in communities worldwide. Find meaningful opportunities or organize events that matter.</p>
        <div class="hero-buttons">
          <button @click="showSignup = true" class="btn-large">Start Volunteering</button>
          <button @click="showSignup = true" class="btn-outline-large">Organize Events</button>
        </div>
      </div>
    </section>

    <section class="featured-section">
      <h2>Featured Events</h2>
      <FeaturedEvents />
      <div class="cta-buttons">
        <button @click="$router.push('/events')" class="btn-large">Load More Events</button>
        <button @click="$router.push('/events')" class="btn-outline-large">Browse All Events</button>
      </div>
    </section>

    <section class="about-section">
      <h2>About VolunteerHub</h2>
      <p>VolunteerHub is a comprehensive platform that bridges the gap between passionate volunteers and meaningful opportunities. We empower organizers to create impactful events while providing volunteers with easy access to causes they care about.</p>
      <div class="stats">
        <div class="stat"><h3>10,000+</h3><p>Active Volunteers</p></div>
        <div class="stat"><h3>500+</h3><p>Events Organized</p></div>
        <div class="stat"><h3>50+</h3><p>Partner Organizations</p></div>
      </div>
      <div class="features">
        <div class="feature"><Search :size="40" color="#10b981" /><h4>Easy Discovery</h4><p>Find events by category, location, and date</p></div>
        <div class="feature"><Calendar :size="40" color="#10b981" /><h4>Event Management</h4><p>Comprehensive tools for organizers</p></div>
        <div class="feature"><Users :size="40" color="#10b981" /><h4>Community Building</h4><p>Connect with like-minded volunteers</p></div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-col">
          <h3><Heart :size="20" /> VolunteerHub</h3>
          <p>Connecting volunteers with meaningful opportunities worldwide.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <a href="#">Browse Events</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 VolunteerHub. All rights reserved.</p>
      </div>
    </footer>

    <LoginModal v-if="showLogin" @close="showLogin = false" />
    <SignupModal v-if="showSignup" @close="showSignup = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeaturedEvents from '../components/common/FeaturedEvents.vue'
import LoginModal from '../components/common/LoginModal.vue'
import SignupModal from '../components/common/SignupModal.vue'
import { HandHeart, Search, Calendar, Users, Heart } from 'lucide-vue-next'

const showLogin = ref(false)
const showSignup = ref(false)
</script>

<style scoped>
.landing { background: white; }
.nav-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.logo { display: flex; align-items: center; gap: 10px; }
.logo h1 { font-size: 24px; color: var(--primary); margin: 0; }
.nav-links { display: flex; gap: 30px; }
.nav-links a { color: var(--dark); font-weight: 500; }
.auth-buttons { display: flex; gap: 10px; }
.btn-outline { background: white; color: var(--primary); border: 2px solid var(--primary); }
.btn-outline:hover { background: var(--primary); color: white; }
.hero { background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200') center/cover; color: white; padding: 120px 60px; text-align: center; }
.hero-content h1 { font-size: 48px; margin-bottom: 20px; font-weight: 700; }
.hero-content p { font-size: 18px; max-width: 800px; margin: 0 auto 40px; }
.hero-buttons { display: flex; gap: 20px; justify-content: center; }
.btn-large { padding: 15px 40px; font-size: 16px; }
.btn-outline-large { padding: 15px 40px; font-size: 16px; background: transparent; border: 2px solid white; color: white; }
.btn-outline-large:hover { background: white; color: var(--primary); }
.featured-section { padding: 80px 60px; background: var(--light-gray); text-align: center; }
.featured-section h2 { font-size: 36px; margin-bottom: 40px; }
.cta-buttons { display: flex; gap: 20px; justify-content: center; margin-top: 40px; }
.about-section { padding: 80px 60px; text-align: center; background: white; }
.about-section h2 { font-size: 36px; margin-bottom: 20px; }
.about-section > p { max-width: 800px; margin: 0 auto 60px; color: var(--gray); font-size: 16px; }
.stats { display: flex; justify-content: center; gap: 80px; margin-bottom: 60px; }
.stat h3 { font-size: 36px; color: var(--primary); margin-bottom: 10px; }
.stat p { color: var(--gray); }
.features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; max-width: 1000px; margin: 0 auto; }
.feature { text-align: left; }
.feature h4 { margin: 15px 0 10px; font-size: 20px; }
.feature p { color: var(--gray); }
.footer { background: #1f2937; color: white; padding: 60px 60px 20px; }
.footer-content { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; margin-bottom: 40px; }
.footer-col h3, .footer-col h4 { margin-bottom: 20px; color: var(--primary); display: flex; align-items: center; gap: 8px; }
.footer-col a { display: block; color: #9ca3af; margin-bottom: 10px; }
.footer-bottom { text-align: center; padding-top: 20px; border-top: 1px solid #374151; color: #9ca3af; }
</style>
