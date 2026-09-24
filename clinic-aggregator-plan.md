# Multi-Clinic Healthcare Aggregator — Product Planning Document

## 1. Product vision

Build a trustworthy healthcare discovery and booking platform for Indian patients that connects them with verified clinics, doctors, and appointment slots in a single city before expanding further.

The product should solve three core problems:

- Patients find the right clinic quickly and confidently
- Clinics get higher-quality, higher-intent bookings
- The platform builds trust through verified data, fair ranking, and clear reviews

The core differentiator is not only a directory or map, but a recommendation engine that ranks clinics based on real trust signals, review quality, availability, distance, and patient fit.

---

## 2. Launch market and positioning

### Recommended launch strategy

- Launch in one city first
- Focus on a few high-demand specialties
- Keep the initial platform small, trust-led, and incredibly usable
- Expand after proving booking volume, retention, and clinic satisfaction

### Best launch city strategy

Pick one metro or large tier-1 city with:

- High density of clinics and patient demand
- Strong mobile usage
- Enough local competition to make comparison useful
- Real need for trusted healthcare discovery

Examples of good target segments:

- General physician / family clinics
- Dental clinics
- Dermatology
- Pediatrics
- Gynecology
- Orthopedics

### Differentiation

The product should be positioned as:

- More trustworthy than a generic directory
- More transparent than a review site
- More useful than “nearest clinic” listings
- More practical than a pure map-based search

The message should be simple:

> Find clinics that are verified, relevant, available, and trusted by real patients.

---

## 3. What the platform should include

### 3.1 Patient-facing app and website

The patient side should support:

- Search by specialty, city area, clinic type, price, distance
- Filter by insurance or out-of-pocket preference
- Search by doctor name, clinic, or specialty
- Sort by relevance, rating, distance, availability, or price
- Clinic profile pages
- Book appointment slots
- View doctor credentials and specialty
- Review after completed visit
- Save favorite clinics
- View appointment history
- Receive reminders and confirmations
- Search in local language if needed

### 3.2 Clinic dashboard

Clinics should have a simple dashboard to manage:

- Profile details and doctor list
- Timing and working hours
- Consultation fee and services
- Availability and appointment slots
- Booking acceptance or rejection
- Patient history and appointment records
- Review responses
- Basic analytics for views and booking conversion
- Document verification status

### 3.3 Admin backend

The platform admin side should support:

- Clinic verification flow
- Approval and rejection process
- Fake review detection review queue
- Dispute handling
- Clinic risk scoring
- Platform metrics and health monitoring
- Booking quality checks
- Fraud and suspicious activity monitoring
- Support and escalation systems

---

## 4. MVP feature priorities

### Must-have for launch

#### Patient features

1. Search by specialty and area
2. Clinic list with ranking
3. Clinic profile pages
4. Appointment booking
5. Doctor information and credentials
6. Verified reviews
7. Booked-visit eligibility for reviews
8. Booking reminders
9. Favorites and appointment history
10. Price transparency

#### Clinic features

1. Claim or create clinic profile
2. Add doctors and services
3. Manage schedules
4. Manage fees
5. Accept or reject appointment requests
6. View booking analytics
7. Upload verification documents
8. Respond to reviews

#### Admin features

1. Verification queue
2. Approve/reject clinic onboarding
3. Review suspicious clinics
4. Review flagged reviews
5. Monitor booking and platform health
6. Data moderation and user support

### Nice-to-have later

- Telemedicine
- Price comparison across procedures
- Lab or pharmacy add-ons
- Health locker
- AI triage assistant
- Multi-city expansion
- Complex insurance logic
- Advanced personalization

---

## 5. Core recommendation engine design

The ranking system is the differentiator and should be designed carefully.

### Primary idea

Score clinics using multiple factors instead of relying on one metric like star rating alone.

### Suggested scoring formula

```text
Score = w1(reputation) + w2(review quality) + w3(proximity) + w4(availability) + w5(patient fit)
```

### Recommended weighting to start

- Reputation and verification: 30%
- Review quality and trust: 25%
- Distance/proximity: 20%
- Availability: 15%
- Personal fit and preferences: 10%

### Why this works

- It favors trust and verified quality
- It avoids “highest-rated but unavailable” results
- It avoids “nearest but poor quality” results
- It still feels intuitive to patients

### Recommendation logic details

#### 1. Reputation

Reputation should include:

- Verified registration or license status
- Time active in the platform
- Doctor credentials and profile completeness
- Clinics with consistent history and good resolution of issues
- Prior completion and trust indicators

This prevents a clinic with little verification from ranking too highly simply because of reviews.

#### 2. Review quality

Do not just average stars.

Use:

- Bayesian adjustment (similar to IMDb-style ranking)
- Verified completed-visit reviews only
- Recency weighting
- Review density and trust thresholds
- Specialty-specific performance metrics

Example principle:

A clinic with 4.9 stars from 3 reviews should not automatically outrank a clinic with 4.7 stars from 500 verified reviews.

#### 3. Distance

Use smooth decay rather than a harsh cutoff.

Example:

- 2 km may be near ideal
- 4–5 km may still be acceptable if quality is significantly better
- 8–10 km should count less unless the clinic is much better or more available

This makes ranking more realistic and trustworthy.

#### 4. Availability

Include:

- Open today
- Next available appointment
- Appointment duration fit
- Typical wait time
- Whether the clinic accepts urgent appointments

#### 5. Patient fit

Use preference-based matching, such as:

- Language preference
- Accessibility needs
- Female doctor preference
- Budget preference
- Specialty match
- Preferred time or travel tolerance

---

## 6. Ranking anti-gaming rules

The platform should be designed to prevent manipulation.

### Important safeguards

- Only allow reviews from completed bookings
- Require identity or booking verification for review submissions
- Flag suspicious review bursts
- Detect repeated clinic manipulation patterns
- Cap sponsored placement visibility
- Avoid letting paid placement dominate the organic algorithm
- Record ranking changes and ranking rationale
- Monitor if a clinic is artificially inflating availability or profiles

### Explainable ranking

Patients should understand why a clinic appears higher than another one.

Example:

> Recommended because it is verified, 2.3 km away, available today, and has stronger specialty-specific review quality.

This makes the ranking feel fair and transparent.

---

## 7. Data model and domain concepts

### Core entities

#### Patient

- id
- name
- phone
- email
- language preference
- region or city
- preferences
- search history (optional)
- saved clinics
- booking history

#### Clinic

- id
- name
- type (clinic, hospital, chain, specialty center)
- registration/license number
- verification status
- ownership type
- address
- coordinates
- city
- languages
- contact info
- profile completeness score
- active status

#### Doctor

- id
- clinic_id
- name
- qualifications
- specialization
- registration number
- gender
- languages
- active status

#### Service

- id
- clinic_id
- name
- price
- description
- duration
- is_active

#### Schedule

- id
- clinic_id
- doctor_id
- day_of_week
- open_time
- close_time
- break_time
- slot_duration
- consultation_fee

#### Appointment

- id
- patient_id
- clinic_id
- doctor_id
- service_id
- date
- slot_start
- slot_end
- status
- booking_source
- notes
- cancellation_reason
- created_at

#### Review

- id
- patient_id
- clinic_id
- doctor_id
- appointment_id
- rating_overall
- rating_wait_time
- rating_staff
- rating_cleanliness
- rating_value_for_money
- review_text
- verified
- created_at
- moderated

#### Verification record

- id
- clinic_id
- type
- submitted_at
- reviewed_at
- status
- document_url
- reviewer_id
- notes

#### Admin action log

- id
- actor_id
- target_type
- target_id
- action
- reason
- created_at

---

## 8. Architecture recommendation

### Best practical architecture for MVP

#### Frontend

- Next.js for website
- React Native / Expo for mobile later

#### Backend

- One authoritative backend for both web and mobile
- Use a single API layer
- Keep business rules centralized

#### Database

- PostgreSQL as primary relational database
- PostGIS for geospatial queries
- Redis for caching and job queue tasks

#### Search and discovery

- Start with PostgreSQL full-text and simple filtering
- Add Elasticsearch only when search volume and complexity justify it

#### Storage

- Store clinic docs, profile photos, and review media in object storage

### High-level system structure

```text
Web app / Mobile app
        |
        v
   API backend
        |
   PostgreSQL + PostGIS
        |
   Redis / background jobs
        |
   Object storage
```

### Optional future split

Once complexity increases, a separate ranking service may be added.

```text
API backend -> Ranking service
              -> Analytics / reporting
              -> Recommendations
```

---

## 9. Recommended tech stack

### Best fit for MVP and early scale

| Area | Recommended tool | Notes |
|---|---|---|
| Web frontend | Next.js + TypeScript | Fast, SEO-friendly, good for marketing and discovery |
| Mobile app | React Native + Expo, later phase | Uses the same REST API after website stabilization |
| Backend | NestJS + TypeScript | Selected API and business-rule layer |
| Database | PostgreSQL on Supabase + Prisma | Authoritative transactional data store |
| Geography | PostGIS | Critical for nearby clinic search |
| Auth | Supabase Auth or Auth.js | Good developer experience |
| File storage | Supabase Storage or S3-compatible storage | Clinic docs, images |
| Search | OpenSearch or Elasticsearch from MVP | Search index only; PostgreSQL remains authoritative |
| Cache | Redis | Good for caching and background jobs |
| Restaurant-level-like data operations | Prisma or SQLAlchemy | ORM choice depending on stack |
| Maps | MapLibre + OpenStreetMap or Mapbox | Open and cost-conscious options |
| Notifications | In-app and email for MVP | SMS and WhatsApp are later extensions |
| Email | Resend or Brevo | Transactional mail |
| Payments | Later phase | Online payments are excluded from MVP |
| Analytics | PostHog or Umami | Product analytics |
| Logging | Sentry | Error tracking |
| Hosting | Vercel / Cloudflare / Supabase combination | Straightforward MVP deployment |
| CI/CD | GitHub Actions | Free, simple, reliable |

### My practical recommendation

For this product, a strong early combination is:

- Next.js + TypeScript for the website
- React Native / Expo for mobile later
- PostgreSQL + PostGIS for data and geography
- Supabase for auth and storage
- OpenSearch or Elasticsearch for provider search
- Redis for caching and asynchronous tasks
- Razorpay integration when launching bookings with payments

---

## 10. Free and low-cost technology considerations

### Good free/open-source choices

- PostgreSQL
- PostGIS
- Next.js
- React Native / Expo
- FastAPI
- NestJS
- Tailwind CSS
- MapLibre
- OpenStreetMap
- Firebase Cloud Messaging
- GitHub
- Playwright
- Vitest
- Sentry free tier
- PostHog free tier

### Things to be careful with

- Public map tile usage restrictions
- SMS costs at scale
- Cloud free-tier limitations
- Database usage caps
- API rate limits
- Ongoing costs after launch

### Realistic free-stack MVP

A practical low-cost path is:

- Vercel for frontend
- Supabase for auth and database
- PostGIS in PostgreSQL database
- Firebase for notification push
- MapLibre + OSM for map data
- GitHub for code and CI

This is enough to validate the product without heavy infrastructure costs.

---

## 11. Clinic onboarding and verification flow

This should be a major part of onboarding and trust strategy.

### Basic clinic onboarding flow

1. Clinic creates account
2. Enters clinic name, address, specialty, and contact info
3. Adds doctors and credentials
4. Uploads documents
5. Selects services and fees
6. Sets operating hours
7. Uploads photos and facilities
8. Submits to verification queue
9. Admin reviews and approves or rejects
10. Clinic goes live after approval

### Verification evidence

Use a combination of:

- Business registration proof
- License or registration documents
- Doctor credential documents
- Photos of clinic and facilities
- Phone verification
- Address verification
- Optional insurance or compliance data

### Verification statuses

- Draft
- Submitted
- Under review
- Approved
- Rejected
- Suspended

---

## 12. Admin moderation and safety plan

Healthcare marketplaces need trust-building and abuse control from day one.

### Important moderation domains

- Clinic verification
- Fake review detection
- Booking abuse or fraud
- Duplicate or spam profile detection
- Review censorship and misrepresentation
- User complaints
- Dispute mediation

### Moderation systems

- Review submission blocked unless appointment is completed
- Review text scanned for suspicious patterns
- Manual review queue for flagged reviews
- Summaries of complaints per clinic
- Risk scoring for suspicious clinic behavior
- Suspension controls for repeat abuse

---

## 13. India-specific considerations

### Why India matters

India has a huge healthcare need, a fragmented clinic ecosystem, and a strong opportunity for digital discovery and scheduling—especially in metro cities and tier-1 urban hubs.

### Key India-specific requirements

- Local-language support (Hindi and regional languages)
- Price sensitivity and transparent pricing
- Support for local payment workflows
- Local SMS and notifications
- Search by area and landmark names
- Accessibility filters, especially for urban family usage
- Verification for doctor and clinic credibility
- Culturally aware UX and trust messaging

### Payment and communications

- Razorpay is a strong India-first choice
- SMS and WhatsApp can be useful, but must be clear and consent-led
- Notification workflows should respect patient consent and opt-out preferences

### Local-language strategy

Start with:

- English
- Hindi
- One local major regional language for your city

This can create strong product differentiation in cities where many users prefer a native-language experience.

---

## 14. Privacy, compliance, and patient safety

Because the platform touches healthcare and appointment records, privacy must be built into the product from the start.

### Recommended principles

- Only collect necessary data
- Be explicit about how patient data is used
- Make data access and deletion easy
- Minimize the amount of health details collected in the first version
- Enforce role-based access for clinic staff and admins
- Use secure storage and transmission
- Maintain logs for admin actions and data access
- Do not share patient data with third parties without explicit consent
- Keep any future telemedicine or record-sharing features under strong legal review

### India-specific legal review

Before launching features involving medical records, telemedicine, or sensitive health data, consider legal review for:

- Digital Personal Data Protection Act compliance
- Data consent rules
- Patient rights and deletion requests
- Medical records handling
- Telemedicine practice and consent requirements

This is not legal advice, but a short legal consult is worthwhile.

---

## 15. Suggested first-city MVP scope

### Objective

Build a minimally viable but trustworthy clinic-booking network in one city.

### Initial target city scope

- One city
- 2–4 specialties
- 50–200 clinics (manually onboarded early)
- Limited local language support
- Simple booking and waiting-time data
- Verified review flow

### Focus areas

- Patient search and booking
- Clinic verification
- Ranking transparency
- Reviews tied to completed visits
- Admin moderation
- Staff responsiveness and reliability

### Scope should exclude in v1

- Telemedicine
- Electronic health records
- Insurance-heavy workflow
- AI diagnosis
- Multi-city rollout
- Advanced recommendation ML
- Automated medical triage beyond simple routing
- Large lab or pharmacy marketplace

---

## 16. Revenue model ideas

### Core revenue options

#### 1. Commission per completed booking

- Strongest alignment with real patient value
- Easy to explain to clinics
- Keeps incentives tied to bookings, not just registration

#### 2. Subscription for clinics

Offer pricing tiers:

- Basic listing
- Verified profile
- Analytics dashboard
- Staff seat access
- Booking automation
- Premium placement or ranking insights

#### 3. Sponsored placement

- Offer a promoted listing feature
- Label it clearly
- Restrict it so it cannot overwhelm organic ranking

#### 4. Future telemedicine sharing

- Commission on video consultations
- Adds another high-value service once the platform scales

#### 5. Data/analytics products for clinics

- Booking trend reports
- NPS and patient sentiment analysis
- Operational insights

Do not sell identifiable patient data.

---

## 17. Feature ideas that stand out

These are high-value differentiators and can strengthen the platform:

- Verified reputation badge with documented trust levels
- Fake-review prevention using completed-visit verification
- AI symptom intake triage that suggests likely specialties
- Price transparency for common procedures
- Wait-time estimator
- Language-specific patient experience
- Accessibility filters
- Special urgent-care mode
- Clinic ranking explanations
- Clinic response to reviews
- Regional-language support for Indian cities

### Best standout opportunities

If you want the strongest differentiators, prioritize these first:

1. Verified clinic trust system
2. Explainable recommendation engine
3. Verified-booking review system
4. Local language support
5. Price transparency
6. Appointment availability quality and wait-time visibility

---

## 18. Product principles to keep

1. Trust is the real product.
2. Reviews should be tied to real completed bookings.
3. Ranking must be explainable and fair.
4. The patient must feel the platform is helping, not confusing.
5. Clinics should feel the platform creates valuable demand, not just noise.
6. Privacy and safety are not add-ons; they are core product requirements.
7. Avoid “too much too soon.”
8. One city and one trustworthy workflow should validate the model before expansion.

---

## 19. Recommended MVP launch outcome

The first launch should prove the following:

- Patients can find the right clinic in a city quickly
- Patients trust the recommendation ranking
- Patients can book with confidence
- Clinics can manage availability and bookings efficiently
- Reviews come only from completed visits
- Admin can review and approve onboarding and disputes
- The platform creates measurable value for both sides

If that works, the next step is expansion into more cities, more specialties, and richer features.

---

## 20. Final recommendation

The smartest initial version is a city-first, trust-first, booking-first healthcare aggregator with a transparent ranking engine and a verified review system.

### Best immediate path

- Launch in one city
- Focus on 2–4 high-demand specialties
- Use a simple, explainable recommendation engine
- Require verified completed appointment reviews
- Add transparent pricing and wait-time visibility
- Use strong clinic onboarding and verification controls
- Keep the stack lean and low-cost during validation

This gives you the highest chance of building a product that feels trustworthy early, rather than bleeding into a broad but low-trust directory.

---

## 21. Working forward plan

From here, the next project steps should be:

1. Decide the city and target specialties
2. Define the exact user journeys for patient and clinic
3. Define the expected ranking formula and scoring inputs
4. Document the core database schema and entities
5. Create wireframes for web and mobile screens
6. Validate pricing and clinic onboarding flow with real clinics
7. Build the MVP in small phases
8. Measure completion and quality metrics before expansion

This document is the baseline for all future planning and product work.

---

## 22. Step-by-step project workflow

This workflow is designed for a single-city MVP. Complete each phase before moving to the next unless the phase explicitly runs in parallel.

### Phase 0: Set the project foundation

**Objective:** Establish the product direction, scope, ownership, and decision process.

#### Steps

1. Confirm the launch city.
2. Select the first 2–4 specialties.
3. Define the initial patient segment.
4. Define the initial clinic segment.
5. Assign product, design, engineering, operations, and compliance responsibilities.
6. Create a shared decision log for major product and technical decisions.
7. Confirm the MVP budget, timeline, and available team.
8. Create a risk register covering privacy, clinic verification, fake reviews, booking failures, and adoption.

#### Outputs

- Product vision
- Launch-city decision
- Target specialty list
- User personas
- Team responsibilities
- MVP constraints
- Risk register

#### Completion criteria

- Everyone agrees on who the MVP is for
- The launch city and specialties are fixed
- New ideas can be classified as MVP, later, or out of scope

---

### Phase 1: Conduct user and market research

**Objective:** Validate the real problems before designing or building the product.

#### Patient research

Interview potential patients about:

- How they currently find clinics
- How they compare doctors
- What makes them distrust online listings
- How they check prices
- How they book appointments
- What causes cancellations or no-shows
- Which languages they prefer
- Which information they need before booking

#### Clinic research

Interview clinic owners, receptionists, and doctors about:

- How they currently receive appointments
- How they manage availability
- What causes empty slots
- What information they want patients to see
- What they fear about online reviews
- Whether they would pay per booking or subscription
- What verification process they can realistically complete

#### Competitor research

Study local and national healthcare platforms for:

- Search experience
- Ranking behavior
- Booking workflow
- Pricing visibility
- Review quality
- Clinic onboarding
- Weaknesses and patient complaints

#### Outputs

- Interview notes
- Patient pain-point list
- Clinic pain-point list
- Competitor comparison
- Initial value proposition
- List of assumptions requiring validation

#### Completion criteria

- At least 10–15 patient conversations
- At least 5–10 clinic conversations
- The top three patient and clinic problems are clear
- The MVP solves a validated problem rather than an assumed one

---

### Phase 2: Define the MVP scope

**Objective:** Convert research into a limited, buildable first release.

#### Steps

1. List every requested feature.
2. Classify each feature as:
   - Must have for launch
   - Useful after launch
   - Future or experimental
3. Define the minimum patient booking journey.
4. Define the minimum clinic onboarding journey.
5. Define the minimum admin verification journey.
6. Define what data will not be collected in the MVP.
7. Write acceptance criteria for each MVP feature.
8. Estimate complexity and dependencies.

#### Recommended MVP boundary

Include:

- Patient registration or guest discovery
- Search and filters
- Explainable ranking
- Clinic profile
- Appointment request or slot booking
- Clinic booking management
- Admin verification
- Booking reminders
- Completed-visit reviews
- Basic analytics

Exclude:

- Medical records
- Telemedicine
- AI diagnosis
- Insurance claims
- Multi-city support
- Advanced machine-learning ranking

#### Outputs

- Prioritized product backlog
- MVP feature specification
- Acceptance criteria
- Dependency map
- Out-of-scope list

#### Completion criteria

- Every MVP feature has a clear user outcome
- Every feature has an acceptance test
- The MVP can be explained in one short paragraph

---

### Phase 3: Design the business and operating model

**Objective:** Decide how the platform will operate before technical design begins.

#### Steps

1. Define how clinics join the platform.
2. Define required verification documents.
3. Define who reviews submitted documents.
4. Define the review eligibility rule.
5. Define cancellation and no-show policies.
6. Define how patient support will handle disputes.
7. Define the initial revenue model.
8. Define whether bookings are requests or automatically confirmed.
9. Define clinic response-time expectations.
10. Define platform rules for sponsored listings.

#### Recommended initial operating rules

- Clinics are manually approved before going live.
- Reviews are allowed only after completed appointments.
- Clinics must respond to booking requests within a defined time.
- Sponsored listings are clearly labeled and cannot replace trust ranking.
- Admin actions are logged.

#### Outputs

- Clinic onboarding policy
- Verification checklist
- Review policy
- Cancellation policy
- Dispute policy
- Initial pricing and revenue model
- Clinic service-level expectations

#### Completion criteria

- A real clinic can be onboarded using the documented process
- A booking dispute has a defined resolution path
- The platform can explain how it earns revenue without compromising trust

---

### Phase 4: Design user journeys and information architecture

**Objective:** Define the complete experience before creating visual designs.

#### Patient journey

```text
Open platform
  -> Choose location
  -> Choose specialty or describe care need
  -> Apply filters
  -> Review ranked clinics
  -> Open clinic profile
  -> Compare doctors, fees, availability, and trust signals
  -> Select appointment slot
  -> Enter booking details
  -> Confirm booking
  -> Receive reminder
  -> Complete appointment
  -> Submit verified review
```

#### Clinic journey

```text
Create clinic account
  -> Enter clinic details
  -> Add doctors and services
  -> Upload verification documents
  -> Configure schedule and fees
  -> Submit for approval
  -> Respond to admin requests
  -> Become approved
  -> Manage bookings
  -> Complete appointments
  -> Respond to reviews
  -> View analytics
```

#### Admin journey

```text
Open verification queue
  -> Review clinic information
  -> Review documents
  -> Approve, reject, or request changes
  -> Monitor bookings and complaints
  -> Moderate flagged reviews
  -> Suspend or restore accounts when necessary
  -> Review platform analytics
```

#### Outputs

- Sitemap
- User flows
- Navigation structure
- Screen inventory
- Empty, loading, error, and success states

#### Completion criteria

- Every critical action has a defined screen
- No user is left without a clear next step
- Failure cases are designed, not ignored

---

### Phase 5: Create wireframes and validate the UX

**Objective:** Test the product concept before spending time on production development.

#### Patient screens

- Landing/search screen
- Location selection
- Specialty selection
- Filter panel
- Ranked results
- Clinic profile
- Doctor profile
- Slot selection
- Booking details
- Booking confirmation
- Appointment history
- Review form

#### Clinic screens

- Clinic registration
- Verification status
- Clinic profile editor
- Doctor management
- Service and fee management
- Schedule editor
- Booking queue
- Booking details
- Review responses
- Analytics

#### Admin screens

- Dashboard
- Verification queue
- Clinic review screen
- Review moderation
- Complaints and disputes
- Audit history

#### Validation process

1. Create low-fidelity wireframes.
2. Test the patient search-to-booking flow.
3. Test the clinic onboarding flow with clinic staff.
4. Record confusion, hesitation, and missing information.
5. Revise the flow.
6. Create higher-fidelity designs only after the flow is understood.

#### Outputs

- Validated wireframes
- UI design system
- Accessibility decisions
- Copy and terminology guide
- Revised user flows

#### Completion criteria

- Test users can find a clinic without assistance
- Clinic staff understand how to manage availability
- The booking flow has no major usability blockers

---

### Phase 6: Define data, API, and ranking specifications

**Objective:** Create a stable technical blueprint before implementation.

#### Data design steps

1. Confirm the core entities.
2. Define relationships and ownership.
3. Define required and optional fields.
4. Define status values and transitions.
5. Define privacy classification for each data field.
6. Define retention and deletion behavior.
7. Define audit-log requirements.

#### API design steps

Document APIs for:

- Authentication
- Patient profile
- Clinic search
- Filters
- Clinic profiles
- Availability
- Booking creation
- Booking updates
- Notifications
- Reviews
- Clinic management
- Verification
- Admin moderation

#### Ranking specification steps

1. Define candidate clinic eligibility.
2. Define distance calculation.
3. Define Bayesian review adjustment.
4. Define verification and reputation score.
5. Define availability score.
6. Define preference matching.
7. Define missing-data behavior.
8. Define ranking explanation text.
9. Define sponsored-result boundaries.
10. Create test cases for expected ordering.

#### Outputs

- Database schema
- API contract
- Booking state machine
- Ranking specification
- Privacy classification
- Test data examples

#### Completion criteria

- Engineering can implement without guessing business rules
- Ranking output is deterministic for the same inputs
- Booking states and failure conditions are documented

---

### Phase 7: Set up the technical foundation

**Objective:** Create a maintainable development foundation.

#### Steps

1. Create the source repository and branching strategy.
2. Configure development, staging, and production environments.
3. Set up the frontend application.
4. Set up the backend/API layer.
5. Set up PostgreSQL and PostGIS.
6. Configure authentication.
7. Configure file storage.
8. Configure environment variables and secret management.
9. Add linting, formatting, and type checking.
10. Add automated tests and CI.
11. Configure error monitoring and structured logging.
12. Add database migration tooling.

#### Technical standards

- No secrets in source control
- API validation at boundaries
- Role-based authorization
- Audit logs for sensitive actions
- Automated database migrations
- Consistent error responses
- Accessible UI components
- Staging environment for testing before production

#### Outputs

- Running development environment
- Staging environment
- Database migrations
- CI checks
- Monitoring setup
- Technical contribution guide

#### Completion criteria

- A new developer can run the project using documented steps
- A change can be tested and deployed to staging
- Errors are visible to the team

---

### Phase 8: Build the MVP in vertical slices

**Objective:** Build complete user outcomes rather than isolated technical components.

Build in this order:

#### Slice 1: Clinic and admin foundation

- Clinic account
- Clinic profile
- Doctor and service data
- Admin verification
- Clinic approval state

#### Slice 2: Patient discovery

- Location input
- Specialty search
- Filters
- Clinic results
- Clinic profile

#### Slice 3: Recommendation engine v1

- Candidate selection
- Distance calculation
- Trust score
- Bayesian review score
- Availability score
- Ranking explanation

#### Slice 4: Availability and booking

- Clinic schedule
- Slot generation
- Appointment creation
- Booking status
- Clinic confirmation
- Cancellation and rescheduling

#### Slice 5: Notifications

- Booking confirmation
- Reminder
- Cancellation notice
- Clinic action notification

#### Slice 6: Verified reviews

- Completed appointment eligibility
- Review form
- Moderation queue
- Clinic response
- Review display

#### Slice 7: Operations and analytics

- Admin dashboard
- Booking metrics
- Clinic performance metrics
- Support and dispute records
- Audit trails

#### Completion criteria for every slice

- The feature works end to end
- Success and failure states are covered
- Authorization is tested
- Analytics events are recorded
- The slice is available in staging

---

### Phase 9: Prepare clinic supply before public launch

**Objective:** Ensure patients find real, useful options at launch.

#### Steps

1. Identify potential clinics in the launch areas.
2. Contact clinic owners or managers.
3. Explain the platform value clearly.
4. Manually onboard the first clinics.
5. Verify their documents.
6. Collect accurate schedules, fees, services, and photos.
7. Train clinic staff on booking management.
8. Test booking response times.
9. Confirm clinics will honor listed availability and pricing.
10. Create an escalation contact for each clinic.

#### Recommended initial supply target

- 20–30 clinics for a closed pilot
- 50–100 clinics for a stronger city launch
- A balanced supply across the selected specialties and launch areas

#### Completion criteria

- Each target specialty has enough clinics
- Clinic profiles are complete and accurate
- Staff know how to handle bookings
- Test bookings work successfully

---

### Phase 10: Run a closed beta

**Objective:** Test the complete service with real users before public launch.

#### Beta participants

- A small group of real patients
- Clinic reception staff
- Doctors or clinic owners
- Internal admin and support team

#### Test scenarios

- Search for a specialty
- Apply filters
- Compare clinics
- Book an appointment
- Clinic accepts booking
- Clinic rejects or reschedules booking
- Patient cancels
- Patient misses appointment
- Completed visit produces review eligibility
- Review is submitted and moderated
- Clinic responds to review
- Admin handles a complaint

#### Measure\n

- Search-to-profile conversion
- Profile-to-booking conversion
- Booking completion
- Clinic response time
- Cancellation and no-show rates
- Failed booking rate
- Review completion
- Patient satisfaction
- Support requests

#### Completion criteria

- No critical booking or privacy defects remain
- Clinics respond reliably
- Users understand ranking explanations
- Support can resolve common problems

---

### Phase 11: Security, privacy, and compliance review

**Objective:** Confirm that the platform is safe enough for launch.

#### Review areas

- Authentication and password handling
- Authorization by role
- Patient data access
- Clinic staff data access
- Admin privilege boundaries
- File upload security
- API rate limiting
- Audit logs
- Data deletion
- Consent records
- Secure backups
- Error-message information leakage
- Third-party provider configuration

#### Operational documents

- Privacy policy
- Terms of service
- Consent language
- Review policy
- Clinic verification policy
- Cancellation and refund policy
- Support escalation procedure
- Incident-response procedure

#### Completion criteria

- Critical vulnerabilities are fixed
- Privacy and consent language is reviewed
- Staff know how to respond to incidents
- Production access is limited and auditable

---

### Phase 12: Production launch

**Objective:** Release carefully and monitor the real service.

#### Launch checklist

- Production domain and SSL
- Production database backups
- Monitoring and alerting
- Support contact
- Clinic availability confirmation
- Terms and privacy pages
- Notification templates
- Payment configuration, if enabled
- Analytics events
- Rollback plan
- Launch communication plan

#### Launch approach

1. Launch to a small area or user cohort.
2. Monitor booking and support activity closely.
3. Fix severe issues immediately.
4. Expand to additional neighborhoods.
5. Add clinics gradually.
6. Avoid launching multiple new cities simultaneously.

#### Completion criteria

- Users can complete the full journey in production
- Clinics receive and manage bookings
- Support responds within the defined target
- Monitoring shows stable performance

---

### Phase 13: Measure, improve, and expand

**Objective:** Use evidence to decide what to improve and when to scale.

#### Weekly review

Review:

- Completed bookings
- Search-to-booking conversion
- No-shows and cancellations
- Clinic response times
- Patient complaints
- Review quality
- Most-used filters
- Ranking anomalies
- Platform errors

#### Monthly review

Review:

- Clinic retention
- Patient repeat booking
- Revenue per booking
- Acquisition cost
- Specialty performance
- City-area performance
- Ranking fairness
- Support workload

#### Expansion gate\n

Do not expand to another city until:

- Booking flow is stable
- Clinics are responding reliably
- Patients return for another booking
- Review quality is trustworthy
- Support and verification operations are repeatable
- Unit economics are understood

---

## 23. Suggested project work breakdown

### Workstream A: Product and research

- User interviews
- Competitor research
- MVP scope
- Policies
- Metrics
- Product requirements

### Workstream B: UX and design

- Information architecture
- User journeys
- Wireframes
- Visual design
- Design system
- Usability testing

### Workstream C: Patient experience

- Search
- Filters
- Rankings
- Clinic profiles
- Booking
- Reviews
- Notifications

### Workstream D: Clinic experience

- Onboarding
- Verification
- Profile management
- Schedule management
- Booking management
- Review responses
- Analytics

### Workstream E: Admin and operations

- Verification queue
- Moderation
- Disputes
- Support
- Audit logs
- Platform analytics

### Workstream F: Platform engineering

- Authentication
- Database
- API
- Infrastructure
- Security
- Testing
- Monitoring

### Workstream G: Clinic acquisition and launch

- Clinic prospecting
- Onboarding
- Training
- Pilot operations
- Marketing
- Feedback collection

---

## 24. Recommended project order

Follow this order to reduce rework:

1. Choose city and specialties
2. Research patients and clinics
3. Freeze MVP scope
4. Define operating policies
5. Map user journeys
6. Create and test wireframes
7. Finalize data and API design
8. Finalize ranking rules
9. Set up the technical foundation
10. Build clinic/admin foundation
11. Build patient search and profiles
12. Build ranking
13. Build booking
14. Build notifications
15. Build verified reviews
16. Onboard pilot clinics
17. Run closed beta
18. Complete security and compliance review
19. Launch gradually
20. Measure and improve

---

## 25. Definition of done for the MVP

The MVP is ready for public launch only when:

- Patients can search by specialty and location
- Results are ranked using documented rules
- Ranking explanations are visible
- Clinic profiles contain accurate information
- Only approved clinics are publicly listed
- Patients can book appointments
- Clinics can manage availability and booking status
- Patients receive confirmation and reminders
- Reviews are restricted to completed visits
- Clinics can respond to reviews
- Admins can moderate clinics, reviews, and disputes
- Sensitive actions are logged
- Privacy and consent requirements are addressed
- Critical security issues are fixed
- Monitoring and backups are operational
- Support procedures are documented

---

## 26. First actions to take now

Before design or development begins, complete these actions:

1. Select the launch city.
2. Select the first specialties.
3. Write a one-paragraph target-patient definition.
4. Interview at least 10 patients.
5. Interview at least 5 clinics.
6. Identify the first 20 potential clinics.
7. Confirm the booking model: request-based or instant confirmation.
8. Confirm whether payment is included in the MVP.
9. Draft verification requirements.
10. Create the first MVP backlog.

These decisions will make the next planning stage concrete and prevent premature technical work.

---

## 28. Current project baseline

This section is the current source of truth after reconciling the original plan and the detailed platform specification.

### Fixed decisions

- Launch city: **Moradabad, Uttar Pradesh, India**.
- Architecture: multi-city-ready from the beginning.
- MVP clients: patient website, clinic dashboard, and admin console.
- Mobile app: build later, after the website and booking workflow are stable.
- Website: Next.js, React, and TypeScript.
- Backend: Node.js, NestJS, and TypeScript.
- ORM: Prisma.
- API: versioned REST API with OpenAPI/Swagger.
- Database: PostgreSQL on Supabase; use PostGIS for location queries where available.
- Search: OpenSearch or Elasticsearch from the beginning.
- Source of truth: PostgreSQL remains authoritative; search indexes must never control bookings or permissions.
- Authentication: Supabase Auth may provide identity; NestJS owns authorization, RBAC, clinic isolation, and business rules.
- Storage: Supabase Storage behind a storage abstraction; verification documents are private and accessed through controlled access or signed URLs.
- MVP notifications: in-app and email only.

### MVP boundaries

The MVP includes provider discovery, constrained natural-language provider search, filtering, clinic and doctor profiles, comparison, real availability, appointment booking, cancellation, rescheduling, appointment history, favorites, verified reviews, clinic and doctor verification, clinic scheduling, admin moderation, analytics, audit logs, and explainable ranking.

The MVP does not include:

- Online payments
- SMS or WhatsApp
- Mobile application
- Telemedicine
- Electronic health records
- Patient-doctor chat
- AI diagnosis or treatment recommendations
- Prescription management
- Complex insurance integration
- Multi-clinic doctor assignment
- Hospital-management functionality

These features may be added later through planned extension points without changing the core booking architecture.

### Current technical and product rules

- Ranking is configurable, auditable, and explainable. It considers relevance, availability, distance, verification, review confidence, appointment reliability, profile completeness, and patient preferences.
- Natural-language search may extract provider-discovery constraints, but must never diagnose, infer diseases, recommend treatment, or claim that a clinician is medically best.
- Scheduling supports working hours, breaks, holidays, leave, one-off overrides, slot generation, cancellation, rescheduling, no-show, check-in, completion, and review eligibility.
- Booking prevents double booking using transactional database controls and supports idempotent retries.
- Patient, clinic, admin, public, private, and verification-document data are isolated by server-side authorization.
- Public clinic and doctor pages must remain SEO-friendly without exposing private patient data.
- Releases require unit, integration, end-to-end, security, performance, accessibility, backup/restore, monitoring, and documentation checks.

### Work order

1. Finalize Moradabad specialties and booking mode.
2. Validate patient and clinic workflows.
3. Finalize database, REST API, ranking, privacy, and event specifications.
4. Set up Next.js, NestJS, Prisma, Supabase, OpenSearch, CI, environments, monitoring, and backups.
5. Build authentication, RBAC, clinic isolation, clinic/doctor verification, and audit logs.
6. Build search, profiles, comparison, availability, ranking, booking, notifications, and reviews.
7. Build clinic dashboard and admin console.
8. Test with pilot clinics in Moradabad.
9. Launch the website gradually.
10. Build the React Native/Expo mobile app later using the same REST API and business rules.

### Still open

1. First 2–4 specialties in Moradabad.
2. Clinic-confirmation, instant booking, or configurable booking mode.
3. Whether Google OAuth and phone OTP are both required in MVP.
4. Managed or self-hosted OpenSearch for the pilot.
5. Email provider and in-app notification implementation.
6. Admin roles and approval authority for clinic and doctor verification.

---

## 27. Consolidated detailed platform specification

This section reconciles the original planning document with the detailed build brief. The detailed brief resolves earlier alternatives and is the working baseline for implementation planning.

### Confirmed product scope

- Initial launch city: **Moradabad, Uttar Pradesh, India**.
- The database, APIs, search, and administration must support multiple cities from the beginning.
- The product is a healthcare-provider discovery and appointment marketplace, not an EHR or hospital-management system.
- The first implementation is the website, backend, clinic dashboard, and admin console.
- The mobile application is a later phase after the website and booking workflow are stable.

### MVP must include

#### Patient

- Registration and login
- Clinic, doctor, specialty, service, and location search
- Constrained natural-language provider search
- Filters for city, specialty, availability, fee, rating, verification, distance, and facilities
- Clinic and doctor profiles
- Clinic comparison
- Real availability
- Appointment booking
- Cancellation and rescheduling
- Appointment history
- Favorites
- In-app and email notifications
- Verified reviews after completed appointments

#### Clinic

- Registration and verification submission
- Clinic profile management
- Doctor management and doctor-verification submission
- Specialty, service, fee, facility, and photo management
- Working hours, breaks, holidays, leave, overrides, and availability
- Appointment management
- Appointment-associated patient information only
- Review responses
- Basic analytics

#### Admin

- Admin dashboard
- Clinic and doctor verification
- User, specialty, clinic, doctor, and appointment management
- Review moderation and reports
- Ranking configuration
- Analytics
- Platform policies
- Audit logs

### Explicitly out of MVP

- Mobile application
- Online payments
- SMS and WhatsApp notifications
- Video consultation
- Patient-doctor chat
- AI diagnosis or treatment recommendations
- Prescription management
- Electronic medical records
- Complex insurance integration
- Multi-clinic doctor assignment
- Hospital-management functionality

Design extension points for these capabilities, but do not implement them during the MVP.

### Technology baseline

The detailed specification resolves the previous technology alternatives as follows:

- Website: Next.js, React, and TypeScript
- Backend: Node.js, NestJS, and TypeScript
- API style: versioned REST API with OpenAPI/Swagger
- Database: PostgreSQL on Supabase
- ORM: Prisma
- Search: OpenSearch or Elasticsearch from the beginning
- Hosting: Vercel for the website and a portable managed/container deployment for NestJS
- Storage: Supabase Storage behind a storage abstraction
- Auth identity: Supabase Auth where useful
- Application authorization: NestJS RBAC and clinic-isolation policies
- Future mobile: React Native with Expo using the same NestJS REST API

PostgreSQL remains authoritative for users, clinics, schedules, appointments, reviews, verification, and audit data. OpenSearch is only a search index and must never be the source of truth for bookings or permissions.

### Search and natural-language rules

Search should cover clinic names, doctor names, specialties, services, facilities, locations, cities, and relevant public profile text. Filters should include city, specialty, doctor, clinic, availability, consultation fee, rating, verification, distance, and facilities.

Natural-language search may convert provider-discovery requests such as “affordable dermatologist near me available tomorrow evening” into structured filters. It must not diagnose, infer disease, recommend treatment, or claim that a clinician is medically best.

### Ranking configuration

The ranking engine must consider:

- Query and specialty relevance
- Availability
- Distance
- Verification
- Rating quality
- Verified review volume and confidence
- Appointment reliability
- Profile completeness
- User preferences and history when available

Ranking weights must be configurable by authorized admins. Store ranking configurations and history in the database, require an audit reason for changes, and return a patient-readable explanation such as:

> Recommended because of specialty match, availability, distance, and verified status.

Ranking is provider-discovery assistance, not medical advice.

### Multi-tenant data isolation

- Patients see only their own private account and appointment information.
- Clinic users see only clinics and appointment data they are authorized to manage.
- Admin access is role-based and auditable.
- Public clinic and doctor data is separated from private patient and verification data.
- Verification documents are private and delivered through controlled access or signed URLs.
- API authorization is enforced server-side and is never based only on hidden frontend controls.

### Scheduling and booking baseline

The scheduling engine must support working hours, breaks, holidays, doctor leave, one-off schedule overrides, appointment duration hierarchy, slot generation, clinic-specific instant/request booking mode, cancellation, rescheduling, no-show, check-in, completion, and review eligibility after completion.

Prevent double booking with transactional database operations and appropriate uniqueness or locking constraints. Design retries to be idempotent.

### Storage and documents

Use a storage-service abstraction with operations equivalent to upload, delete, signed URL retrieval, and metadata retrieval. Use public or optimized storage only for permitted profile media. Store verification and other sensitive documents in private storage with controlled access and signed URLs.

### MVP notifications

Use in-app and email notifications for booking confirmation, booking acceptance/rejection/rescheduling, upcoming reminders, cancellation, review eligibility, clinic verification updates, and admin operational alerts. SMS and WhatsApp remain future integrations.

### Required quality and documentation gates

- Unit, integration, and end-to-end tests
- Security tests for unauthorized access, role isolation, uploads, and sensitive data exposure
- Performance testing for search and booking
- Responsive design and accessibility checks
- SEO for public clinic and specialty pages
- Structured application logging and monitoring
- Database backups and restore testing
- Consistent API error responses
- OpenAPI/Swagger documentation
- Documentation for database, API, authentication, booking, security, deployment, and operations

### Decisions still requiring explicit confirmation

1. Whether the first booking mode is clinic-confirmation only, instant booking only, or configurable per clinic.
2. Whether Google OAuth and phone OTP are both required for MVP or can be staged after email authentication.
3. Whether OpenSearch will be self-hosted or accessed through a managed service during the pilot.
4. Which two to four specialties launch first in Moradabad.
5. Which email provider and notification delivery service will be used.
6. The exact admin roles and approval authority for clinic and doctor verification.
