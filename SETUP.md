# VolunteerHub Setup Guide

## Project Structure

```
src/
├── views/              # Page components
│   ├── Landing.vue
│   ├── VolunteerDashboard.vue
│   ├── OrganizerDashboard.vue
│   ├── Profile.vue
│   ├── Settings.vue
│   ├── Events.vue
│   ├── About.vue
│   ├── Contact.vue
│   ├── CreateEvent.vue
│   ├── ManageEvents.vue
│   ├── MessageVolunteers.vue
│   ├── Notifications.vue
│   └── HoursBadges.vue
├── components/
│   ├── common/         # Shared components
│   │   ├── Header.vue
│   │   ├── LoginModal.vue
│   │   ├── SignupModal.vue
│   │   └── FeaturedEvents.vue
│   ├── volunteer/      # Volunteer-specific
│   │   ├── DashboardStats.vue
│   │   ├── MyEvents.vue
│   │   └── BrowseEvents.vue
│   └── organizer/      # Organizer-specific
│       ├── DashboardStats.vue
│       └── MyEvents.vue
├── stores/             # Pinia stores
│   ├── auth.js
│   └── events.js
└── router/
    └── index.js
```

## Routes

- `/` - Landing page with login/signup
- `/about` - About page
- `/events` - Browse all events
- `/contact` - Contact form
- `/volunteer-dashboard` - Volunteer dashboard (auth required)
- `/organizer-dashboard` - Organizer dashboard (auth required)
- `/profile` - User profile (auth required)
- `/settings` - Account settings (auth required)
- `/notifications` - Notifications (volunteer only)
- `/hours-badges` - Hours & badges (volunteer only)
- `/create-event` - Create event (organizer only)
- `/manage-events` - Manage events (organizer only)
- `/message-volunteers` - Message volunteers (organizer only)

## State Management

### Auth Store (auth.js)
- `currentUser` - Current logged-in user
- `login(email, password)` - Login user
- `signup(userData)` - Register new user
- `logout()` - Logout user
- `updateProfile(data)` - Update user profile

### Events Store (events.js)
- `events` - All events
- `createEvent(eventData)` - Create new event
- `registerForEvent(eventId, userId)` - Register for event
- `unregisterFromEvent(eventId, userId)` - Unregister from event
- `deleteEvent(eventId)` - Delete event

## LocalStorage Keys

- `volunteerHubUser` - Current logged-in user
- `volunteerHubUsers` - All registered users
- `volunteerHubEvents` - All events

## Usage

1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:5173`
3. Click "Sign Up" to create an account (volunteer or organizer)
4. Login with your credentials
5. Access role-specific dashboard

## Testing

Create test accounts:
- Volunteer: signup with role "volunteer"
- Organizer: signup with role "organizer"

Mock events are pre-loaded in the events store.
