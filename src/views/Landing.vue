<template>
  <div class="landing">
    <header class="nav-header">
      <div class="logo">
        <HandHeart :size="32" color="#10b981" />
        <h1>VolunteerHub</h1>
      </div>
      <nav class="nav-links" :class="{ active: mobileMenuOpen }">
        <a href="#home" @click="scrollTo('home')">Home</a>
        <router-link to="/events">Events</router-link>
        <a href="#about" @click="scrollTo('about')">About</a>
        <router-link to="/contact">Contact</router-link>
      </nav>
      <div class="auth-dropdown">
        <button @click="dropdownOpen = !dropdownOpen" class="btn-get-started">Get Started <ChevronDown :size="16" /></button>
        <div v-if="dropdownOpen" class="dropdown-menu">
          <button @click="showLogin = true; dropdownOpen = false">Login</button>
          <button @click="showSignup = true; dropdownOpen = false">Sign Up</button>
        </div>
      </div>
      <button class="hamburger" @click="mobileMenuOpen = !mobileMenuOpen">
        <Menu v-if="!mobileMenuOpen" :size="24" />
        <X v-else :size="24" />
      </button>
    </header>
    
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
import FeaturedEvents from '../components/common/FeaturedEvents.vue'
import LoginModal from '../components/common/LoginModal.vue'
import SignupModal from '../components/common/SignupModal.vue'
import { HandHeart, Search, Calendar, Users, Heart, ChevronDown, Menu, X } from 'lucide-vue-next'
import heroVideo from '../assets/vovo.mp4'

const eventsStore = useEventsStore()
const showLogin = ref(false)
const showSignup = ref(false)
const signupRole = ref('')
const dropdownOpen = ref(false)
const mobileMenuOpen = ref(false)
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

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.landing { background: rgb(255, 255, 255); margin: 0; padding: 0; }
.nav-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 60px; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
.logo { display: flex; align-items: center; gap: 10px; }
.logo h1 { font-size: 24px; color: var(--primary); margin: 0; }
.nav-links { display: flex; gap: 30px; }
.nav-links a { color: var(--dark); font-weight: 500; cursor: pointer; }
.auth-dropdown { position: relative; }
.btn-get-started { display: flex; align-items: center; gap: 5px; }
.dropdown-menu { position: absolute; top: 100%; right: 0; margin-top: 10px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 150px; }
.dropdown-menu button { width: 100%; text-align: left; padding: 12px 20px; background: white; color: var(--dark); border-radius: 0; }
.dropdown-menu button:hover { background: var(--light-gray); }
.hamburger { display: none; background: none; border: none; color: var(--dark); cursor: pointer; }
.hero { position: relative; color: white; top:0; padding: 120px 60px; text-align: center; min-height: 600px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
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
  .nav-header { padding: 15px 20px; }
  .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: white; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
  .nav-links.active { display: flex; }
  .hamburger { display: block; }
  .auth-dropdown { display: none; }
  .hero-content h1 { font-size: 32px; }
  .features { grid-template-columns: 1fr; }
  .stats { flex-direction: column; gap: 30px; }
}
</style>
