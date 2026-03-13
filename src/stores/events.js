import { defineStore } from 'pinia'

const categoryIcons = {
  'Environment': 'fas fa-leaf',
  'Education': 'fas fa-book',
  'Healthcare': 'fas fa-heartbeat',
  'Community': 'fas fa-heart',
  'Animals': 'fas fa-paw',
  'Disaster Relief': 'fas fa-hands-helping',
  'Elderly Care': 'fas fa-user-friends',
  'Youth Programs': 'fas fa-child'
}

const mockEvents = [
  { id: 1, title: 'Beach Cleanup Drive', category: 'Environment', date: 'Oct 15', time: '09:00', location: 'Santa Monica Beach', description: 'Join us for a community beach cleanup to protect marine life and keep our beaches beautiful.', organizerId: 1, volunteers: [], maxVolunteers: 30, icon: 'fas fa-leaf' },
  { id: 2, title: 'Food Bank Volunteer', category: 'Community', date: 'Sep 20', time: '10:00', location: 'Downtown Community Center', description: 'Help sort and distribute food to families in need in our community.', organizerId: 1, volunteers: [], maxVolunteers: 25, icon: 'fas fa-heart' },
  { id: 3, title: 'Reading Program for Kids', category: 'Education', date: 'Sep 25', time: '14:00', location: 'Central Library', description: 'Volunteer to read stories and help children develop their reading skills.', organizerId: 1, volunteers: [], maxVolunteers: 20, icon: 'fas fa-book' },
  { id: 4, title: 'Animal Shelter Support', category: 'Animals', date: 'Oct 5', time: '11:00', location: 'City Animal Shelter', description: 'Help care for animals and assist with shelter operations.', organizerId: 1, volunteers: [], maxVolunteers: 15, icon: 'fas fa-paw' },
  { id: 5, title: 'Tree Planting Initiative', category: 'Environment', date: 'Oct 12', time: '08:00', location: 'City Park', description: 'Join our tree planting campaign to create a greener community.', organizerId: 1, volunteers: [], maxVolunteers: 40, icon: 'fas fa-leaf' }
]
//manage event data
export const useEventsStore = defineStore('events', {
  state: () => {
    const stored = localStorage.getItem('volunteerHubEvents')
    let events = stored ? JSON.parse(stored) : mockEvents
    
    // Add icons to events that don't have them
    events = events.map(event => ({
      ...event,
      icon: event.icon || categoryIcons[event.category] || 'fas fa-calendar'
    }))
    
    return {
      events,
      categoryIcons
    }
  },
  getters: {
    getEventById: (state) => (id) => state.events.find(e => e.id === id)
  },
  actions: {
    createEvent(eventData) {
      const newEvent = { ...eventData, id: Date.now(), volunteers: [], icon: eventData.icon || categoryIcons[eventData.category] || 'fas fa-calendar' }
      this.events.push(newEvent)
      this.saveToStorage()
    },
    registerForEvent(eventId, userId) {
      const event = this.events.find(e => e.id === eventId)
      if (event && !event.volunteers.includes(userId) && event.volunteers.length < event.maxVolunteers) {
        event.volunteers.push(userId)
        this.saveToStorage()
        this.updateUserRegistration(userId, eventId, 'add')
      }
    },
    unregisterFromEvent(eventId, userId) {
      const event = this.events.find(e => e.id === eventId)
      if (event) {
        event.volunteers = event.volunteers.filter(v => v !== userId)
        this.saveToStorage()
        this.updateUserRegistration(userId, eventId, 'remove')
      }
    },
    deleteEvent(eventId) {
      this.events = this.events.filter(e => e.id !== eventId)
      this.saveToStorage()
    },
    saveToStorage() {
      localStorage.setItem('volunteerHubEvents', JSON.stringify(this.events))
    },
    updateUserRegistration(userId, eventId, action) {
      const users = JSON.parse(localStorage.getItem('volunteerHubUsers')) || []
      const user = users.find(u => u.id === userId)
      if (user) {
        if (!user.registeredEvents) user.registeredEvents = []
        if (action === 'add' && !user.registeredEvents.includes(eventId)) {
          user.registeredEvents.push(eventId)
        } else if (action === 'remove') {
          user.registeredEvents = user.registeredEvents.filter(e => e !== eventId)
        }
        localStorage.setItem('volunteerHubUsers', JSON.stringify(users))
      }
    }
  }
})
