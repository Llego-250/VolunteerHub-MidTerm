<template>
  <div class="landing">
    <!-- 3D Parallax Background -->
    <Parallax3D />
    
    <!-- Navigation with clear branding -->
    <MinimalNavbar @showLogin="showLogin = true" @showSignup="showSignup = true" />

    <!-- Hero Section with clear value proposition -->
    <section class="hero">
      <video autoplay loop muted playsinline class="hero-video">
        <source :src="heroVideo" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Make a Difference, <span class="highlight">One Hour at a Time</span></h1>
        <p class="hero-subtitle">Join thousands of volunteers finding meaningful opportunities or organize events that create real impact in your community.</p>
        <div v-if="!authStore.isAuthenticated" class="hero-buttons">
          <button @click="openSignup('volunteer')" class="btn-primary">
            <span>Start Volunteering →</span>
          </button>
          <button @click="openSignup('organizer')" class="btn-secondary">
            Organize Events
          </button>
        </div>
        <!-- Trust signal -->
        <div class="trust-badge">
          <span>✨ Trusted by 500+ organizations worldwide</span>
        </div>
      </div>
    </section>

    <!-- Trust Signals - Partner Logos -->
    <div class="partners-section">
      <p class="partners-title">Trusted by leading organizations</p>
      <div class="partner-logos">
        <div class="partner-logo">Red Cross</div>
        <div class="partner-logo">UNICEF</div>
        <div class="partner-logo">Habitat for Humanity</div>
        <div class="partner-logo">Feeding America</div>
      </div>
    </div>

    <!-- Features Section - What users gain -->
    <section id="features" class="features-section">
      <div class="container">
        <h2 class="section-title">Why Join VolunteerHub?</h2>
        <p class="section-subtitle">Everything you need to make volunteering meaningful and impactful</p>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <Search :size="32" color="#10b981" />
            </div>
            <h3>Find Your Perfect Match</h3>
            <p>Discover opportunities that align with your skills, interests, and schedule. Filter by cause, location, or time commitment.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <Calendar :size="32" color="#10b981" />
            </div>
            <h3>Easy Event Management</h3>
            <p>Organizers get powerful tools to create, manage, and track events. From sign-ups to feedback, we've got you covered.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <Users :size="32" color="#10b981" />
            </div>
            <h3>Build Your Community</h3>
            <p>Connect with passionate volunteers, share experiences, and build lasting relationships while making a difference.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                <path d="M12 2v20M17 5H9.5M17 12h-5M17 19h-5"/>
              </svg>
            </div>
            <h3>Track Your Impact</h3>
            <p>See the difference you're making with hours logged, events attended, and the communities you've helped.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Events Preview -->
    <section class="featured-section">
      <h2 class="section-title">Upcoming Opportunities</h2>
      <p class="section-subtitle">Join these featured events and start making an impact today</p>
      
      <FeaturedEvents :events="displayedEvents" />
      
      <div class="cta-buttons">
        <button @click="loadMore" v-if="canLoadMore" class="btn-outline">Load More Events</button>
        <button @click="$router.push('/events')" class="btn-primary">Browse All Events</button>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials-section">
      <div class="container">
        <h2 class="section-title">Real Stories from Our Community</h2>
        <p class="section-subtitle">See how VolunteerHub is making a difference</p>
        
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-content">
              "I've found amazing opportunities to help in my community. The platform makes it so easy to find events that fit my schedule."
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">👤</div>
              <div class="author-info">
                <h4>Sarah Johnson</h4>
                <p>Volunteer, 50+ hours</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-content">
              "As a nonprofit organizer, VolunteerHub has transformed how we recruit volunteers. We've seen a 200% increase in sign-ups."
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">👤</div>
              <div class="author-info">
                <h4>Michael Chen</h4>
                <p>Community Organizer</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-content">
              "The impact tracking feature is incredible. I can actually see the difference I'm making in my community."
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">👤</div>
              <div class="author-info">
                <h4>Emily Rodriguez</h4>
                <p>Regular Volunteer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="section-title">About VolunteerHub</h2>
            <p>We're on a mission to make volunteering accessible, meaningful, and impactful for everyone. Whether you're an individual looking to give back or an organization seeking passionate volunteers, we provide the tools and community to make it happen.</p>
            
            <div class="stats-grid">
              <div class="stat-item">
                <h3>10,000+</h3>
                <p>Active Volunteers</p>
              </div>
              <div class="stat-item">
                <h3>500+</h3>
                <p>Events Monthly</p>
              </div>
              <div class="stat-item">
                <h3>50+</h3>
                <p>Partner Orgs</p>
              </div>
              <div class="stat-item">
                <h3>95%</h3>
                <p>Satisfaction Rate</p>
              </div>
            </div>
          </div>
          <div v-if="!authStore.isAuthenticated" class="about-cta">
            <h3>Ready to make a difference?</h3>
            <button @click="showSignup = true" class="btn-primary btn-large">Join VolunteerHub Today</button>
            <p class="small-text">Free for volunteers. Tools for organizers.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Security Badges -->
    <div class="security-badges">
      <div class="badge">
        <span>🔒 256-bit SSL Encryption</span>
      </div>
      <div class="badge">
        <span>✓ GDPR Compliant</span>
      </div>
      <div class="badge">
        <span>🛡️ Verified Organizations</span>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-col">
          <div class="logo">
            <Heart :size="24" color="#10b981" />
            <span>VolunteerHub</span>
          </div>
          <p>Connecting passionate volunteers with meaningful opportunities worldwide.</p>
          <div class="social-links">
            <a href="#" class="social-link">𝕏</a>
            <a href="#" class="social-link">in</a>
            <a href="#" class="social-link">f</a>
            <a href="#" class="social-link">ig</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Platform</h4>
          <router-link to="/events">Browse Events</router-link>
          <a href="#features" @click.prevent="scrollTo('features')">Features</a>
          <a href="#about" @click.prevent="scrollTo('about')">About Us</a>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
        <div v-if="!authStore.isAuthenticated" class="footer-col">
          <h4>Get Started</h4>
          <button @click="openSignup('volunteer')" class="footer-link-btn">Sign up as Volunteer</button>
          <button @click="openSignup('organizer')" class="footer-link-btn">Sign up as Organizer</button>
          <button @click="showLogin = true" class="footer-link-btn">Log in</button>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 VolunteerHub. All rights reserved. Made with ❤️ for volunteers worldwide.</p>
      </div>
    </footer>

    <!-- Modals -->
    <LoginModal v-if="showLogin" @close="showLogin = false" @switchToSignup="showLogin = false; showSignup = true" />
    <SignupModal v-if="showSignup" @close="showSignup = false" :defaultRole="signupRole" @switchToLogin="showSignup = false; showLogin = true" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEventsStore } from '../stores/events'
import { useAuthStore } from '../stores/auth'
import MinimalNavbar from '../components/common/MinimalNavbar.vue'
import Parallax3D from '../components/common/Parallax3D.vue'
import FeaturedEvents from '../components/common/FeaturedEvents.vue'
import LoginModal from '../components/common/LoginModal.vue'
import SignupModal from '../components/common/SignupModal.vue'
import { Search, Calendar, Users, Heart } from 'lucide-vue-next'
import heroVideo from '../assets/vovo.mp4'

const eventsStore = useEventsStore()
const authStore = useAuthStore()
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

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* Reset and Base */
.landing {
  background: linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%);
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, sans-serif;
  position: relative;
}

/* Hero Section */
.hero {
  position: relative;
  color: white;
  padding: 180px 60px 120px;
  text-align: center;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(16, 185, 129, 0.2) 100%);
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.3;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-content h1 {
  font-size: 56px;
  margin-bottom: 20px;
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.highlight {
  color: #10b981;
  display: block;
  font-size: 48px;
  text-shadow: 0 0 30px rgba(16, 185, 129, 0.6);
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.95;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
}

.btn-primary {
  padding: 16px 32px;
  background: #10b981;
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}

.btn-primary:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
}

.btn-secondary {
  padding: 16px 32px;
  background: transparent;
  border: 2px solid white;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: white;
  color: #1f2937;
  transform: translateY(-2px);
}

.btn-outline {
  padding: 14px 28px;
  background: transparent;
  border: 2px solid #10b981;
  border-radius: 12px;
  color: #10b981;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-outline:hover {
  background: #10b981;
  color: white;
}

.trust-badge {
  margin-top: 20px;
  font-size: 14px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Partners Section */
.partners-section {
  padding: 40px 60px;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  position: relative;
  z-index: 2;
}

.partners-title {
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
  margin-bottom: 30px;
}

.partner-logos {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.partner-logo {
  color: #d1d5db;
  font-weight: 600;
  font-size: 18px;
  opacity: 0.8;
  transition: all 0.3s;
}

.partner-logo:hover {
  color: #10b981;
  opacity: 1;
}

/* Features Section */
.features-section {
  padding: 100px 60px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-size: 42px;
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
}

.section-subtitle {
  text-align: center;
  color: #d1d5db;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto 60px;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.feature-card {
  padding: 40px 30px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 24px;
  text-align: left;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
  border-color: rgba(16, 185, 129, 0.5);
  background: rgba(16, 185, 129, 0.1);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
}

.feature-card h3 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #ffffff;
}

.feature-card p {
  color: #d1d5db;
  line-height: 1.7;
}

/* Featured Events Section */
.featured-section {
  padding: 80px 60px;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  position: relative;
  z-index: 2;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
}

/* Testimonials Section */
.testimonials-section {
  padding: 100px 60px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.testimonial-card {
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.testimonial-card:hover {
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 15px 40px rgba(16, 185, 129, 0.2);
}

.testimonial-content {
  font-size: 16px;
  line-height: 1.7;
  color: #d1d5db;
  margin-bottom: 20px;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

.author-info h4 {
  margin: 0 0 5px;
  color: #ffffff;
}

.author-info p {
  margin: 0;
  color: #9ca3af;
  font-size: 14px;
}

/* About Section */
.about-section {
  padding: 100px 60px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9));
  color: white;
  position: relative;
  z-index: 2;
  box-shadow: 0 -10px 50px rgba(16, 185, 129, 0.3);
}

.about-section .section-title {
  color: white;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-text p {
  font-size: 18px;
  line-height: 1.8;
  margin: 30px 0;
  opacity: 0.95;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.stat-item h3 {
  font-size: 42px;
  margin: 0 0 5px;
  color: white;
}

.stat-item p {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
}

.about-cta {
  background: rgba(255,255,255,0.15);
  padding: 50px;
  border-radius: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.about-cta h3 {
  font-size: 32px;
  margin-bottom: 30px;
}

.btn-large {
  padding: 20px 50px;
  font-size: 20px;
}

.small-text {
  margin-top: 20px;
  font-size: 14px;
  opacity: 0.8;
}

/* Security Badges */
.security-badges {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 30px 60px;
  background: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
  position: relative;
  z-index: 2;
}

.badge {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #d1d5db;
  font-size: 14px;
}

/* Footer */
.footer {
  background: #000000;
  color: white;
  padding: 60px 60px 20px;
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(16, 185, 129, 0.2);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
  max-width: 1400px;
  margin: 0 auto 40px;
}

.footer-content:has(.footer-col:nth-child(4):empty),
.footer-content:not(:has(.footer-col:nth-child(4))) {
  grid-template-columns: 2fr 1fr 1fr;
}

.footer-col .logo {
  margin-bottom: 20px;
}

.footer-col .logo span {
  color: white;
  font-size: 1.3rem;
}

.footer-col p {
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: 20px;
}

.footer-col h4 {
  color: white;
  margin-bottom: 20px;
  font-size: 18px;
}

.footer-col a {
  display: block;
  color: #9ca3af;
  margin-bottom: 12px;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-col a:hover {
  color: #10b981;
}

.footer-link-btn {
  background: transparent;
  border: none;
  color: #9ca3af;
  display: block;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  transition: color 0.3s;
}

.footer-link-btn:hover {
  color: #10b981;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: #374151;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white !important;
  font-size: 18px;
  transition: background 0.3s;
}

.social-link:hover {
  background: #10b981;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #374151;
  color: #9ca3af;
  max-width: 1400px;
  margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .about-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem 20px;
  }
  
  .nav-links {
    display: none;
  }
  
  .hero-content h1 {
    font-size: 40px;
  }
  
  .highlight {
    font-size: 32px;
  }
  
  .hero, .features-section, .testimonials-section {
    padding: 60px 20px;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .security-badges {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
}
</style>