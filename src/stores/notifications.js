import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => {
    const stored = localStorage.getItem('volunteerHubNotifications')
    return {
      notifications: stored ? JSON.parse(stored) : []
    }
  },
  
  getters: {
    // Get notifications for a specific user
    getUserNotifications: (state) => (userId) => {
      return state.notifications
        .filter(n => n.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
    
    // Get unread count for a user
    getUnreadCount: (state) => (userId) => {
      return state.notifications.filter(n => n.userId === userId && !n.read).length
    }
  },
  
  actions: {
    // Add a new notification
    addNotification(notification) {
      const newNotification = {
        id: Date.now(),
        read: false,
        createdAt: new Date().toISOString(),
        ...notification
      }
      this.notifications.push(newNotification)
      this.saveToStorage()
    },
    
    // Send message to volunteers of a specific event
    sendMessageToVolunteers(eventId, message, organizerName, eventTitle) {
      const users = JSON.parse(localStorage.getItem('volunteerHubUsers')) || []
      const event = JSON.parse(localStorage.getItem('volunteerHubEvents'))
        ?.find(e => e.id === eventId)
      
      if (!event) return
      
      // Send notification to each volunteer registered for the event
      event.volunteers.forEach(volunteerId => {
        const volunteer = users.find(u => u.id === volunteerId)
        if (volunteer) {
          this.addNotification({
            userId: volunteerId,
            type: 'message',
            title: `Message from ${organizerName}`,
            message: message,
            eventId: eventId,
            eventTitle: eventTitle,
            from: organizerName
          })
        }
      })
    },
    
    // Notify volunteers when a new event is created
    notifyNewEvent(eventId, eventTitle, eventDate, eventCategory) {
      const users = JSON.parse(localStorage.getItem('volunteerHubUsers')) || []
      
      // Notify all volunteers about the new event
      users.forEach(user => {
        if (user.role === 'volunteer') {
          this.addNotification({
            userId: user.id,
            type: 'new_event',
            title: 'New Event Available',
            message: `${eventTitle} - ${eventDate}`,
            eventId: eventId,
            eventTitle: eventTitle,
            eventCategory: eventCategory,
            clickable: true
          })
        }
      })
    },
    
    // Mark notification as read
    markAsRead(notificationId) {
      const notification = this.notifications.find(n => n.id === notificationId)
      if (notification) {
        notification.read = true
        this.saveToStorage()
      }
    },
    
    // Mark all notifications as read for a user
    markAllAsRead(userId) {
      this.notifications
        .filter(n => n.userId === userId)
        .forEach(n => n.read = true)
      this.saveToStorage()
    },
    
    // Delete a notification
    deleteNotification(notificationId) {
      this.notifications = this.notifications.filter(n => n.id !== notificationId)
      this.saveToStorage()
    },
    
    // Clear all notifications for a user
    clearAllNotifications(userId) {
      this.notifications = this.notifications.filter(n => n.userId !== userId)
      this.saveToStorage()
    },
    
    // Save to localStorage
    saveToStorage() {
      localStorage.setItem('volunteerHubNotifications', JSON.stringify(this.notifications))
    }
  }
})
