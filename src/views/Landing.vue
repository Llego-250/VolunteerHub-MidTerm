<template>
  <div class="landing">
    <Navbar @showLogin="showLogin = true" @showSignup="showSignup = true" />
    
    <section id="home" class="hero">
      <video autoplay loop muted playsinline class="hero-video">
        <source :src="heroVideo" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Connect. Volunteer. Make a Difference.</h1>
        <p>Join thousands of volunteers making positive impact in communities worldwide. Find meaningful opportunities or organize events that matter.</p>
        <div class="hero-buttons">
          <button @click="openSignup('volunteer')" class="btn-large">Start Volunteering</button>
          <button @click="openSignup('organizer')" class="btn-outline-large">Organize Events</button>
        </div>
      </div>
    </section>

    <section class="featured-section">
      <h2>Featured Events</h2>
      <FeaturedEvents :events="displayedEvents" />
      <div class="cta-buttons">
        <button @click="loadMore" v-if="canLoadMore" class="btn-large">Load More Events</button>
        <button @click="$router.push('/events')" class="btn-outline-large">Browse All Events</button>
      </div>
    </section>

    <section id="about" class="about-section">
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
          <router-link to="/events">Browse Events</router-link>
          <a href="#about" @click="scrollTo('about')">About Us</a>
          <router-link to="/contact">Contact</router-link>
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

    <LoginModal v-if="showLogin" @close="showLogin = false" @switchToSignup="showLogin = false; showSignup = true" />
    <SignupModal v-if="showSignup" @close="showSignup = false" :defaultRole="signupRole" @switchToLogin="showSignup = false; showLogin = true" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEventsStore } from '../stores/events'
import Navbar from '../components/common/Navbar.vue'
import FeaturedEvents from '../components/common/FeaturedEvents.vue'
import LoginModal from '../components/common/LoginModal.vue'
import SignupModal from '../components/common/SignupModal.vue'
import { Search, Calendar, Users, Heart } from 'lucide-vue-next'
import heroVideo from '../assets/vovo.mp4'

const eventsStore = useEventsStore()
const showLogin = ref(false)
const showSignup = ref(false)
const signupRole = ref('')
const eventsToShow = ref(3)

const displayedEvents = computed(() => eventsStore.events.slice(0, eventsToShow.value))
const canLoadMore = computed(() => eventsToShow.value < eventsStore.events.length)

const loadMore = () => {
  eventsToShow.value += 3
}

const openSignup = (role) => {
  signupRole.value = role
  showSignup.value = true
}
</script>

<style scoped>
.landing { background: rgb(255, 255, 255); margin: 0; padding: 0; }
.hero { position: relative; color: white; padding: 120px 60px; text-align: center; min-height: 600px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.hero-video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
.hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1; }
.hero-content { position: relative; z-index: 2; }
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
.footer-col a { display: block; color: #9ca3af; margin-bottom: 10px; cursor: pointer; }
.footer-bottom { text-align: center; padding-top: 20px; border-top: 1px solid #374151; color: #9ca3af; }

@media (max-width: 768px) {
  .hero-content h1 { font-size: 32px; }
  .features { grid-template-columns: 1fr; }
  .stats { flex-direction: column; gap: 30px; }
}
</style>
