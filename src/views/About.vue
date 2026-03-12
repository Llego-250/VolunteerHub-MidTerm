<template>
  <div class="about">
    <MinimalNavbar @showLogin="showLogin = true" @showSignup="showSignup = true" />
    
    <section class="hero">
      <video autoplay loop muted playsinline class="hero-video">
        <source :src="heroVideo" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>About VolunteerHub</h1>
        <p>Empowering communities through meaningful volunteer connections</p>
      </div>
    </section>

    <section class="mission-vision">
      <div class="container">
        <div class="content-wrapper">
          <div class="left-column">
            <div class="mission">
              <h2>Our Mission</h2>
              <p>VolunteerHub bridges the gap between passionate volunteers and organizations creating positive change. We believe that everyone has the power to make a difference, and our platform makes it easier than ever to find and participate in meaningful volunteer opportunities.</p>
            </div>
            <div class="vision">
              <h2>Our Vision</h2>
              <p>To create a world where volunteering is accessible, impactful, and rewarding for everyone. We envision communities where individuals can easily discover causes they care about and organizations can efficiently connect with dedicated volunteers.</p>
            </div>
            <div class="stats">
              <div class="stat">
                <h3>10,000+</h3>
                <p>Active Volunteers</p>
              </div>
              <div class="stat">
                <h3>500+</h3>
                <p>Events Organized</p>
              </div>
              <div class="stat">
                <h3>50+</h3>
                <p>Partner Organizations</p>
              </div>
              <div class="stat">
                <h3>25+</h3>
                <p>Cities Served</p>
              </div>
            </div>
          </div>
          <div class="right-column">
            <h2>What We Offer</h2>
            <div class="features">
              <div class="feature">
                <Search :size="40" color="#10b981" />
                <div>
                  <h3>Easy Discovery</h3>
                  <p>Find volunteer opportunities that match your interests, skills, and schedule with our advanced search and filtering system.</p>
                </div>
              </div>
              <div class="feature">
                <Calendar :size="40" color="#10b981" />
                <div>
                  <h3>Event Management</h3>
                  <p>Comprehensive tools for organizers to create, manage, and coordinate volunteer events with ease.</p>
                </div>
              </div>
              <div class="feature">
                <Users :size="40" color="#10b981" />
                <div>
                  <h3>Community Building</h3>
                  <p>Connect with like-minded volunteers and build lasting relationships while making a positive impact.</p>
                </div>
              </div>
              <div class="feature">
                <TrendingUp :size="40" color="#10b981" />
                <div>
                  <h3>Impact Tracking</h3>
                  <p>Monitor your volunteer journey and see the real difference you're making in your community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Ready to Make a Difference?</h2>
        <p>Join thousands of volunteers and organizations making positive impact</p>
        <div class="cta-buttons">
          <button @click="openSignup('volunteer')" class="btn-large">Start Volunteering</button>
          <button @click="openSignup('organizer')" class="btn-outline-large">Organize Events</button>
        </div>
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
          <router-link to="/about">About Us</router-link>
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
import { ref } from 'vue'
import MinimalNavbar from '../components/common/MinimalNavbar.vue'
import LoginModal from '../components/common/LoginModal.vue'
import SignupModal from '../components/common/SignupModal.vue'
import { Search, Calendar, Users, TrendingUp, Heart } from 'lucide-vue-next'
import heroVideo from '../assets/vovo.mp4'

const showLogin = ref(false)
const showSignup = ref(false)
const signupRole = ref('')

const openSignup = (role) => {
  signupRole.value = role
  showSignup.value = true
}
</script>

<style scoped>
.about { background: var(--light-gray); }
.hero { position: relative; color: white; padding: 150px 60px 100px; text-align: center; min-height: 400px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.hero-video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
.hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 1; }
.hero-content { position: relative; z-index: 2; }
.hero-content h1 { font-size: 48px; margin-bottom: 20px; font-weight: 700; }
.hero-content p { font-size: 20px; max-width: 700px; margin: 0 auto; }
.mission-vision { background: white; padding: 80px 60px; }
.container { max-width: 1400px; margin: 0 auto; }
.content-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
.left-column, .right-column { display: flex; flex-direction: column; gap: 40px; }
.mission h2, .vision h2 { font-size: 32px; margin-bottom: 20px; color: var(--dark); }
.right-column h2 { font-size: 32px; margin-bottom: 30px; color: var(--dark); }
.mission p, .vision p { color: var(--gray); font-size: 16px; line-height: 1.8; }
.stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-top: 20px; }
.stat h3 { font-size: 36px; color: var(--primary); margin-bottom: 5px; font-weight: 700; }
.stat p { color: var(--gray); font-size: 14px; }
.features { display: flex; flex-direction: column; gap: 30px; }
.feature { display: flex; gap: 20px; align-items: flex-start; }
.feature h3 { margin: 0 0 10px; font-size: 20px; color: var(--dark); }
.feature p { color: var(--gray); line-height: 1.6; font-size: 15px; margin: 0; }
.cta-section { background: var(--primary); padding: 80px 60px; text-align: center; color: white; }
.cta-section h2 { font-size: 36px; margin-bottom: 15px; }
.cta-section p { font-size: 18px; margin-bottom: 30px; }
.cta-buttons { display: flex; gap: 20px; justify-content: center; }
.btn-large { padding: 15px 40px; font-size: 16px; background: white; color: rgb(58, 151, 86); }
.btn-outline-large { padding: 15px 40px; font-size: 16px; background: transparent; border: 2px solid white; color: rgb(255, 255, 255); }
.btn-outline-large:hover { background: rgb(255, 255, 255); color: green; }
.footer { background: #1f2937; color: white; padding: 60px 60px 20px; }
.footer-content { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; margin-bottom: 40px; max-width: 1200px; margin: 0 auto 40px; }
.footer-col h3, .footer-col h4 { margin-bottom: 20px; color: var(--primary); display: flex; align-items: center; gap: 8px; }
.footer-col a { display: block; color: #9ca3af; margin-bottom: 10px; cursor: pointer; }
.footer-bottom { text-align: center; padding-top: 20px; border-top: 1px solid #374151; color: #9ca3af; }

@media (max-width: 768px) {
  .content-wrapper { grid-template-columns: 1fr; gap: 40px; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .footer-content { grid-template-columns: 1fr; }
}
</style>
