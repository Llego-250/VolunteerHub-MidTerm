# Component Structure Diagram

## Component Hierarchy

```
App.vue (Root)
│
├─── Router View
│    │
│    ├─── Landing.vue (/)
│    │    │
│    │    ├─── MinimalNavbar
│    │    │    └─── ThemeToggle
│    │    │
│    │    ├─── Parallax3D
│    │    │
│    │    ├─── FeaturedEvents
│    │    │    └─── EventCard (multiple)
│    │    │
│    │    ├─── LoginModal (conditional)
│    │    │
│    │    └─── SignupModal (conditional)
│    │
│    ├─── VolunteerDashboard.vue (/volunteer-dashboard)
│    │    │
│    │    ├─── DashboardNavbar
│    │    │    ├─── Search Input
│    │    │    ├─── ThemeToggle
│    │    │    └─── Profile Menu
│    │    │
│    │    ├─── DashboardSidebar (role="volunteer")
│    │    │    └─── Navigation Items
│    │    │
│    │    ├─── CalendarSidebar (conditional)
│    │    │    └─── Event List
│    │    │
│    │    └─── Main Content (tab-based)
│    │         │
│    │         ├─── Browse Tab (default)
│    │         │    │
│    │         │    ├─── Featured Spotlight
│    │         │    │    └─── Featured Event Display
│    │         │    │
│    │         │    ├─── Events Grid
│    │         │    │    └─── EventCard (multiple)
│    │         │    │
│    │         │    ├─── Discovery CTA
│    │         │    │
│    │         │    └─── Groups Sidebar
│    │         │         └─── GroupCard (multiple)
│    │         │
│    │         ├─── Registered Tab
│    │         │    └─── MyEvents (volunteer)
│    │         │
│    │         ├─── Hours Tab
│    │         │    └─── HoursBadgesTracker
│    │         │
│    │         ├─── Notifications Tab
│    │         │    └─── NotificationsPanel
│    │         │
│    │         └─── Profile Tab
│    │              └─── ProfileSettings
│    │
│    ├─── OrganizerDashboard.vue (/organizer-dashboard)
│    │    │
│    │    ├─── DashboardNavbar
│    │    │    ├─── Search Input
│    │    │    ├─── ThemeToggle
│    │    │    └─── Profile Menu
│    │    │
│    │    ├─── DashboardSidebar (role="organizer")
│    │    │    └─── Navigation Items
│    │    │
│    │    ├─── CalendarSidebar (conditional)
│    │    │    └─── Event List
│    │    │
│    │    └─── Main Content (tab-based)
│    │         │
│    │         ├─── Overview Tab (default)
│    │         │    │
│    │         │    ├─── Dashboard Stats
│    │         │    │    ├─── Total Events Card
│    │         │    │    ├─── Total Volunteers Card
│    │         │    │    └─── Active Events Card
│    │         │    │
│    │         │    └─── MyEvents (organizer)
│    │         │
│    │         ├─── Create Tab
│    │         │    └─── CreateEventForm
│    │         │
│    │         ├─── Manage Tab
│    │         │    └─── ManageEventsPanel
│    │         │
│    │         ├─── Message Tab
│    │         │    └─── MessageVolunteersPanel
│    │         │
│    │         ├─── Profile Tab
│    │         │    └─── ProfileSettings
│    │         │
│    │         ├─── Settings Tab
│    │         │    └─── SettingsPanel
│    │         │
│    │         └─── Notifications Tab
│    │              └─── NotificationsPanel
│    │
│    ├─── Events.vue (/events)
│    │    │
│    │    ├─── Header
│    │    │
│    │    └─── EventCard (multiple)
│    │
│    └─── Groups.vue (/groups)
│         │
│         ├─── DashboardNavbar
│         │
│         ├─── DashboardSidebar
│         │
│         └─── GroupCard (multiple)
```

## Component Dependency Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                         VIEWS LAYER                              │
│  (Page-level components)                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Landing.vue          VolunteerDashboard.vue    OrganizerDashboard.vue
│       │                      │                          │         │
│       │                      │                          │         │
│       └──────────────────────┴──────────────────────────┘         │
│                              │                                    │
│                              ↓                                    │
├─────────────────────────────────────────────────────────────────┤
│                      COMMON COMPONENTS                           │
│  (Shared across views)                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ DashboardNav │  │   EventCard  │  │  GroupCard   │          │
│  │    bar       │  │              │  │              │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                   │
│         │                  │                  │                   │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐          │
│  │ Dashboard    │  │  Calendar    │  │  Featured    │          │
│  │   Sidebar    │  │   Sidebar    │  │   Events     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ LoginModal   │  │ SignupModal  │  │ ThemeToggle  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Profile    │  │ Notifications│  │   Settings   │          │
│  │   Settings   │  │    Panel     │  │    Panel     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                   ROLE-SPECIFIC COMPONENTS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  VOLUNTEER                      ORGANIZER                        │
│  ┌──────────────┐              ┌──────────────┐                │
│  │  MyEvents    │              │  MyEvents    │                │
│  │ (Volunteer)  │              │ (Organizer)  │                │
│  └──────────────┘              └──────────────┘                │
│                                                                   │
│  ┌──────────────┐              ┌──────────────┐                │
│  │ BrowseEvents │              │ CreateEvent  │                │
│  │              │              │    Form      │                │
│  └──────────────┘              └──────────────┘                │
│                                                                   │
│  ┌──────────────┐              ┌──────────────┐                │
│  │ HoursBadges  │              │ ManageEvents │                │
│  │   Tracker    │              │    Panel     │                │
│  └──────────────┘              └──────────────┘                │
│                                                                   │
│  ┌──────────────┐              ┌──────────────┐                │
│  │ Recommended  │              │   Message    │                │
│  │   Events     │              │  Volunteers  │                │
│  └──────────────┘              └──────────────┘                │
│                                                                   │
│  ┌──────────────┐              ┌──────────────┐                │
│  │ Dashboard    │              │ Dashboard    │                │
│  │    Stats     │              │    Stats     │                │
│  └──────────────┘              └──────────────┘                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Communication Patterns

### 1. Props Down, Events Up

```
Parent Component
    │
    ├─── :prop="value" ──→ Child Component
    │
    ←─── @event="handler" ─┘
```

**Example:**
```vue
<!-- Parent: VolunteerDashboard.vue -->
<EventCard
  :title="event.title"
  :category="event.category"
  :date="event.date"
  @action="register(event.id)"
/>

<!-- Child: EventCard.vue -->
<script setup>
const props = defineProps(['title', 'category', 'date'])
const emit = defineEmits(['action'])
</script>
```

### 2. Store-Based Communication

```
Component A ──→ Pinia Store ──→ Component B
    │              │              │
    │              ↓              │
    └──────── Reactive ──────────┘
              Updates
```

**Example:**
```javascript
// Component A: CreateEventForm.vue
eventsStore.createEvent(eventData)

// Component B: MyEvents.vue
const myEvents = computed(() => 
  eventsStore.events.filter(e => e.organizerId === authStore.currentUser?.id)
)
```

### 3. Router-Based Navigation

```
Component ──→ Router.push() ──→ Route Change ──→ New Component
```

**Example:**
```javascript
// LoginModal.vue
router.push('/volunteer-dashboard')

// Router guards check auth
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.currentUser) {
    next('/')
  }
})
```

## Component Props & Emits Reference

### EventCard.vue
**Props:**
- `icon`: String - Icon name
- `price`: String - Event price
- `category`: String - Event category
- `categoryColor`: String - Category color
- `iconGradient`: String - Icon gradient
- `title`: String - Event title
- `description`: String - Event description
- `date`: String - Event date
- `location`: String - Event location
- `attendeeCount`: Number - Current attendees
- `maxAttendees`: Number - Maximum attendees
- `showAttendees`: Boolean - Show attendee count
- `buttonText`: String - Button label
- `buttonVariant`: String - Button style
- `isDisabled`: Boolean - Button disabled state
- `animationDelay`: String - Animation delay

**Emits:**
- `action` - Triggered when button clicked

### GroupCard.vue
**Props:**
- `icon`: String - Icon name
- `emoji`: String - Group emoji
- `iconColor`: String - Icon color
- `title`: String - Group name
- `description`: String - Group description
- `memberCount`: Number - Member count
- `eventCount`: Number - Event count
- `category`: String - Group category
- `buttonText`: String - Button label
- `buttonVariant`: String - Button style
- `animationDelay`: String - Animation delay

**Emits:**
- `action` - Triggered when button clicked

### DashboardSidebar.vue
**Props:**
- `role`: String (required) - User role
- `activeTab`: String - Current active tab

**Emits:**
- `navigate` - Triggered when navigation item clicked

### DashboardNavbar.vue
**Props:**
- None (uses stores directly)

**Emits:**
- `search` - Triggered when search query changes

### LoginModal.vue
**Props:**
- None

**Emits:**
- `close` - Close modal
- `switchToSignup` - Switch to signup modal

### SignupModal.vue
**Props:**
- `defaultRole`: String - Pre-selected role

**Emits:**
- `close` - Close modal
- `switchToLogin` - Switch to login modal

### CalendarSidebar.vue
**Props:**
- `isOpen`: Boolean - Sidebar open state
- `events`: Array - Events to display

**Emits:**
- `close` - Close sidebar

## Component Reusability Matrix

| Component | Used In | Reusability | Customization |
|-----------|---------|-------------|---------------|
| EventCard | Landing, VolunteerDashboard, Events | HIGH | 18 props |
| GroupCard | VolunteerDashboard, Groups | HIGH | 11 props |
| DashboardNavbar | Both Dashboards | HIGH | Role-agnostic |
| DashboardSidebar | Both Dashboards | HIGH | Role-based |
| LoginModal | Landing, Any page | HIGH | Standalone |
| SignupModal | Landing, Any page | HIGH | Role selection |
| ThemeToggle | All pages | HIGH | Standalone |
| ProfileSettings | Both Dashboards | HIGH | User-agnostic |
| NotificationsPanel | Both Dashboards | HIGH | User-agnostic |
| CalendarSidebar | Both Dashboards | HIGH | Event-based |
| MyEvents (Volunteer) | VolunteerDashboard | MEDIUM | Volunteer-specific |
| MyEvents (Organizer) | OrganizerDashboard | MEDIUM | Organizer-specific |
| CreateEventForm | OrganizerDashboard | LOW | Organizer-only |
| ManageEventsPanel | OrganizerDashboard | LOW | Organizer-only |
| HoursBadgesTracker | VolunteerDashboard | LOW | Volunteer-only |

## Component State Management

### Local State (ref/reactive)
- Form inputs
- UI toggles (modals, sidebars)
- Temporary data
- Animation states

### Store State (Pinia)
- User authentication
- Event data
- Theme preferences
- Persistent data

### Computed State
- Filtered lists
- Derived values
- Formatted data
- Conditional displays

## Component Lifecycle

```
Component Creation
    ↓
Setup (Composition API)
    ↓
Template Compilation
    ↓
Mounted (onMounted)
    ↓
Reactive Updates
    ↓
Unmounted (onUnmounted)
```

**Common Lifecycle Hooks Used:**
- `onMounted()` - Initialize data, load from localStorage
- `watch()` - React to prop/state changes
- `computed()` - Derive values from state
- `onUnmounted()` - Cleanup (event listeners, timers)
