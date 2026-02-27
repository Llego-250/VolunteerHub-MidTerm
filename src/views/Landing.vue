<template>
  <div class="landing">
    <header>
      <h1>VolunteerHub</h1>
      <button @click="showLogin = true">Login</button>
      <button @click="showSignup = true">Sign Up</button>
    </header>
    <section class="hero">
      <h2>Make a Difference in Your Community</h2>
      <p>Connect with meaningful volunteer opportunities</p>
    </section>
    <FeaturedEvents />
    <LoginModal v-if="showLogin" @close="showLogin = false" />
    <SignupModal v-if="showSignup" @close="showSignup = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeaturedEvents from '../components/common/FeaturedEvents.vue'
import LoginModal from '../components/common/LoginModal.vue'
import SignupModal from '../components/common/SignupModal.vue'

const showLogin = ref(false)
const showSignup = ref(false)
</script>

<style scoped>
.landing { padding: 20px; }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
.hero { text-align: center; margin: 60px 0; }
button { padding: 10px 20px; margin-left: 10px; cursor: pointer; }
</style>
