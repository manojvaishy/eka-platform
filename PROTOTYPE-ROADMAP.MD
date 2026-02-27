# Eka Prototype Roadmap - Frontend with Dummy Data

## Overview

Build a fully functional-looking website using React with realistic dummy data that demonstrates all features from REQUIRED.MD. This prototype will look and feel like a complete product, allowing stakeholders to experience the platform before backend development.

## Technology Stack

- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS (for rapid, beautiful UI)
- **UI Components**: shadcn/ui or Material-UI
- **Routing**: React Router v6
- **State Management**: React Context API (simple for prototype)
- **Icons**: Lucide React or React Icons
- **Dummy Data**: JSON files with realistic Indian names, locations, courses, jobs
- **Animations**: Framer Motion (optional, for polish)

## Project Structure

```
eka-prototype/
├── public/
│   ├── images/
│   │   ├── courses/
│   │   ├── profiles/
│   │   ├── services/
│   │   └── achievements/
│   └── videos/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── auth/            # Login, OTP, Onboarding
│   │   ├── profile/         # User profile components
│   │   ├── learning/        # Course cards, video player
│   │   ├── jobs/            # Job listings, applications
│   │   ├── services/        # Service marketplace
│   │   ├── community/       # Shakti Feed
│   │   ├── wallet/          # Payment, wallet
│   │   └── grow/            # Entrepreneurship
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── OnboardingPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── CoursesPage.jsx
│   │   ├── CourseDetailPage.jsx
│   │   ├── JobsPage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── CommunityPage.jsx
│   │   ├── WalletPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── GrowPage.jsx
│   ├── data/
│   │   ├── users.json
│   │   ├── courses.json
│   │   ├── jobs.json
│   │   ├── services.json
│   │   ├── posts.json
│   │   ├── schemes.json
│   │   └── transactions.json
│   ├── context/
│   │   └── AppContext.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── main.jsx
```

## Implementation Phases

### Phase 1: Setup & Foundation (Day 1)

**Goal**: Project setup with beautiful, responsive base

#### Tasks:
- [ ] 1.1 Initialize Vite + React project
  ```bash
  npm create vite@latest eka-prototype -- --template react
  cd eka-prototype
  npm install
  ```

- [ ] 1.2 Install dependencies
  ```bash
  npm install react-router-dom tailwindcss postcss autoprefixer
  npm install lucide-react
  npm install @headlessui/react
  npx tailwindcss init -p
  ```

- [ ] 1.3 Configure Tailwind CSS
  - Set up tailwind.config.js with custom colors (purple/pink theme for women empowerment)
  - Add Indian-friendly fonts (Noto Sans, Inter)

- [ ] 1.4 Create base layout components
  - Header with navigation
  - Footer
  - Sidebar (for dashboard)
  - Mobile responsive navigation

- [ ] 1.5 Set up routing structure
  - Configure React Router with all main routes
  - Create protected route wrapper (simulated auth)

**Deliverable**: Beautiful, responsive shell with navigation

---

### Phase 2: Authentication & Onboarding (Day 2)

**Goal**: Complete auth flow that looks real

#### Tasks:
- [ ] 2.1 Create dummy user data (data/users.json)
  ```json
  [
    {
      "id": "1",
      "name": "Priya Sharma",
      "phone": "+91 98765 43210",
      "age": 28,
      "location": {
        "state": "Maharashtra",
        "district": "Mumbai",
        "pincode": "400001"
      },
      "roles": ["learner", "skilled_worker"],
      "profileImage": "/images/profiles/priya.jpg",
      "trustScore": 4.5,
      "verified": true,
      "skills": ["Sewing", "Embroidery"],
      "badges": ["First Course", "5 Star Rating"]
    }
    // ... 50+ realistic users
  ]
  ```

- [ ] 2.2 Build Login Page
  - Phone number input with Indian format (+91)
  - Beautiful gradient background
  - Language selector (show 10 languages)
  - "Send OTP" button with loading state

- [ ] 2.3 Build OTP Verification Page
  - 6-digit OTP input boxes
  - Resend OTP timer (countdown)
  - Simulated verification (any 6 digits work)

- [ ] 2.4 Build Onboarding Flow (Multi-step)
  - Step 1: Name, Age, Photo upload
  - Step 2: Location (State, District, Pincode)
  - Step 3: Language preference (multi-select)
  - Step 4: Skills & Interests (searchable tags)
  - Step 5: Education & Work Preference
  - Progress indicator
  - Beautiful illustrations

- [ ] 2.5 Create Context for "logged in" user
  - Store current user in context
  - Simulate login/logout

**Deliverable**: Complete, beautiful auth flow

---

### Phase 3: Dashboard & Profile (Day 3)

**Goal**: Personalized dashboard showing user's activity

#### Tasks:
- [ ] 3.1 Build Dashboard Page
  - Welcome banner with user name
  - Quick stats cards (Courses: 3, Earnings: ₹12,450, Trust Score: 4.5)
  - Recent activity feed
  - Recommended courses (3-4 cards)
  - Upcoming bookings
  - Role switcher (Learner/Worker/Mentor tabs)

- [ ] 3.2 Build Profile Page
  - Profile header with photo, name, location, trust score
  - Verification badge (if verified)
  - Skills section with badges
  - Completed courses
  - Portfolio items (for skilled workers)
  - Reviews and ratings
  - Edit profile button (opens modal)

- [ ] 3.3 Create Profile Edit Modal
  - All fields editable
  - Image upload preview
  - Save changes (updates context)

- [ ] 3.4 Build Role Management
  - Toggle between roles
  - Different dashboard views per role

**Deliverable**: Personalized dashboard and profile

---

### Phase 4: Learning Module (Day 4-5)

**Goal**: Complete course browsing, enrollment, and learning experience

#### Tasks:
- [ ] 4.1 Create dummy courses data (data/courses.json)
  ```json
  [
    {
      "id": "1",
      "title": "Professional Tailoring & Stitching",
      "description": "Learn professional tailoring from basics to advanced techniques",
      "category": "sewing",
      "level": "beginner",
      "duration": 240,
      "language": "Hindi",
      "instructor": {
        "name": "Meera Devi",
        "bio": "20 years of tailoring experience",
        "image": "/images/instructors/meera.jpg"
      },
      "thumbnail": "/images/courses/tailoring.jpg",
      "price": 0,
      "rating": 4.7,
      "enrollmentCount": 1250,
      "syllabus": [
        {
          "id": "l1",
          "title": "Introduction to Tailoring",
          "type": "video",
          "duration": 15,
          "videoUrl": "https://example.com/video1.mp4"
        }
        // ... more lessons
      ]
    }
    // ... 30+ courses across all categories
  ]
  ```

- [ ] 4.2 Build Courses Page
  - Category filter sidebar (Sewing, Cooking, Beauty, etc.)
  - Search bar with live filtering
  - Course cards grid (responsive)
  - Filter by: Level, Language, Price, Rating
  - Sort by: Popular, Newest, Rating

- [ ] 4.3 Build Course Card Component
  - Thumbnail image
  - Title, instructor, duration
  - Rating stars
  - Price (Free/Paid)
  - Enrollment count
  - "Enroll Now" or "Continue Learning" button

- [ ] 4.4 Build Course Detail Page
  - Hero section with video preview
  - Course info (duration, level, language, rating)
  - Instructor profile
  - Syllabus accordion
  - Reviews section
  - "Enroll" button (adds to user's enrollments)

- [ ] 4.5 Build Video Player Page
  - Custom video player with controls
  - Lesson sidebar (syllabus navigation)
  - Progress bar
  - "Mark as Complete" button
  - Next lesson auto-navigation
  - Download button (for offline)

- [ ] 4.6 Build Quiz Component
  - Multiple choice questions
  - Timer
  - Submit and show results
  - Score display with feedback

- [ ] 4.7 Build Certificate Display
  - Beautiful certificate design
  - User name, course name, date
  - Download as PDF button (simulated)

- [ ] 4.8 Build Learning Dashboard
  - Enrolled courses with progress bars
  - Continue watching section
  - Completed courses
  - Earned certificates
  - Time spent learning stats

**Deliverable**: Complete learning experience

---

### Phase 5: Jobs Marketplace (Day 6)

**Goal**: Job search, application, and tracking

#### Tasks:
- [ ] 5.1 Create dummy jobs data (data/jobs.json)
  ```json
  [
    {
      "id": "1",
      "title": "Tailor for Boutique",
      "employer": {
        "name": "Elegant Fashions",
        "verified": true,
        "logo": "/images/employers/elegant.jpg"
      },
      "description": "Looking for experienced tailor...",
      "category": "sewing",
      "location": {
        "state": "Maharashtra",
        "district": "Mumbai",
        "distance": 3.5
      },
      "salary": {
        "min": 15000,
        "max": 25000
      },
      "type": "full_time",
      "postedAt": "2024-02-20",
      "applicants": 12,
      "skills": ["Stitching", "Pattern Making"]
    }
    // ... 50+ jobs
  ]
  ```

- [ ] 5.2 Build Jobs Page
  - Search bar with location
  - Filter sidebar (Category, Location, Salary, Type)
  - Job cards list
  - Map view toggle (show static map image)
  - Sort options

- [ ] 5.3 Build Job Card Component
  - Company logo
  - Job title, location, salary
  - Distance indicator
  - Skills required tags
  - Posted date
  - "Apply Now" button

- [ ] 5.4 Build Job Detail Page
  - Full job description
  - Company info with verification badge
  - Requirements section
  - Salary and benefits
  - Location with map
  - "Apply" button (opens modal)

- [ ] 5.5 Build Application Modal
  - Resume upload (simulated)
  - Cover letter textarea
  - Skills match indicator
  - Submit button

- [ ] 5.6 Build Applications Tracking Page
  - List of applied jobs
  - Status badges (Submitted, Under Review, Shortlisted, Rejected)
  - Timeline view

**Deliverable**: Complete job marketplace

---

### Phase 6: Services Marketplace (Day 7)

**Goal**: Service provider profiles, booking system

#### Tasks:
- [ ] 6.1 Create dummy services data (data/services.json)
  ```json
  [
    {
      "id": "1",
      "provider": {
        "id": "2",
        "name": "Anjali Verma",
        "image": "/images/profiles/anjali.jpg",
        "verified": true,
        "trustScore": 4.8,
        "completedJobs": 45
      },
      "title": "Home Tailoring Services",
      "category": "sewing",
      "description": "Professional tailoring at your doorstep",
      "pricing": {
        "type": "fixed",
        "amount": 500
      },
      "serviceArea": {
        "type": "radius",
        "radius": 10
      },
      "rating": 4.8,
      "reviewCount": 32,
      "images": ["/images/services/tailoring1.jpg"]
    }
    // ... 40+ services
  ]
  ```

- [ ] 6.2 Build Services Page
  - Category tabs
  - Search with location
  - Service provider cards grid
  - Filter by rating, price, distance

- [ ] 6.3 Build Service Provider Card
  - Profile photo
  - Name, trust score, verification badge
  - Service title and price
  - Rating and reviews count
  - "Book Now" button

- [ ] 6.4 Build Service Detail Page
  - Provider profile section
  - Service description
  - Image gallery
  - Pricing details
  - Availability calendar
  - Reviews section
  - "Book Service" button

- [ ] 6.5 Build Booking Modal
  - Date picker
  - Time slot selector
  - Location input
  - Notes textarea
  - Price summary
  - "Confirm Booking" button

- [ ] 6.6 Build Bookings Management Page
  - Upcoming bookings
  - Past bookings
  - Status tracking
  - Rate & Review button (after completion)

**Deliverable**: Complete services marketplace

---

### Phase 7: Wallet & Payments (Day 8)

**Goal**: Earnings, transactions, withdrawals

#### Tasks:
- [ ] 7.1 Create dummy transactions data (data/transactions.json)

- [ ] 7.2 Build Wallet Dashboard
  - Balance card (large, prominent)
  - Earnings chart (monthly trend)
  - Quick actions (Withdraw, Add Money)
  - Recent transactions list

- [ ] 7.3 Build Transaction History Page
  - Filterable list (All, Credit, Debit, Withdrawal)
  - Transaction cards with icons
  - Date, amount, description, status

- [ ] 7.4 Build Withdrawal Modal
  - Amount input
  - Bank details form
  - Available balance display
  - "Request Withdrawal" button

- [ ] 7.5 Build Payment Gateway Modal (simulated)
  - Payment method selection (UPI, Card, Net Banking)
  - Amount display
  - "Pay Now" button with loading state
  - Success animation

**Deliverable**: Complete wallet system

---

### Phase 8: Community Feed (Shakti) (Day 9)

**Goal**: Social feed with posts, likes, comments

#### Tasks:
- [ ] 8.1 Create dummy posts data (data/posts.json)
  ```json
  [
    {
      "id": "1",
      "user": {
        "name": "Priya Sharma",
        "image": "/images/profiles/priya.jpg"
      },
      "type": "achievement",
      "content": "Just earned my first ₹5,000 through Eka! 🎉",
      "achievement": {
        "type": "first_earning",
        "icon": "💰"
      },
      "media": [],
      "likes": 124,
      "comments": 18,
      "createdAt": "2024-02-22T10:30:00"
    }
    // ... 50+ posts
  ]
  ```

- [ ] 8.2 Build Community Feed Page
  - Create post button (floating action button)
  - Feed of posts (infinite scroll simulation)
  - Trending section sidebar
  - Filter tabs (All, Following, Achievements)

- [ ] 8.3 Build Post Card Component
  - User profile pic and name
  - Post content
  - Achievement badge (if applicable)
  - Images/videos
  - Like, Comment, Share buttons
  - Like count and comment count
  - Timestamp

- [ ] 8.4 Build Create Post Modal
  - Text input
  - Image/video upload
  - Achievement selector
  - Post button

- [ ] 8.5 Build Comments Section
  - Comment list
  - Add comment input
  - Like comments
  - Nested replies (1 level)

- [ ] 8.6 Build Trending Wins Section
  - Top posts by engagement
  - Achievement highlights

**Deliverable**: Engaging community feed

---

### Phase 9: Grow Module (Entrepreneurship) (Day 10)

**Goal**: Business resources, mentors, schemes

#### Tasks:
- [ ] 9.1 Create dummy schemes data (data/schemes.json)

- [ ] 9.2 Build Grow Dashboard
  - Hero section with motivational message
  - Business courses section
  - Government schemes section
  - Mentor connection section
  - Resources library

- [ ] 9.3 Build Government Schemes Page
  - Scheme cards with eligibility
  - Filter by category (Loan, Grant, Training)
  - "Apply" button (external link)

- [ ] 9.4 Build Business Mentors Page
  - Mentor profiles
  - Expertise areas
  - "Connect" button

- [ ] 9.5 Build Resources Library
  - Articles, videos, templates
  - Categorized tabs
  - Download buttons

- [ ] 9.6 Build Growth Analytics
  - Business goals tracker
  - Progress charts
  - Milestones

**Deliverable**: Complete entrepreneurship module

---

### Phase 10: Additional Features (Day 11)

**Goal**: Messaging, notifications, search, settings

#### Tasks:
- [ ] 10.1 Build Messaging Page
  - Conversation list
  - Chat interface
  - Message bubbles
  - Send message input
  - File attachment button

- [ ] 10.2 Build Notifications Page
  - Notification list
  - Different notification types with icons
  - Mark as read
  - Clear all button

- [ ] 10.3 Build Universal Search
  - Search bar in header
  - Search results page
  - Tabs for Courses, Jobs, Services, People
  - Filters

- [ ] 10.4 Build Settings Page
  - Profile settings
  - Notification preferences
  - Language selection
  - Privacy settings
  - Help & Support

- [ ] 10.5 Build Help & Support
  - FAQ accordion
  - Video tutorials
  - Contact form

**Deliverable**: Complete auxiliary features

---

### Phase 11: Polish & Responsiveness (Day 12)

**Goal**: Make everything beautiful and mobile-friendly

#### Tasks:
- [ ] 11.1 Mobile responsiveness
  - Test all pages on mobile viewport
  - Adjust layouts for mobile
  - Mobile navigation menu

- [ ] 11.2 Add loading states
  - Skeleton loaders for cards
  - Spinner for buttons
  - Page transitions

- [ ] 11.3 Add empty states
  - No courses enrolled
  - No jobs applied
  - No messages

- [ ] 11.4 Add error states
  - 404 page
  - Error boundaries
  - Form validation messages

- [ ] 11.5 Animations & Transitions
  - Page transitions
  - Hover effects
  - Button animations
  - Modal animations

- [ ] 11.6 Accessibility
  - ARIA labels
  - Keyboard navigation
  - Focus states
  - Alt text for images

- [ ] 11.7 Performance optimization
  - Lazy load images
  - Code splitting
  - Optimize bundle size

**Deliverable**: Polished, production-ready prototype

---

### Phase 12: Demo Data & Deployment (Day 13)

**Goal**: Rich dummy data and live deployment

#### Tasks:
- [ ] 12.1 Generate comprehensive dummy data
  - 100+ users with realistic Indian names
  - 50+ courses across all categories
  - 80+ jobs from various employers
  - 60+ service providers
  - 100+ community posts
  - 30+ government schemes
  - Realistic transactions, bookings, reviews

- [ ] 12.2 Add realistic images
  - Use placeholder images or free stock photos
  - Course thumbnails
  - Profile pictures
  - Service images
  - Achievement badges

- [ ] 12.3 Create demo user accounts
  - Learner persona (Priya)
  - Skilled worker persona (Anjali)
  - Employer persona (Boutique owner)
  - Mentor persona (Business coach)

- [ ] 12.4 Build landing page
  - Hero section with value proposition
  - Features showcase
  - Testimonials
  - Call to action
  - "Try Demo" button

- [ ] 12.5 Deploy to Vercel/Netlify
  - Build production bundle
  - Deploy to hosting
  - Configure custom domain (optional)
  - Share live link

**Deliverable**: Live, shareable prototype

---

## Key Features to Emphasize

### Visual Design Elements:
1. **Color Scheme**: Purple/Pink gradient (empowerment theme)
2. **Typography**: Clean, readable fonts (Noto Sans for multilingual)
3. **Icons**: Consistent icon set (Lucide React)
4. **Images**: High-quality, diverse women in various professions
5. **Badges**: Trust score, verification, achievements
6. **Charts**: Earnings, progress, analytics

### Interactive Elements:
1. **Smooth transitions** between pages
2. **Hover effects** on cards and buttons
3. **Loading states** for all actions
4. **Toast notifications** for user actions
5. **Modal dialogs** for forms
6. **Dropdown menus** for filters
7. **Tabs** for role switching
8. **Accordions** for FAQs and syllabus

### Realistic Touches:
1. **Indian names, locations, phone numbers**
2. **Rupee currency (₹) everywhere**
3. **Hindi/English mixed content**
4. **Local job locations (Mumbai, Delhi, Bangalore)**
5. **Realistic course durations and prices**
6. **Authentic skill categories**
7. **Government scheme names**
8. **Trust scores and ratings**

---

## Timeline Summary

- **Day 1**: Setup & Foundation
- **Day 2**: Auth & Onboarding
- **Day 3**: Dashboard & Profile
- **Day 4-5**: Learning Module (biggest module)
- **Day 6**: Jobs Marketplace
- **Day 7**: Services Marketplace
- **Day 8**: Wallet & Payments
- **Day 9**: Community Feed
- **Day 10**: Grow Module
- **Day 11**: Additional Features
- **Day 12**: Polish & Responsiveness
- **Day 13**: Demo Data & Deployment

**Total: 13 days for complete prototype**

---

## Success Criteria

✅ All 20 requirements from REQUIRED.MD are visually represented
✅ Looks like a real, production-ready website
✅ Fully responsive (mobile, tablet, desktop)
✅ Smooth, professional interactions
✅ Realistic dummy data with Indian context
✅ Can be demoed to stakeholders
✅ Can be used for user testing and feedback
✅ Serves as specification for backend development

---

## Next Steps After Prototype

1. **User Testing**: Show to target users, gather feedback
2. **Stakeholder Demo**: Present to investors/partners
3. **Backend Development**: Use this as specification
4. **Iterate**: Refine based on feedback
5. **Integration**: Connect to real APIs when ready

---

## Tools & Resources

- **Design Inspiration**: Dribbble, Behance (search "women empowerment app")
- **Stock Photos**: Unsplash, Pexels (search "Indian women working")
- **Icons**: Lucide React, Heroicons
- **Colors**: Coolors.co (generate palette)
- **Fonts**: Google Fonts (Noto Sans, Inter, Poppins)
- **Dummy Data Generator**: Faker.js (customize for Indian names)

---

Ready to start building? Let's begin with Phase 1! 🚀
