import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', name: 'Landing', component: () => import('../views/Landing.vue') },
  { path: '/events', name: 'Events', component: () => import('../views/Events.vue') },
  { path: '/groups', name: 'Groups', component: () => import('../views/Groups.vue'), meta: { requiresAuth: true } },
  { path: '/volunteer-dashboard', name: 'VolunteerDashboard', component: () => import('../views/VolunteerDashboard.vue'), meta: { requiresAuth: true, role: 'volunteer' } },
  { path: '/organizer-dashboard', name: 'OrganizerDashboard', component: () => import('../views/OrganizerDashboard.vue'), meta: { requiresAuth: true, role: 'organizer' } }
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
