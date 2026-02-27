import { defineStore } from 'pinia'

const mockEvents = [
  { id: 1, title: 'Beach Cleanup Drive', category: 'Environment', date: 'Oct 15', time: '09:00', location: 'Santa Monica Beach', description: 'Join us for a community beach cleanup to protect marine life and keep our beaches beautiful.', organizerId: 1, volunteers: [], maxVolunteers: 30, icon: '🌿' },
  { id: 2, title: 'Food Bank Volunteer', category: 'Community', date: 'Sep 20', time: '10:00', location: 'Downtown Community Center', description: 'Help sort and distribute food to families in need in our community.', organizerId: 1, volunteers: [], maxVolunteers: 25, icon: '❤️' },
  { id: 3, title: 'Reading Program for Kids', category: 'Education', date: 'Sep 25', time: '14:00', location: 'Central Library', description: 'Volunteer to read stories and help children develop their reading skills.', organizerId: 1, volunteers: [], maxVolunteers: 20, status: 'Completed', icon: '📚' }
]

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: JSON.parse(localStorage.getItem('volunteerHubEvents')) || mockEvents
  }),
  actions: {
    createEvent(eventData) {
      const newEvent = { ...eventData, id: Date.now(), volunteers: [] }
      this.events.push(newEvent)
      localStorage.setItem('volunteerHubEvents', JSON.stringify(this.events))
    },
    registerForEvent(eventId, userId) {
      const event = this.events.find(e => e.id === eventId)
      if (event && !event.volunteers.includes(userId)) {
        event.volunteers.push(userId)
        localStorage.setItem('volunteerHubEvents', JSON.stringify(this.events))
        const users = JSON.parse(localStorage.getItem('volunteerHubUsers')) || []
        const user = users.find(u => u.id === userId)
        if (user && !user.registeredEvents) user.registeredEvents = []
        if (user && !user.registeredEvents.includes(eventId)) {
          user.registeredEvents.push(eventId)
          localStorage.setItem('volunteerHubUsers', JSON.stringify(users))
        }
      }
    },
    unregisterFromEvent(eventId, userId) {
      const event = this.events.find(e => e.id === eventId)
      if (event) {
        event.volunteers = event.volunteers.filter(v => v !== userId)
        localStorage.setItem('volunteerHubEvents', JSON.stringify(this.events))
        const users = JSON.parse(localStorage.getItem('volunteerHubUsers')) || []
        const user = users.find(u => u.id === userId)
        if (user && user.registeredEvents) {
          user.registeredEvents = user.registeredEvents.filter(e => e !== eventId)
          localStorage.setItem('volunteerHubUsers', JSON.stringify(users))
        }
      }
    },
    deleteEvent(eventId) {
      this.events = this.events.filter(e => e.id !== eventId)
      localStorage.setItem('volunteerHubEvents', JSON.stringify(this.events))
    }
  }
})
