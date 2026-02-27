import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', name: 'Landing', component: () => import('../views/Landing.vue') },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') },
  { path: '/events', name: 'Events', component: () => import('../views/Events.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/Contact.vue') },
  { path: '/volunteer-dashboard', name: 'VolunteerDashboard', component: () => import('../views/VolunteerDashboard.vue'), meta: { requiresAuth: true, role: 'volunteer' } },
  { path: '/organizer-dashboard', name: 'OrganizerDashboard', component: () => import('../views/OrganizerDashboard.vue'), meta: { requiresAuth: true, role: 'organizer' } },
  { path: '/profile', name: 'Profile', component: () => import('../views/Profile.vue'), meta: { requiresAuth: true } },
  { path: '/settings', name: 'Settings', component: () => import('../views/Settings.vue'), meta: { requiresAuth: true } },
  { path: '/notifications', name: 'Notifications', component: () => import('../views/Notifications.vue'), meta: { requiresAuth: true, role: 'volunteer' } },
  { path: '/hours-badges', name: 'HoursBadges', component: () => import('../views/HoursBadges.vue'), meta: { requiresAuth: true, role: 'volunteer' } },
  { path: '/create-event', name: 'CreateEvent', component: () => import('../views/CreateEvent.vue'), meta: { requiresAuth: true, role: 'organizer' } },
  { path: '/manage-events', name: 'ManageEvents', component: () => import('../views/ManageEvents.vue'), meta: { requiresAuth: true, role: 'organizer' } },
  { path: '/message-volunteers', name: 'MessageVolunteers', component: () => import('../views/MessageVolunteers.vue'), meta: { requiresAuth: true, role: 'organizer' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.currentUser) {
    next('/')
  } else if (to.meta.role && authStore.currentUser?.role !== to.meta.role) {
    next('/')
  } else {
    next()
  }
})

export default router
