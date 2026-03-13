# Threat Model Diagram

## Data Flow Diagram (DFD) with Trust Boundaries

```
┌─────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL ACTORS                              │
│                      (Untrusted Zone)                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐│
│  │  Volunteer   │         │  Organizer   │         │   Attacker   ││
│  │    User      │         │    User      │         │  (Malicious) ││
│  └──────┬───────┘         └──────┬───────┘         └──────┬───────┘│
│         │                        │                        │         │
│         │ [1] Login/Signup       │ [1] Login/Signup       │ [T1]    │
│         │ [2] Browse Events      │ [2] Create Events      │ XSS     │
│         │ [3] Register           │ [3] Manage Events      │ [T2]    │
│         │                        │                        │ Session │
│         │                        │                        │ Hijack  │
└─────────┼────────────────────────┼────────────────────────┼─────────┘
          │                        │                        │
          │                        │                        │
┌─────────┼────────────────────────┼────────────────────────┼─────────┐
│         │    TRUST BOUNDARY 1: Browser Security          │         │
├─────────┼────────────────────────┼────────────────────────┼─────────┤
│         ↓                        ↓                        ↓         │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    VUE APPLICATION                            │  │
│  │                  (Client-Side Code)                           │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │                                                               │  │
│  │  [A] Authentication Module                                   │  │
│  │      • LoginModal.vue                                        │  │
│  │      • SignupModal.vue                                       │  │
│  │      • Auth Store                                            │  │
│  │      Threats: [T1] XSS, [T3] Credential Theft               │  │
│  │      Mitigations: Input validation, Vue escaping             │  │
│  │                                                               │  │
│  │  [B] Event Management Module                                 │  │
│  │      • CreateEventForm.vue                                   │  │
│  │      • ManageEventsPanel.vue                                 │  │
│  │      • Events Store                                          │  │
│  │      Threats: [T1] XSS, [T4] Unauthorized Access             │  │
│  │      Mitigations: Role guards, Input sanitization            │  │
│  │                                                               │  │
│  │  [C] User Dashboard Module                                   │  │
│  │      • VolunteerDashboard.vue                                │  │
│  │      • OrganizerDashboard.vue                                │  │
│  │      Threats: [T4] Privilege Escalation                      │  │
│  │      Mitigations: Route guards, Role validation              │  │
│  │                                                               │  │
│  │  [D] Router Module                                           │  │
│  │      • Route Guards                                          │  │
│  │      • Auth Checks                                           │  │
│  │      Threats: [T4] Unauthorized Route Access                 │  │
│  │      Mitigations: beforeEach guards, Role checks             │  │
│  │                                                               │  │
│  └───────────────────────┬──────────────────────────────────────┘  │
│                          │                                          │
│                          │ [4] Read/Write Data                      │
│                          ↓                                          │
├─────────────────────────────────────────────────────────────────────┤
│         TRUST BOUNDARY 2: Browser Storage                           │
├─────────────────────────────────────────────────────────────────────┤
│                          │                                          │
│  ┌───────────────────────┴──────────────────────────────────────┐  │
│  │                  LOCALSTORAGE                                 │  │
│  │              (Persistent Storage)                             │  │
│  ├───────────────────────────────────────────────────────────────┤  │
│  │                                                               │  │
│  │  [E] User Data                                                │  │
│  │      • volunteerHubUser (current session)                    │  │
│  │      • volunteerHubUsers (all users)                         │  │
│  │      Threats: [T3] Credential Theft, [T5] Data Tampering     │  │
│  │      Mitigations: Password excluded from session             │  │
│  │                                                               │  │
│  │  [F] Event Data                                               │  │
│  │      • volunteerHubEvents                                    │  │
│  │      Threats: [T5] Data Tampering, [T6] Data Deletion        │  │
│  │      Mitigations: Validation on read, Store actions          │  │
│  │                                                               │  │
│  │  [G] Preferences                                              │  │
│  │      • volunteerHubTheme                                     │  │
│  │      Threats: [T5] Minor tampering (low impact)              │  │
│  │      Mitigations: Validation on load                         │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## Threat Catalog

### [T1] Cross-Site Scripting (XSS)
- **Severity:** HIGH
- **Attack Vector:** Malicious script injection via user input
- **Target:** Event titles, descriptions, user profiles
- **Impact:** Session hijacking, data theft, malicious actions
- **Mitigation:** 
  - Vue automatic HTML escaping
  - No v-html with user content
  - Input validation
  - Content Security Policy (recommended)

### [T2] Session Hijacking
- **Severity:** MEDIUM
- **Attack Vector:** Stealing session data from localStorage
- **Target:** volunteerHubUser key
- **Impact:** Account takeover, unauthorized actions
- **Mitigation:**
  - Password excluded from session
  - HTTPS in production (recommended)
  - Session timeout (recommended)

### [T3] Credential Theft
- **Severity:** HIGH
- **Attack Vector:** Physical access to device, malware
- **Target:** volunteerHubUsers in localStorage
- **Impact:** Account compromise, identity theft
- **Mitigation:**
  - Password hashing (recommended for production)
  - Secure storage alternatives (recommended)
  - User education

### [T4] Unauthorized Access / Privilege Escalation
- **Severity:** MEDIUM
- **Attack Vector:** Direct URL manipulation, role tampering
- **Target:** Protected routes, role-specific features
- **Impact:** Access to unauthorized dashboards/features
- **Mitigation:**
  - Route guards with auth checks
  - Role validation in beforeEach
  - Component-level role checks
  - Store-level permission validation

### [T5] Data Tampering
- **Severity:** MEDIUM
- **Attack Vector:** Direct localStorage manipulation via DevTools
- **Target:** Event data, user registrations
- **Impact:** Data corruption, false registrations
- **Mitigation:**
  - Validation on data read
  - Store action validation
  - Backend validation (recommended for production)

### [T6] Data Deletion
- **Severity:** LOW
- **Attack Vector:** localStorage.clear() via DevTools
- **Target:** All application data
- **Impact:** Data loss, service disruption
- **Mitigation:**
  - User education
  - Backend persistence (recommended for production)
  - Export/backup features (recommended)

### [T7] Denial of Service (DoS)
- **Severity:** LOW
- **Attack Vector:** Resource exhaustion, infinite loops
- **Target:** Application performance
- **Impact:** Application slowdown/crash
- **Mitigation:**
  - Input validation
  - Rate limiting (recommended)
  - Pagination
  - Efficient algorithms

### [T8] Broken Authentication
- **Severity:** MEDIUM
- **Attack Vector:** Weak passwords, brute force
- **Target:** User accounts
- **Impact:** Account compromise
- **Mitigation:**
  - Password requirements (recommended)
  - Rate limiting (recommended)
  - Account lockout (recommended)
  - 2FA (recommended for production)

## Attack Tree

```
                    [Compromise VolunteerHub]
                            |
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   [Steal Data]      [Gain Unauthorized]   [Disrupt Service]
        │                 Access               │
        │                   │                   │
    ┌───┴───┐          ┌────┴────┐         ┌───┴───┐
    │       │          │         │         │       │
  [XSS]  [Physical]  [Bypass]  [Escalate] [DoS]  [Delete]
         [Access]    [Auth]    [Privilege]        [Data]
    │       │          │         │         │       │
    │       │          │         │         │       │
  Inject  Access    Brute    Manipulate  Exhaust Clear
  Script  Device    Force    Role Data   Resources Storage
```

## Security Controls Matrix

| Threat | Preventive | Detective | Corrective |
|--------|-----------|-----------|------------|
| XSS | Vue escaping, Input validation | Code review | Sanitize data |
| Session Hijack | HTTPS, Secure storage | Session monitoring | Force logout |
| Credential Theft | Password hashing | Login alerts | Password reset |
| Unauthorized Access | Route guards, Role checks | Access logs | Revoke access |
| Data Tampering | Validation, Checksums | Integrity checks | Restore backup |
| DoS | Rate limiting, Validation | Performance monitoring | Throttle requests |

## Risk Assessment

| Threat | Likelihood | Impact | Risk Level | Priority |
|--------|-----------|--------|------------|----------|
| XSS | Medium | High | HIGH | P1 |
| Credential Theft | Medium | High | HIGH | P1 |
| Unauthorized Access | Low | Medium | MEDIUM | P2 |
| Session Hijack | Low | Medium | MEDIUM | P2 |
| Data Tampering | Medium | Low | MEDIUM | P3 |
| DoS | Low | Low | LOW | P4 |
| Data Deletion | Low | Low | LOW | P4 |

## Recommendations for Production

1. **Implement Backend API**
   - Move authentication to server-side
   - Secure password hashing (bcrypt)
   - JWT tokens for session management
   - Server-side validation

2. **Add Security Headers**
   - Content-Security-Policy
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

3. **Implement Rate Limiting**
   - Login attempt limiting
   - API request throttling
   - CAPTCHA for suspicious activity

4. **Add Monitoring & Logging**
   - Security event logging
   - Failed login tracking
   - Anomaly detection
   - Audit trails

5. **Enhance Authentication**
   - Password complexity requirements
   - Two-factor authentication
   - Session timeout
   - Account lockout policy
