Design Document: Eka Women Empowerment Super App

## Overview

Eka is a comprehensive digital empowerment platform designed to bridge the gap between skill development and economic opportunity for women across India. The platform combines learning, skill certification, job placement, service marketplace, and community support into a unified ecosystem accessible via mobile and web interfaces.

### Core Design Principles

1. **Accessibility First**: Designed for users with varying literacy levels, internet connectivity, and technical proficiency
2. **Multilingual by Default**: All features support 10+ Indian languages with voice assistance
3. **Offline-Capable**: Critical features work without continuous internet connectivity
4. **Trust-Centric**: Built-in verification, ratings, and safety mechanisms throughout
5. **Progressive Enhancement**: Basic features work on low-end devices, enhanced features on capable devices
6. **Modular Architecture**: Independent modules (LEARN, BUILD, EARN, GROW) that integrate seamlessly

### System Architecture

The platform follows a microservices architecture with the following high-level components:

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Mobile App   │  │  Web App     │  │  Admin Panel │      │
│  │ (React Native)│  │  (React)     │  │  (React)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway Layer                        │
│              (Kong / AWS API Gateway)                        │
│         - Authentication  - Rate Limiting                    │
│         - Routing         - Load Balancing                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Microservices Layer                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  Auth    │ │  User    │ │ Learning │ │  Jobs    │      │
│  │ Service  │ │ Service  │ │ Service  │ │ Service  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Services │ │ Payment  │ │Community │ │Analytics │      │
│  │Marketplace│ │ Service  │ │ Service  │ │ Service  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │   MongoDB    │  │    Redis     │      │
│  │ (Relational) │  │  (Documents) │  │   (Cache)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │      S3      │  │ Elasticsearch│                        │
│  │   (Media)    │  │   (Search)   │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  External Services                           │
│  - Payment Gateway (Razorpay/Paytm)                         │
│  - SMS Gateway (Twilio/MSG91)                               │
│  - Cloud Storage (AWS S3/CloudFront)                        │
│  - AI/ML Services (AWS SageMaker/Google AI)                 │
│  - Video Streaming (AWS MediaConvert/Cloudflare Stream)     │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend

**Mobile Application (React Native)**
- Framework: React Native 0.72+
- State Management: Redux Toolkit with RTK Query
- Navigation: React Navigation 6.x
- UI Components: React Native Paper + Custom Components
- Offline Storage: AsyncStorage + WatermelonDB
- Media: React Native Video, React Native Image Picker
- Voice: React Native Voice, React Native TTS
- Maps: React Native Maps
- Push Notifications: React Native Firebase

**Web Application (React)**
- Framework: React 18+ with TypeScript
- Build Tool: Vite
- State Management: Redux Toolkit with RTK Query
- UI Framework: Material-UI (MUI) v5
- Routing: React Router v6
- Forms: React Hook Form + Zod validation
- Charts: Recharts
- Rich Text: Draft.js or Slate

**Admin Panel (React)**
- Same stack as Web Application
- Additional: AG Grid for data tables, React Admin framework

### Backend

**API Services (Node.js/Python)**
- Runtime: Node.js 18+ LTS (primary) / Python 3.11+ (ML services)
- Framework: Express.js / NestJS (Node) or FastAPI (Python)
- API Documentation: OpenAPI 3.0 / Swagger
- Validation: Joi / Zod (Node) or Pydantic (Python)
- Authentication: JWT with refresh tokens
- Real-time: Socket.io / WebSockets

**Databases**
- Primary DB: PostgreSQL 15+ (user data, transactions, structured data)
- Document Store: MongoDB 6+ (course content, community posts, flexible schemas)
- Cache: Redis 7+ (sessions, rate limiting, real-time data)
- Search: Elasticsearch 8+ (full-text search across courses, jobs, services)
- Analytics: ClickHouse or TimescaleDB (time-series analytics)

**Infrastructure**
- Cloud Provider: AWS (primary) with multi-region support
- Container Orchestration: Kubernetes (EKS)
- API Gateway: Kong or AWS API Gateway
- CDN: CloudFront
- Message Queue: RabbitMQ or AWS SQS
- Object Storage: AWS S3
- Video Processing: AWS MediaConvert or Cloudflare Stream

**DevOps & Monitoring**
- CI/CD: GitHub Actions or GitLab CI
- Monitoring: Prometheus + Grafana
- Logging: ELK Stack (Elasticsearch, Logstash, Kibana)
- Error Tracking: Sentry
- APM: New Relic or DataDog

### AI/ML Services

- Speech Recognition: Google Cloud Speech-to-Text (multilingual)
- Text-to-Speech: Google Cloud TTS or AWS Polly
- Translation: Google Cloud Translation API
- Recommendation Engine: Custom ML models (TensorFlow/PyTorch) on AWS SageMaker
- Content Moderation: AWS Rekognition + Custom NLP models
- Chatbot: Dialogflow or Rasa

## Architecture

### Client Architecture

**Mobile App Structure**
```
src/
├── app/
│   ├── store/           # Redux store configuration
│   ├── navigation/      # Navigation configuration
│   └── App.tsx          # Root component
├── features/
│   ├── auth/            # Authentication module
│   ├── profile/         # User profile management
│   ├── learning/        # Learning module (LEARN)
│   ├── skills/          # Skill building (BUILD)
│   ├── jobs/            # Job marketplace (EARN)
│   ├── services/        # Service marketplace (EARN)
│   ├── community/       # Shakti Feed
│   ├── grow/            # Entrepreneurship (GROW)
│   ├── wallet/          # Payment & wallet
│   └── notifications/   # Notification system
├── shared/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── api/             # API client configuration
│   └── types/           # TypeScript type definitions
├── assets/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── locales/         # i18n translation files
└── services/
    ├── offline/         # Offline sync service
    ├── voice/           # Voice assistant service
    └── analytics/       # Analytics tracking
```

### Backend Microservices Architecture

Each microservice follows a layered architecture:

```
service/
├── src/
│   ├── controllers/     # HTTP request handlers
│   ├── services/        # Business logic
│   ├── repositories/    # Data access layer
│   ├── models/          # Data models/schemas
│   ├── middleware/      # Express middleware
│   ├── validators/      # Input validation
│   ├── utils/           # Utility functions
│   └── config/          # Configuration
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── docs/
    └── api.yaml         # OpenAPI specification
```

### Service Communication

- **Synchronous**: REST APIs via API Gateway (for client-server communication)
- **Asynchronous**: Message queues (RabbitMQ/SQS) for inter-service communication
- **Real-time**: WebSocket connections for chat, notifications, live updates
- **Event-Driven**: Event bus for domain events (user registered, course completed, etc.)


## Components and Interfaces

### 1. Authentication Service

**Responsibilities:**
- OTP generation and verification
- JWT token management (access + refresh tokens)
- Session management
- Rate limiting for authentication attempts

**Key Interfaces:**

```typescript
interface AuthService {
  sendOTP(phoneNumber: string, language: string): Promise<OTPResponse>
  verifyOTP(phoneNumber: string, otp: string): Promise<AuthTokens>
  refreshToken(refreshToken: string): Promise<AuthTokens>
  logout(userId: string, deviceId: string): Promise<void>
  validateToken(token: string): Promise<TokenPayload>
}

interface OTPResponse {
  success: boolean
  expiresAt: Date
  attemptsRemaining: number
}

interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

interface TokenPayload {
  userId: string
  roles: UserRole[]
  sessionId: string
}
```

**API Endpoints:**
- `POST /api/v1/auth/send-otp` - Send OTP to phone number
- `POST /api/v1/auth/verify-otp` - Verify OTP and return tokens
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Invalidate session

### 2. User Service

**Responsibilities:**
- User profile management
- Role management (multi-role support)
- Verification workflow
- Trust score calculation
- Profile visibility settings

**Key Interfaces:**

```typescript
interface UserService {
  createProfile(userId: string, data: OnboardingData): Promise<UserProfile>
  updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile>
  getProfile(userId: string, viewerId?: string): Promise<UserProfile>
  addRole(userId: string, role: UserRole): Promise<void>
  removeRole(userId: string, role: UserRole): Promise<void>
  requestVerification(userId: string, documents: VerificationDocs): Promise<VerificationRequest>
  updateTrustScore(userId: string): Promise<number>
}

interface UserProfile {
  id: string
  phoneNumber: string
  name: string
  age: number
  location: Location
  languages: string[]
  roles: UserRole[]
  skills: Skill[]
  interests: string[]
  education: EducationLevel
  workPreference: WorkPreference
  profileImage?: string
  verificationStatus: VerificationStatus
  trustScore: number
  badges: Badge[]
  createdAt: Date
  updatedAt: Date
}

interface Location {
  state: string
  district: string
  pincode: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

enum UserRole {
  LEARNER = 'learner',
  SKILLED_WORKER = 'skilled_worker',
  MENTOR = 'mentor',
  EMPLOYER = 'employer',
  CUSTOMER = 'customer'
}

enum VerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected'
}
```

**API Endpoints:**
- `POST /api/v1/users/profile` - Create user profile
- `GET /api/v1/users/:userId` - Get user profile
- `PATCH /api/v1/users/:userId` - Update user profile
- `POST /api/v1/users/:userId/roles` - Add role
- `DELETE /api/v1/users/:userId/roles/:role` - Remove role
- `POST /api/v1/users/:userId/verification` - Request verification
- `GET /api/v1/users/:userId/trust-score` - Get trust score

### 3. Learning Service

**Responsibilities:**
- Course catalog management
- Course enrollment and access control
- Progress tracking
- Content delivery (video streaming)
- Quiz and assessment management
- Certificate generation
- Offline content management

**Key Interfaces:**

```typescript
interface LearningService {
  getCourses(filters: CourseFilters, pagination: Pagination): Promise<CoursePage>
  getCourse(courseId: string, userId?: string): Promise<CourseDetail>
  enrollCourse(userId: string, courseId: string): Promise<Enrollment>
  getEnrollments(userId: string): Promise<Enrollment[]>
  updateProgress(userId: string, courseId: string, lessonId: string): Promise<Progress>
  submitQuiz(userId: string, quizId: string, answers: Answer[]): Promise<QuizResult>
  generateCertificate(userId: string, courseId: string): Promise<Certificate>
  downloadLesson(userId: string, lessonId: string): Promise<DownloadInfo>
  getRecommendations(userId: string, limit: number): Promise<Course[]>
}

interface Course {
  id: string
  title: string
  description: string
  category: CourseCategory
  level: SkillLevel
  duration: number // minutes
  language: string
  instructor: InstructorInfo
  thumbnail: string
  price: number // 0 for free
  rating: number
  enrollmentCount: number
  syllabus: Lesson[]
  prerequisites: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface Lesson {
  id: string
  title: string
  description: string
  type: LessonType // video, text, quiz, assignment
  duration: number
  videoUrl?: string
  content?: string
  quiz?: Quiz
  order: number
  downloadable: boolean
}

interface Enrollment {
  id: string
  userId: string
  courseId: string
  progress: number // 0-100
  completedLessons: string[]
  currentLesson?: string
  startedAt: Date
  completedAt?: Date
  certificateId?: string
}

interface Progress {
  courseId: string
  totalLessons: number
  completedLessons: number
  percentage: number
  timeSpent: number // minutes
  lastAccessedAt: Date
}

enum CourseCategory {
  SEWING = 'sewing',
  COOKING = 'cooking',
  BEAUTY = 'beauty',
  TEACHING = 'teaching',
  DIGITAL = 'digital',
  FARMING = 'farming',
  CRAFT = 'craft',
  MEDICAL_SUPPORT = 'medical_support',
  BUSINESS = 'business'
}

enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}
```

**API Endpoints:**
- `GET /api/v1/courses` - List courses with filters
- `GET /api/v1/courses/:courseId` - Get course details
- `POST /api/v1/courses/:courseId/enroll` - Enroll in course
- `GET /api/v1/users/:userId/enrollments` - Get user enrollments
- `POST /api/v1/courses/:courseId/lessons/:lessonId/progress` - Update progress
- `POST /api/v1/quizzes/:quizId/submit` - Submit quiz
- `POST /api/v1/courses/:courseId/certificate` - Generate certificate
- `GET /api/v1/courses/recommendations` - Get personalized recommendations

### 4. Skills Service (BUILD Module)

**Responsibilities:**
- Skill assessment management
- Badge issuance
- Portfolio management
- Practice task submission and review
- Resume generation
- Mentor-learner matching

**Key Interfaces:**

```typescript
interface SkillsService {
  submitPracticeTask(userId: string, taskId: string, submission: Submission): Promise<TaskSubmission>
  reviewSubmission(mentorId: string, submissionId: string, feedback: Feedback): Promise<void>
  takeAssessment(userId: string, assessmentId: string, answers: Answer[]): Promise<AssessmentResult>
  awardBadge(userId: string, badgeId: string): Promise<Badge>
  createPortfolioItem(userId: string, item: PortfolioItem): Promise<PortfolioItem>
  generateResume(userId: string, template: string): Promise<ResumeDocument>
  requestMentor(userId: string, skillArea: string): Promise<MentorMatch>
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: CourseCategory
  level: SkillLevel
  issuedAt: Date
  verificationId?: string
}

interface PortfolioItem {
  id: string
  userId: string
  title: string
  description: string
  category: CourseCategory
  media: MediaFile[]
  createdAt: Date
}

interface TaskSubmission {
  id: string
  userId: string
  taskId: string
  content: string
  attachments: MediaFile[]
  status: SubmissionStatus
  feedback?: Feedback
  submittedAt: Date
  reviewedAt?: Date
}

enum SubmissionStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REVISION_REQUESTED = 'revision_requested'
}
```

**API Endpoints:**
- `POST /api/v1/skills/tasks/:taskId/submit` - Submit practice task
- `POST /api/v1/skills/submissions/:submissionId/review` - Review submission
- `POST /api/v1/skills/assessments/:assessmentId/take` - Take assessment
- `POST /api/v1/skills/portfolio` - Create portfolio item
- `GET /api/v1/skills/portfolio/:userId` - Get user portfolio
- `POST /api/v1/skills/resume/generate` - Generate resume
- `POST /api/v1/skills/mentor/request` - Request mentor

### 5. Jobs Service (EARN Module - Jobs)

**Responsibilities:**
- Job posting management
- Job search and filtering
- Application management
- Job recommendations
- Employer verification

**Key Interfaces:**

```typescript
interface JobsService {
  createJob(employerId: string, job: JobData): Promise<Job>
  getJobs(filters: JobFilters, pagination: Pagination): Promise<JobPage>
  getJob(jobId: string): Promise<JobDetail>
  applyForJob(userId: string, jobId: string, application: Application): Promise<JobApplication>
  getApplications(userId: string): Promise<JobApplication[]>
  reviewApplication(employerId: string, applicationId: string, decision: ApplicationDecision): Promise<void>
  getRecommendations(userId: string, limit: number): Promise<Job[]>
}

interface Job {
  id: string
  employerId: string
  employer: EmployerInfo
  title: string
  description: string
  category: CourseCategory
  location: Location
  locationType: LocationType // onsite, remote, hybrid
  salaryRange: SalaryRange
  experienceRequired: string
  skillsRequired: string[]
  educationRequired: EducationLevel
  jobType: JobType // full_time, part_time, contract, freelance
  openings: number
  status: JobStatus
  postedAt: Date
  expiresAt: Date
}

interface JobApplication {
  id: string
  jobId: string
  userId: string
  applicant: UserProfile
  coverLetter?: string
  resumeUrl: string
  status: ApplicationStatus
  appliedAt: Date
  reviewedAt?: Date
}

enum JobStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  ACTIVE = 'active',
  CLOSED = 'closed',
  EXPIRED = 'expired'
}

enum ApplicationStatus {
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  SHORTLISTED = 'shortlisted',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted'
}
```

**API Endpoints:**
- `POST /api/v1/jobs` - Create job posting
- `GET /api/v1/jobs` - List jobs with filters
- `GET /api/v1/jobs/:jobId` - Get job details
- `POST /api/v1/jobs/:jobId/apply` - Apply for job
- `GET /api/v1/users/:userId/applications` - Get user applications
- `PATCH /api/v1/applications/:applicationId` - Update application status
- `GET /api/v1/jobs/recommendations` - Get job recommendations


### 6. Services Marketplace Service (EARN Module - Services)

**Responsibilities:**
- Service listing management
- Service search and discovery
- Booking management
- Service provider profiles
- Customer-provider matching

**Key Interfaces:**

```typescript
interface ServicesMarketplaceService {
  createServiceListing(userId: string, service: ServiceData): Promise<ServiceListing>
  getServices(filters: ServiceFilters, pagination: Pagination): Promise<ServicePage>
  getService(serviceId: string): Promise<ServiceDetail>
  bookService(customerId: string, serviceId: string, booking: BookingData): Promise<Booking>
  acceptBooking(providerId: string, bookingId: string): Promise<Booking>
  rejectBooking(providerId: string, bookingId: string, reason: string): Promise<void>
  completeService(bookingId: string): Promise<void>
  getBookings(userId: string, role: 'provider' | 'customer'): Promise<Booking[]>
}

interface ServiceListing {
  id: string
  providerId: string
  provider: ServiceProviderProfile
  category: CourseCategory
  title: string
  description: string
  pricing: PricingModel
  serviceArea: ServiceArea
  availability: Availability
  duration: number // minutes
  images: string[]
  rating: number
  reviewCount: number
  completedJobs: number
  status: ServiceStatus
  createdAt: Date
}

interface ServiceProviderProfile {
  userId: string
  name: string
  profileImage: string
  verificationStatus: VerificationStatus
  trustScore: number
  badges: Badge[]
  skills: Skill[]
  experience: string
  languages: string[]
}

interface Booking {
  id: string
  serviceId: string
  customerId: string
  providerId: string
  scheduledDate: Date
  scheduledTime: string
  location: Location
  status: BookingStatus
  price: number
  paymentStatus: PaymentStatus
  notes?: string
  createdAt: Date
  confirmedAt?: Date
  completedAt?: Date
}

interface PricingModel {
  type: PricingType // fixed, hourly, custom
  amount: number
  currency: string
  negotiable: boolean
}

interface ServiceArea {
  type: 'radius' | 'specific_locations'
  center?: Location
  radius?: number // km
  locations?: Location[]
}

enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

enum ServiceStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  INACTIVE = 'inactive'
}
```

**API Endpoints:**
- `POST /api/v1/services` - Create service listing
- `GET /api/v1/services` - List services with filters
- `GET /api/v1/services/:serviceId` - Get service details
- `POST /api/v1/services/:serviceId/book` - Book a service
- `POST /api/v1/bookings/:bookingId/accept` - Accept booking
- `POST /api/v1/bookings/:bookingId/reject` - Reject booking
- `POST /api/v1/bookings/:bookingId/complete` - Mark service complete
- `GET /api/v1/users/:userId/bookings` - Get user bookings

### 7. Payment Service

**Responsibilities:**
- Payment processing
- Wallet management
- Transaction history
- Withdrawal processing
- Payment gateway integration
- Dispute management

**Key Interfaces:**

```typescript
interface PaymentService {
  initiatePayment(userId: string, payment: PaymentData): Promise<PaymentIntent>
  processPayment(paymentId: string, gatewayResponse: GatewayResponse): Promise<Transaction>
  getWalletBalance(userId: string): Promise<WalletBalance>
  getTransactions(userId: string, filters: TransactionFilters): Promise<Transaction[]>
  requestWithdrawal(userId: string, amount: number, bankDetails: BankDetails): Promise<Withdrawal>
  processWithdrawal(withdrawalId: string): Promise<void>
  raiseDispute(userId: string, transactionId: string, reason: string): Promise<Dispute>
  resolveDispute(disputeId: string, resolution: DisputeResolution): Promise<void>
}

interface Transaction {
  id: string
  userId: string
  type: TransactionType
  amount: number
  currency: string
  status: TransactionStatus
  description: string
  referenceId: string // booking/course/service ID
  referenceType: string // booking/enrollment/service
  paymentMethod: PaymentMethod
  gatewayTransactionId?: string
  platformFee: number
  netAmount: number
  createdAt: Date
  completedAt?: Date
}

interface WalletBalance {
  userId: string
  balance: number
  currency: string
  pendingAmount: number
  totalEarnings: number
  totalWithdrawals: number
  lastUpdated: Date
}

interface Withdrawal {
  id: string
  userId: string
  amount: number
  bankDetails: BankDetails
  status: WithdrawalStatus
  requestedAt: Date
  processedAt?: Date
  transactionId?: string
}

enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  REFUND = 'refund',
  WITHDRAWAL = 'withdrawal',
  PLATFORM_FEE = 'platform_fee'
}

enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

enum PaymentMethod {
  UPI = 'upi',
  CARD = 'card',
  NET_BANKING = 'net_banking',
  WALLET = 'wallet'
}

enum WithdrawalStatus {
  REQUESTED = 'requested',
  APPROVED = 'approved',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}
```

**API Endpoints:**
- `POST /api/v1/payments/initiate` - Initiate payment
- `POST /api/v1/payments/:paymentId/process` - Process payment callback
- `GET /api/v1/wallet/:userId` - Get wallet balance
- `GET /api/v1/transactions` - Get transaction history
- `POST /api/v1/withdrawals` - Request withdrawal
- `GET /api/v1/withdrawals/:userId` - Get withdrawal history
- `POST /api/v1/disputes` - Raise dispute
- `PATCH /api/v1/disputes/:disputeId` - Resolve dispute

### 8. Community Service (Shakti Feed)

**Responsibilities:**
- Post creation and management
- Feed generation and ranking
- Engagement tracking (likes, comments)
- Content moderation
- Trending content identification
- Motivational notifications

**Key Interfaces:**

```typescript
interface CommunityService {
  createPost(userId: string, post: PostData): Promise<Post>
  getFeed(userId: string, pagination: Pagination): Promise<FeedPage>
  getTrendingPosts(limit: number): Promise<Post[]>
  likePost(userId: string, postId: string): Promise<void>
  unlikePost(userId: string, postId: string): Promise<void>
  commentOnPost(userId: string, postId: string, comment: CommentData): Promise<Comment>
  reportPost(userId: string, postId: string, reason: string): Promise<Report>
  deletePost(userId: string, postId: string): Promise<void>
  suggestAchievementPost(userId: string, achievement: Achievement): Promise<PostSuggestion>
}

interface Post {
  id: string
  userId: string
  author: UserProfile
  type: PostType
  content: string
  media: MediaFile[]
  achievement?: Achievement
  likeCount: number
  commentCount: number
  isLikedByUser: boolean
  visibility: PostVisibility
  status: PostStatus
  createdAt: Date
  updatedAt: Date
}

interface Comment {
  id: string
  postId: string
  userId: string
  author: UserProfile
  content: string
  createdAt: Date
}

interface Achievement {
  type: AchievementType
  title: string
  description: string
  icon: string
  metadata: Record<string, any>
}

enum PostType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  ACHIEVEMENT = 'achievement',
  MILESTONE = 'milestone'
}

enum AchievementType {
  FIRST_EARNING = 'first_earning',
  COURSE_COMPLETED = 'course_completed',
  BADGE_EARNED = 'badge_earned',
  JOB_SECURED = 'job_secured',
  SERVICE_MILESTONE = 'service_milestone',
  MENTOR_MILESTONE = 'mentor_milestone'
}

enum PostVisibility {
  PUBLIC = 'public',
  FOLLOWERS = 'followers',
  PRIVATE = 'private'
}

enum PostStatus {
  PUBLISHED = 'published',
  FLAGGED = 'flagged',
  REMOVED = 'removed'
}
```

**API Endpoints:**
- `POST /api/v1/community/posts` - Create post
- `GET /api/v1/community/feed` - Get personalized feed
- `GET /api/v1/community/trending` - Get trending posts
- `POST /api/v1/community/posts/:postId/like` - Like post
- `DELETE /api/v1/community/posts/:postId/like` - Unlike post
- `POST /api/v1/community/posts/:postId/comments` - Add comment
- `POST /api/v1/community/posts/:postId/report` - Report post
- `DELETE /api/v1/community/posts/:postId` - Delete post

### 9. Grow Service (Entrepreneurship Module)

**Responsibilities:**
- Business course management
- Government scheme information
- Business mentor matching
- Resource library
- Growth analytics
- Microfinance partner integration

**Key Interfaces:**

```typescript
interface GrowService {
  getBusinessCourses(filters: CourseFilters): Promise<Course[]>
  getGovernmentSchemes(filters: SchemeFilters): Promise<Scheme[]>
  getBusinessMentors(filters: MentorFilters): Promise<Mentor[]>
  requestBusinessMentor(userId: string, businessType: string): Promise<MentorMatch>
  getResources(category: ResourceCategory): Promise<Resource[]>
  trackBusinessGoal(userId: string, goal: BusinessGoal): Promise<GoalTracking>
  getGrowthAnalytics(userId: string): Promise<GrowthAnalytics>
}

interface Scheme {
  id: string
  name: string
  description: string
  provider: string // government body
  eligibility: EligibilityCriteria
  benefits: string[]
  applicationLink: string
  deadline?: Date
  category: SchemeCategory
  targetAudience: string[]
}

interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  category: ResourceCategory
  url: string
  language: string
  createdAt: Date
}

interface BusinessGoal {
  id: string
  userId: string
  title: string
  description: string
  targetDate: Date
  milestones: Milestone[]
  status: GoalStatus
}

interface GrowthAnalytics {
  userId: string
  coursesCompleted: number
  mentoringSessions: number
  businessPlansCreated: number
  schemesApplied: number
  goalsAchieved: number
  progressOverTime: TimeSeriesData[]
}

enum SchemeCategory {
  LOAN = 'loan',
  GRANT = 'grant',
  TRAINING = 'training',
  SUBSIDY = 'subsidy',
  INSURANCE = 'insurance'
}

enum ResourceType {
  ARTICLE = 'article',
  VIDEO = 'video',
  TEMPLATE = 'template',
  GUIDE = 'guide',
  TOOL = 'tool'
}
```

**API Endpoints:**
- `GET /api/v1/grow/courses` - Get business courses
- `GET /api/v1/grow/schemes` - Get government schemes
- `GET /api/v1/grow/mentors` - Get business mentors
- `POST /api/v1/grow/mentor/request` - Request business mentor
- `GET /api/v1/grow/resources` - Get resources
- `POST /api/v1/grow/goals` - Create business goal
- `GET /api/v1/grow/analytics/:userId` - Get growth analytics


### 10. Notification Service

**Responsibilities:**
- Push notification delivery
- In-app notification management
- Email notifications
- SMS notifications
- Notification preferences
- Notification scheduling

**Key Interfaces:**

```typescript
interface NotificationService {
  sendNotification(userId: string, notification: NotificationData): Promise<void>
  sendBulkNotifications(userIds: string[], notification: NotificationData): Promise<void>
  getNotifications(userId: string, filters: NotificationFilters): Promise<Notification[]>
  markAsRead(userId: string, notificationId: string): Promise<void>
  markAllAsRead(userId: string): Promise<void>
  updatePreferences(userId: string, preferences: NotificationPreferences): Promise<void>
  scheduleNotification(notification: ScheduledNotification): Promise<void>
}

interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  body: string
  data: Record<string, any>
  priority: NotificationPriority
  isRead: boolean
  createdAt: Date
  readAt?: Date
}

interface NotificationPreferences {
  userId: string
  channels: {
    push: boolean
    email: boolean
    sms: boolean
    inApp: boolean
  }
  categories: {
    [key in NotificationCategory]: boolean
  }
}

enum NotificationType {
  MESSAGE = 'message',
  JOB_MATCH = 'job_match',
  BOOKING = 'booking',
  PAYMENT = 'payment',
  ACHIEVEMENT = 'achievement',
  COURSE_UPDATE = 'course_update',
  COMMUNITY = 'community',
  SYSTEM = 'system'
}

enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}
```

**API Endpoints:**
- `POST /api/v1/notifications/send` - Send notification
- `GET /api/v1/notifications` - Get user notifications
- `PATCH /api/v1/notifications/:notificationId/read` - Mark as read
- `PATCH /api/v1/notifications/read-all` - Mark all as read
- `GET /api/v1/notifications/preferences` - Get preferences
- `PUT /api/v1/notifications/preferences` - Update preferences

### 11. Search Service

**Responsibilities:**
- Full-text search across courses, jobs, services, users
- Autocomplete suggestions
- Fuzzy matching
- Voice search processing
- Search analytics

**Key Interfaces:**

```typescript
interface SearchService {
  search(query: string, filters: SearchFilters): Promise<SearchResults>
  autocomplete(query: string, type: SearchType): Promise<Suggestion[]>
  voiceSearch(audioData: Buffer, language: string): Promise<SearchResults>
  indexDocument(type: string, id: string, document: any): Promise<void>
  deleteDocument(type: string, id: string): Promise<void>
  logSearch(userId: string, query: string, results: number): Promise<void>
}

interface SearchResults {
  courses: Course[]
  jobs: Job[]
  services: ServiceListing[]
  users: UserProfile[]
  totalResults: number
  query: string
  suggestions: string[]
}

interface SearchFilters {
  type?: SearchType[]
  category?: string[]
  location?: Location
  priceRange?: PriceRange
  rating?: number
  language?: string[]
  sortBy?: SortOption
}

enum SearchType {
  COURSES = 'courses',
  JOBS = 'jobs',
  SERVICES = 'services',
  USERS = 'users',
  ALL = 'all'
}
```

**API Endpoints:**
- `GET /api/v1/search` - Universal search
- `GET /api/v1/search/autocomplete` - Autocomplete suggestions
- `POST /api/v1/search/voice` - Voice search
- `POST /api/v1/search/index` - Index document (internal)

### 12. Analytics Service

**Responsibilities:**
- User activity tracking
- Dashboard metrics
- Business intelligence
- Reporting
- A/B testing
- Performance monitoring

**Key Interfaces:**

```typescript
interface AnalyticsService {
  trackEvent(userId: string, event: AnalyticsEvent): Promise<void>
  getUserAnalytics(userId: string, timeRange: TimeRange): Promise<UserAnalytics>
  getPlatformAnalytics(timeRange: TimeRange): Promise<PlatformAnalytics>
  generateReport(reportType: ReportType, params: ReportParams): Promise<Report>
  getRecommendationMetrics(userId: string): Promise<RecommendationMetrics>
}

interface UserAnalytics {
  userId: string
  learningProgress: LearningMetrics
  earningMetrics: EarningMetrics
  engagementMetrics: EngagementMetrics
  timeRange: TimeRange
}

interface LearningMetrics {
  coursesEnrolled: number
  coursesCompleted: number
  timeSpentLearning: number // minutes
  badgesEarned: number
  averageQuizScore: number
  completionRate: number
}

interface EarningMetrics {
  totalEarnings: number
  jobsApplied: number
  servicesBooked: number
  averageRating: number
  repeatCustomers: number
  monthlyTrend: TimeSeriesData[]
}

interface EngagementMetrics {
  loginFrequency: number
  postsCreated: number
  commentsPosted: number
  likesGiven: number
  sessionsPerWeek: number
  averageSessionDuration: number
}

interface PlatformAnalytics {
  userGrowth: TimeSeriesData[]
  activeUsers: number
  courseCompletionRate: number
  jobPlacementRate: number
  revenueMetrics: RevenueMetrics
  topCategories: CategoryMetrics[]
  geographicDistribution: GeoMetrics[]
}
```

**API Endpoints:**
- `POST /api/v1/analytics/track` - Track event
- `GET /api/v1/analytics/user/:userId` - Get user analytics
- `GET /api/v1/analytics/platform` - Get platform analytics (admin)
- `POST /api/v1/analytics/report` - Generate report

### 13. Admin Service

**Responsibilities:**
- Content moderation
- User management
- Verification approval
- System configuration
- Report management
- Platform monitoring

**Key Interfaces:**

```typescript
interface AdminService {
  reviewContent(adminId: string, contentId: string, decision: ModerationDecision): Promise<void>
  reviewVerification(adminId: string, verificationId: string, decision: VerificationDecision): Promise<void>
  suspendUser(adminId: string, userId: string, reason: string, duration?: number): Promise<void>
  approveJob(adminId: string, jobId: string): Promise<void>
  approveCourse(adminId: string, courseId: string): Promise<void>
  getReports(filters: ReportFilters): Promise<Report[]>
  resolveReport(adminId: string, reportId: string, action: ReportAction): Promise<void>
  manageCategories(action: CategoryAction): Promise<void>
  getSystemMetrics(): Promise<SystemMetrics>
}

interface ModerationDecision {
  action: ModerationAction
  reason?: string
  notes?: string
}

enum ModerationAction {
  APPROVE = 'approve',
  REJECT = 'reject',
  REMOVE = 'remove',
  FLAG = 'flag',
  REQUEST_CHANGES = 'request_changes'
}

interface Report {
  id: string
  reporterId: string
  reportedUserId?: string
  reportedContentId?: string
  contentType: string
  reason: string
  description: string
  status: ReportStatus
  priority: ReportPriority
  createdAt: Date
  resolvedAt?: Date
  resolution?: string
}

enum ReportStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed'
}
```

**API Endpoints:**
- `POST /api/v1/admin/content/:contentId/review` - Review content
- `POST /api/v1/admin/verification/:verificationId/review` - Review verification
- `POST /api/v1/admin/users/:userId/suspend` - Suspend user
- `GET /api/v1/admin/reports` - Get reports
- `POST /api/v1/admin/reports/:reportId/resolve` - Resolve report
- `GET /api/v1/admin/metrics` - Get system metrics

### 14. Messaging Service

**Responsibilities:**
- Real-time chat
- Message encryption
- Message history
- File sharing
- Read receipts
- Typing indicators

**Key Interfaces:**

```typescript
interface MessagingService {
  sendMessage(senderId: string, recipientId: string, message: MessageData): Promise<Message>
  getConversations(userId: string): Promise<Conversation[]>
  getMessages(conversationId: string, pagination: Pagination): Promise<Message[]>
  markAsRead(userId: string, messageId: string): Promise<void>
  blockUser(userId: string, blockedUserId: string): Promise<void>
  unblockUser(userId: string, blockedUserId: string): Promise<void>
}

interface Message {
  id: string
  conversationId: string
  senderId: string
  recipientId: string
  content: string
  type: MessageType
  attachments: MediaFile[]
  isRead: boolean
  isEncrypted: boolean
  sentAt: Date
  readAt?: Date
}

interface Conversation {
  id: string
  participants: string[]
  lastMessage: Message
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  FILE = 'file'
}
```

**API Endpoints:**
- `POST /api/v1/messages` - Send message
- `GET /api/v1/conversations` - Get conversations
- `GET /api/v1/conversations/:conversationId/messages` - Get messages
- `PATCH /api/v1/messages/:messageId/read` - Mark as read
- `POST /api/v1/users/:userId/block` - Block user

### 15. Voice Assistant Service

**Responsibilities:**
- Speech-to-text conversion
- Text-to-speech conversion
- Voice command processing
- Multilingual voice support
- Voice navigation

**Key Interfaces:**

```typescript
interface VoiceAssistantService {
  speechToText(audioData: Buffer, language: string): Promise<TranscriptionResult>
  textToSpeech(text: string, language: string, voice: VoiceProfile): Promise<AudioBuffer>
  processVoiceCommand(userId: string, command: string): Promise<CommandResult>
  getVoiceProfiles(language: string): Promise<VoiceProfile[]>
}

interface TranscriptionResult {
  text: string
  confidence: number
  language: string
  alternatives: string[]
}

interface VoiceProfile {
  id: string
  name: string
  language: string
  gender: 'male' | 'female'
  accent: string
}

interface CommandResult {
  action: string
  parameters: Record<string, any>
  response: string
  success: boolean
}
```

**API Endpoints:**
- `POST /api/v1/voice/speech-to-text` - Convert speech to text
- `POST /api/v1/voice/text-to-speech` - Convert text to speech
- `POST /api/v1/voice/command` - Process voice command
- `GET /api/v1/voice/profiles` - Get voice profiles


## Data Models

### Database Schema Design

The platform uses a polyglot persistence approach:
- **PostgreSQL**: Structured data (users, transactions, bookings)
- **MongoDB**: Semi-structured data (courses, posts, content)
- **Redis**: Cache and session data
- **Elasticsearch**: Search indices

### PostgreSQL Schema

**users table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  profile_image TEXT,
  verification_status VARCHAR(20) DEFAULT 'unverified',
  trust_score DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_verification ON users(verification_status);
CREATE INDEX idx_users_trust_score ON users(trust_score);
```

**user_roles table**
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, role)
);

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);
```

**user_locations table**
```sql
CREATE TABLE user_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  state VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  pincode VARCHAR(10),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  is_primary BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_locations_user_id ON user_locations(user_id);
CREATE INDEX idx_user_locations_coordinates ON user_locations USING GIST(
  ll_to_earth(latitude, longitude)
);
```

**user_skills table**
```sql
CREATE TABLE user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  level VARCHAR(20),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX idx_user_skills_category ON user_skills(category);
```

**badges table**
```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon TEXT,
  category VARCHAR(50),
  level VARCHAR(20),
  criteria JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_badges_category ON badges(category);
```

**user_badges table**
```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id),
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verification_id UUID,
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
```

**enrollments table**
```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL,
  progress INTEGER DEFAULT 0,
  completed_lessons JSONB DEFAULT '[]',
  current_lesson UUID,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  certificate_id UUID,
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_progress ON enrollments(progress);
```

**jobs table**
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50),
  location_id UUID REFERENCES user_locations(id),
  location_type VARCHAR(20),
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  experience_required TEXT,
  skills_required JSONB,
  education_required VARCHAR(50),
  job_type VARCHAR(50),
  openings INTEGER DEFAULT 1,
  status VARCHAR(20) DEFAULT 'pending_approval',
  posted_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_jobs_employer_id ON jobs(employer_id);
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_location_id ON jobs(location_id);
CREATE INDEX idx_jobs_posted_at ON jobs(posted_at DESC);
```

**job_applications table**
```sql
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cover_letter TEXT,
  resume_url TEXT,
  status VARCHAR(20) DEFAULT 'submitted',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  UNIQUE(job_id, user_id)
);

CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
```

**service_listings table**
```sql
CREATE TABLE service_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  pricing_type VARCHAR(20),
  price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'INR',
  negotiable BOOLEAN DEFAULT false,
  service_area_type VARCHAR(20),
  service_area_data JSONB,
  duration INTEGER,
  images JSONB DEFAULT '[]',
  rating DECIMAL(3,2) DEFAULT 0.00,
  review_count INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_service_listings_provider_id ON service_listings(provider_id);
CREATE INDEX idx_service_listings_category ON service_listings(category);
CREATE INDEX idx_service_listings_status ON service_listings(status);
CREATE INDEX idx_service_listings_rating ON service_listings(rating DESC);
```

**bookings table**
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES service_listings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES users(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  location_id UUID REFERENCES user_locations(id),
  status VARCHAR(20) DEFAULT 'pending',
  price DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL
);

CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_provider_id ON bookings(provider_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_date ON bookings(scheduled_date);
```

**transactions table**
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  status VARCHAR(20) DEFAULT 'pending',
  description TEXT,
  reference_id UUID,
  reference_type VARCHAR(50),
  payment_method VARCHAR(50),
  gateway_transaction_id VARCHAR(255),
  platform_fee DECIMAL(10,2) DEFAULT 0.00,
  net_amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_reference ON transactions(reference_id, reference_type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
```

**wallets table**
```sql
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  balance DECIMAL(10,2) DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'INR',
  pending_amount DECIMAL(10,2) DEFAULT 0.00,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  total_withdrawals DECIMAL(10,2) DEFAULT 0.00,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wallets_user_id ON wallets(user_id);
```

**withdrawals table**
```sql
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  bank_details JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'requested',
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP NULL,
  transaction_id UUID REFERENCES transactions(id)
);

CREATE INDEX idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
```

**ratings table**
```sql
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rater_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rated_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reference_id UUID NOT NULL,
  reference_type VARCHAR(50) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(rater_id, reference_id, reference_type)
);

CREATE INDEX idx_ratings_rated_user_id ON ratings(rated_user_id);
CREATE INDEX idx_ratings_reference ON ratings(reference_id, reference_type);
CREATE INDEX idx_ratings_rating ON ratings(rating);
```

**reports table**
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES users(id),
  reported_content_id UUID,
  content_type VARCHAR(50),
  reason VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  resolution TEXT
);

CREATE INDEX idx_reports_reporter_id ON reports(reporter_id);
CREATE INDEX idx_reports_reported_user_id ON reports(reported_user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_priority ON reports(priority);
```

**notifications table**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  priority VARCHAR(20) DEFAULT 'medium',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

**notification_preferences table**
```sql
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  push_enabled BOOLEAN DEFAULT true,
  email_enabled BOOLEAN DEFAULT true,
  sms_enabled BOOLEAN DEFAULT false,
  in_app_enabled BOOLEAN DEFAULT true,
  category_preferences JSONB DEFAULT '{}',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notification_preferences_user_id ON notification_preferences(user_id);
```


### MongoDB Collections

**courses collection**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  level: String, // beginner, intermediate, advanced
  duration: Number, // minutes
  language: String,
  instructor: {
    id: String,
    name: String,
    bio: String,
    profileImage: String
  },
  thumbnail: String,
  price: Number,
  rating: Number,
  enrollmentCount: Number,
  syllabus: [
    {
      id: String,
      title: String,
      description: String,
      type: String, // video, text, quiz, assignment
      duration: Number,
      videoUrl: String,
      content: String,
      quiz: {
        questions: [
          {
            id: String,
            question: String,
            type: String, // mcq, true_false, short_answer
            options: [String],
            correctAnswer: String,
            points: Number
          }
        ]
      },
      order: Number,
      downloadable: Boolean
    }
  ],
  prerequisites: [String],
  tags: [String],
  status: String, // draft, pending_approval, published, archived
  createdAt: Date,
  updatedAt: Date
}
```

**posts collection (Shakti Feed)**
```javascript
{
  _id: ObjectId,
  userId: String,
  type: String, // text, image, video, achievement, milestone
  content: String,
  media: [
    {
      type: String, // image, video
      url: String,
      thumbnail: String,
      duration: Number
    }
  ],
  achievement: {
    type: String,
    title: String,
    description: String,
    icon: String,
    metadata: Object
  },
  likeCount: Number,
  commentCount: Number,
  visibility: String, // public, followers, private
  status: String, // published, flagged, removed
  createdAt: Date,
  updatedAt: Date
}
```

**comments collection**
```javascript
{
  _id: ObjectId,
  postId: String,
  userId: String,
  content: String,
  createdAt: Date
}
```

**likes collection**
```javascript
{
  _id: ObjectId,
  postId: String,
  userId: String,
  createdAt: Date
}
// Compound index on (postId, userId) for uniqueness
```

**messages collection**
```javascript
{
  _id: ObjectId,
  conversationId: String,
  senderId: String,
  recipientId: String,
  content: String, // encrypted
  type: String, // text, image, video, audio, file
  attachments: [
    {
      type: String,
      url: String,
      name: String,
      size: Number
    }
  ],
  isRead: Boolean,
  isEncrypted: Boolean,
  sentAt: Date,
  readAt: Date
}
```

**conversations collection**
```javascript
{
  _id: ObjectId,
  participants: [String], // user IDs
  lastMessage: {
    content: String,
    senderId: String,
    sentAt: Date
  },
  unreadCount: {
    [userId]: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

**government_schemes collection**
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  provider: String,
  eligibility: {
    age: { min: Number, max: Number },
    gender: [String],
    income: { max: Number },
    location: [String],
    other: [String]
  },
  benefits: [String],
  applicationLink: String,
  deadline: Date,
  category: String, // loan, grant, training, subsidy, insurance
  targetAudience: [String],
  language: String,
  createdAt: Date,
  updatedAt: Date
}
```

**resources collection**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  type: String, // article, video, template, guide, tool
  category: String,
  url: String,
  language: String,
  tags: [String],
  createdAt: Date
}
```

**practice_tasks collection**
```javascript
{
  _id: ObjectId,
  courseId: String,
  lessonId: String,
  title: String,
  description: String,
  instructions: String,
  category: String,
  difficulty: String,
  estimatedTime: Number,
  rubric: [
    {
      criterion: String,
      description: String,
      maxPoints: Number
    }
  ],
  createdAt: Date
}
```

**task_submissions collection**
```javascript
{
  _id: ObjectId,
  userId: String,
  taskId: String,
  content: String,
  attachments: [
    {
      type: String,
      url: String,
      name: String
    }
  ],
  status: String, // pending, under_review, approved, rejected, revision_requested
  feedback: {
    mentorId: String,
    comments: String,
    score: Number,
    rubricScores: [
      {
        criterion: String,
        score: Number
      }
    ],
    reviewedAt: Date
  },
  submittedAt: Date
}
```

**portfolio_items collection**
```javascript
{
  _id: ObjectId,
  userId: String,
  title: String,
  description: String,
  category: String,
  media: [
    {
      type: String,
      url: String,
      thumbnail: String
    }
  ],
  skills: [String],
  visibility: String, // public, private
  createdAt: Date,
  updatedAt: Date
}
```

### Redis Data Structures

**Session Storage**
```
Key: session:{sessionId}
Type: Hash
TTL: 7 days
Fields:
  - userId
  - deviceId
  - createdAt
  - lastAccessedAt
  - ipAddress
```

**OTP Storage**
```
Key: otp:{phoneNumber}
Type: Hash
TTL: 5 minutes
Fields:
  - code
  - attempts
  - expiresAt
```

**Rate Limiting**
```
Key: ratelimit:{userId}:{endpoint}
Type: String (counter)
TTL: 1 hour
```

**Cache - User Profile**
```
Key: cache:user:{userId}
Type: String (JSON)
TTL: 1 hour
```

**Cache - Course Details**
```
Key: cache:course:{courseId}
Type: String (JSON)
TTL: 6 hours
```

**Real-time Presence**
```
Key: presence:{userId}
Type: String
TTL: 5 minutes
Value: online/offline
```

**Trending Posts**
```
Key: trending:posts
Type: Sorted Set
Score: engagement_score
TTL: 1 hour
```

**Job Recommendations Queue**
```
Key: queue:job_recommendations:{userId}
Type: List
```

### Elasticsearch Indices

**courses_index**
```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "standard" },
      "description": { "type": "text" },
      "category": { "type": "keyword" },
      "level": { "type": "keyword" },
      "language": { "type": "keyword" },
      "instructor": {
        "properties": {
          "name": { "type": "text" }
        }
      },
      "tags": { "type": "keyword" },
      "price": { "type": "float" },
      "rating": { "type": "float" },
      "enrollmentCount": { "type": "integer" },
      "createdAt": { "type": "date" }
    }
  }
}
```

**jobs_index**
```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "standard" },
      "description": { "type": "text" },
      "category": { "type": "keyword" },
      "location": {
        "properties": {
          "state": { "type": "keyword" },
          "district": { "type": "keyword" },
          "coordinates": { "type": "geo_point" }
        }
      },
      "salaryMin": { "type": "float" },
      "salaryMax": { "type": "float" },
      "skillsRequired": { "type": "keyword" },
      "jobType": { "type": "keyword" },
      "postedAt": { "type": "date" }
    }
  }
}
```

**services_index**
```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "standard" },
      "description": { "type": "text" },
      "category": { "type": "keyword" },
      "providerId": { "type": "keyword" },
      "price": { "type": "float" },
      "rating": { "type": "float" },
      "serviceArea": {
        "properties": {
          "center": { "type": "geo_point" },
          "radius": { "type": "float" }
        }
      },
      "createdAt": { "type": "date" }
    }
  }
}
```

**users_index**
```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "name": { "type": "text", "analyzer": "standard" },
      "skills": { "type": "keyword" },
      "roles": { "type": "keyword" },
      "location": {
        "properties": {
          "state": { "type": "keyword" },
          "district": { "type": "keyword" }
        }
      },
      "verificationStatus": { "type": "keyword" },
      "trustScore": { "type": "float" }
    }
  }
}
```

### Data Relationships

```
User (1) ─── (N) Enrollments ─── (1) Course
User (1) ─── (N) Job Applications ─── (1) Job
User (1) ─── (N) Service Listings
User (1) ─── (N) Bookings (as Customer)
User (1) ─── (N) Bookings (as Provider)
User (1) ─── (1) Wallet
User (1) ─── (N) Transactions
User (1) ─── (N) Badges
User (1) ─── (N) Posts
User (1) ─── (N) Ratings (as Rater)
User (1) ─── (N) Ratings (as Rated User)
User (1) ─── (N) Messages
User (1) ─── (N) Notifications
```

### Data Consistency Strategy

**Strong Consistency (PostgreSQL)**
- Financial transactions
- User authentication
- Bookings and job applications
- Wallet balances

**Eventual Consistency (MongoDB)**
- Course content
- Community posts
- Messages (with conflict resolution)

**Cache Invalidation Strategy**
- Write-through for critical data (user profiles, wallet)
- Cache-aside for read-heavy data (courses, jobs)
- TTL-based expiration for less critical data
- Event-driven invalidation for related data


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Authentication & User Management Properties

Property 1: Valid OTP Authentication
*For any* valid phone number and OTP pair, authentication should succeed and return valid access and refresh tokens
**Validates: Requirements 1.2**

Property 2: OTP Rate Limiting
*For any* user who enters invalid OTP three times, further authentication attempts should be blocked for 15 minutes
**Validates: Requirements 1.3**

Property 3: Recommendation Generation
*For any* completed user profile, the system should generate non-empty recommendations for courses, jobs, and mentors based on profile attributes
**Validates: Requirements 1.5**

Property 4: Image Upload Validation
*For any* valid image file (correct format and within size limits), upload should succeed and return a secure URL; for invalid images, upload should fail with appropriate error
**Validates: Requirements 1.6**

Property 5: Multilingual Authentication
*For any* supported language, authentication flow should work correctly and return responses in that language
**Validates: Requirements 1.7**

Property 6: Profile Update Persistence
*For any* valid profile update, changes should be immediately persisted and retrievable in subsequent profile queries
**Validates: Requirements 2.1**

Property 7: Role Configuration
*For any* role selection, the user's roles should be updated and reflected in their profile with appropriate dashboard configuration
**Validates: Requirements 2.2**

Property 8: Verification Status Update
*For any* verification request, the request should be created with pending status, and upon approval, verification badge should be visible on profile
**Validates: Requirements 2.3**

Property 9: Profile Completeness
*For any* user profile view, it should contain trust score, earned badges, completed courses, and achievements
**Validates: Requirements 2.4**

Property 10: Multi-Role Support
*For any* user, adding multiple roles should result in all roles being active simultaneously and accessible
**Validates: Requirements 2.5**

### Learning Module Properties

Property 11: Course Organization
*For any* course browse request, courses should be organized and grouped by their categories
**Validates: Requirements 3.1**

Property 12: Course Search Relevance
*For any* search query, returned courses should match the query in title, description, category, or skill level
**Validates: Requirements 3.2**

Property 13: Course Detail Completeness
*For any* course view, the response should include duration, level, language, instructor, syllabus, and reviews
**Validates: Requirements 3.3**

Property 14: Free Course Access
*For any* free course enrollment, the user should immediately have access to all course lessons without payment
**Validates: Requirements 3.4**

Property 15: Paid Course Payment Gate
*For any* paid course, enrollment should only succeed after successful payment processing
**Validates: Requirements 3.5**

Property 16: Offline Content Access
*For any* previously downloaded lesson, it should be accessible without an active network connection
**Validates: Requirements 3.6**

Property 17: Personalized Course Recommendations
*For any* user with a complete profile, course recommendations should be generated based on their interests, skills, and skill gaps
**Validates: Requirements 3.7**

Property 18: Lesson Download for Offline
*For any* lesson with offline mode enabled, download should create a local copy accessible without network
**Validates: Requirements 4.2**

Property 19: Progress Tracking on Completion
*For any* lesson completion, progress percentage should increase and the lesson should be marked as complete in enrollment record
**Validates: Requirements 4.3**

Property 20: Quiz Evaluation
*For any* quiz submission, score should be calculated based on correct answers, feedback provided, and score recorded
**Validates: Requirements 4.4**

Property 21: Certificate Issuance
*For any* course where all lessons are marked complete, a completion certificate should be issued to the user
**Validates: Requirements 4.5**

Property 22: Dashboard Progress Metrics
*For any* learner dashboard view, it should display courses in progress, completion percentage, and time spent learning
**Validates: Requirements 4.6**

### Skills & Certification Properties

Property 23: Practice Task Submission
*For any* practice task, submission should be created with pending status and marked for mentor review
**Validates: Requirements 5.1**

Property 24: Mentor Feedback Delivery
*For any* mentor review submission, learner should be notified and feedback should be visible on the submission
**Validates: Requirements 5.2**

Property 25: Badge Award on Assessment Pass
*For any* skill assessment with passing score, a skill badge should be awarded and visible on user profile
**Validates: Requirements 5.3**

Property 26: Portfolio Item Storage
*For any* portfolio item creation, it should be stored and retrievable on the user's public profile
**Validates: Requirements 5.4**

Property 27: Resume Generation Completeness
*For any* user, generated resume should include profile data, skills, badges, and experience
**Validates: Requirements 5.5**

Property 28: Skill Verification Process
*For any* skill verification request, standardized test should be administered and verification issued upon passing
**Validates: Requirements 5.7**

### Job Marketplace Properties

Property 29: Job Listing Completeness
*For any* job listing view, it should contain title, description, location, salary range, and requirements
**Validates: Requirements 6.1**

Property 30: Job Search Filtering
*For any* job search with filters (location, skills, experience, job type), results should match all specified filter criteria
**Validates: Requirements 6.2**

Property 31: Job Application Submission
*For any* job application, employer should receive the application with applicant's profile and resume
**Validates: Requirements 6.3**

Property 32: Application Review Data
*For any* application view by employer, it should contain applicant's skills, badges, and trust score
**Validates: Requirements 6.4**

Property 33: Job Recommendation Matching
*For any* user, job recommendations should match their skills, location, and preferences
**Validates: Requirements 6.5**

Property 34: Location-Based Job Prioritization
*For any* user within 10km of a job location, that job should rank higher in recommendations than distant jobs
**Validates: Requirements 6.6**

Property 35: Job Posting Validation
*For any* job posting, required fields should be validated and status should be set to pending approval
**Validates: Requirements 6.7**

### Service Marketplace Properties

Property 36: Service Listing Creation
*For any* service listing creation, all required fields (category, description, pricing, availability, service area) should be stored
**Validates: Requirements 7.1**

Property 37: Service Search Results
*For any* service search, results should contain provider profiles with services, ratings, and pricing
**Validates: Requirements 7.2**

Property 38: Booking Creation and Notification
*For any* service booking, provider should be notified and booking record should be created with pending status
**Validates: Requirements 7.3**

Property 39: Booking Acceptance Flow
*For any* booking acceptance by provider, customer should be notified and payment should be processed
**Validates: Requirements 7.4**

Property 40: Service Completion Rating Prompt
*For any* completed service, both customer and provider should be prompted to rate and review each other
**Validates: Requirements 7.5**

Property 41: Payment to Wallet with Fee Deduction
*For any* service payment, provider's wallet should be credited with payment amount minus platform fees
**Validates: Requirements 7.6**

Property 42: Service Provider Profile Completeness
*For any* skilled worker profile view, it should display verification badge, trust score, completed jobs, and customer reviews
**Validates: Requirements 7.7**

### Payment & Wallet Properties

Property 43: Payment Transaction Creation
*For any* payment initiation, transaction record should be created and processed through payment gateway
**Validates: Requirements 8.1**

Property 44: Successful Payment Wallet Update
*For any* successful payment, recipient's wallet balance should be updated and both parties should receive confirmation notifications
**Validates: Requirements 8.2**

Property 45: Failed Payment Notification
*For any* failed payment, user should be notified with failure reason and retry options
**Validates: Requirements 8.3**

Property 46: Wallet View Completeness
*For any* wallet view, it should display current balance, transaction history, and pending amounts
**Validates: Requirements 8.5**

Property 47: Earnings Dashboard Metrics
*For any* user with earnings, dashboard should display total earnings, monthly trends, and payment breakdowns
**Validates: Requirements 8.6**

Property 48: Disputed Transaction Fund Hold
*For any* transaction marked as disputed, funds should be held and not available for withdrawal until resolution
**Validates: Requirements 8.7**

### Community Feed Properties

Property 49: Post Creation and Publishing
*For any* valid post (text, image, or video), it should be created and visible in the Shakti Feed
**Validates: Requirements 9.1**

Property 50: Milestone Achievement Suggestion
*For any* milestone completion (first earning, course completion, badge earned), achievement post suggestion should be generated
**Validates: Requirements 9.2**

Property 51: Feed Chronological Ordering
*For any* Shakti Feed view, posts should be displayed in reverse chronological order with like and comment counts
**Validates: Requirements 9.3**

Property 52: Like Action Effects
*For any* post like action, like count should increment by one and post author should be notified
**Validates: Requirements 9.4**

Property 53: Comment Addition and Notification
*For any* comment on a post, comment should be added to the post and author should be notified
**Validates: Requirements 9.5**

Property 54: Trending Post Identification
*For any* post with engagement score above threshold, it should appear in the "Trending Wins" section
**Validates: Requirements 9.6**

Property 55: Post Reporting and Flagging
*For any* post report, post should be flagged for admin review and admin should be notified
**Validates: Requirements 9.8**

### Trust & Safety Properties

Property 56: Verification Badge Display
*For any* verified user, verification badge should be visible on their profile
**Validates: Requirements 10.1**

Property 57: Trust Score Recalculation
*For any* new rating received, user's trust score should be recalculated using the weighted algorithm
**Validates: Requirements 10.2**

Property 58: User Report Logging
*For any* user report, report should be logged with details and admin should be notified for review
**Validates: Requirements 10.3**

Property 59: Block Interaction Prevention
*For any* block action between two users, all interactions (messages, bookings, applications) should be prevented
**Validates: Requirements 10.4**

Property 60: Message Encryption
*For any* message sent through the platform, it should be encrypted before storage
**Validates: Requirements 10.5**

Property 61: Employer Verification on Jobs
*For any* verified employer's job posting, verification status should be displayed on the listing
**Validates: Requirements 10.6**

Property 62: Low Trust Score Restrictions
*For any* user with trust score below threshold, access to certain features should be restricted
**Validates: Requirements 10.7**

Property 63: Rating Visibility Before Engagement
*For any* user profile view, ratings and reviews should be visible to the viewer
**Validates: Requirements 10.8**

### Entrepreneurship Module Properties

Property 64: Government Scheme Search Results
*For any* scheme search query, results should contain eligibility criteria and application links
**Validates: Requirements 11.2**

Property 65: Business Course Certificate
*For any* business course completion, certificate should be issued and tracked in user progress
**Validates: Requirements 11.3**

Property 66: Business Mentor Connection
*For any* mentor connection request, communication channel should be established between user and mentor
**Validates: Requirements 11.4**

Property 67: Growth Analytics Display
*For any* growth analytics view, it should display business metrics, learning progress, and goal tracking
**Validates: Requirements 11.5**

### Mentor System Properties

Property 68: Mentor Application Creation
*For any* mentor application, it should be created with pending status awaiting credential verification
**Validates: Requirements 12.1**

Property 69: Approved Mentor Profile Creation
*For any* approved mentor, profile should be created with expertise areas and availability
**Validates: Requirements 12.2**

Property 70: Mentorship Matching
*For any* mentorship request, matching should occur based on skills and availability criteria
**Validates: Requirements 12.3**

Property 71: Feedback Delivery with Timestamp
*For any* mentor feedback submission, learner should receive it with timestamp
**Validates: Requirements 12.4**

Property 72: Session Logging and Rating
*For any* mentor session, it should be logged and both parties should be able to rate the session
**Validates: Requirements 12.5**

Property 73: Mentor Profile Completeness
*For any* mentor profile view, it should display specializations, ratings, and number of learners guided
**Validates: Requirements 12.6**

Property 74: Mentorship Payment to Wallet
*For any* premium mentorship payment, mentor's wallet should be credited
**Validates: Requirements 12.7**

### Admin System Properties

Property 75: Content Moderation Actions
*For any* content review by admin, moderation actions (approve, reject, remove) should be available and executable
**Validates: Requirements 13.2**

Property 76: Course Approval and Publishing
*For any* course approval by admin, course status should change to published and become visible to learners
**Validates: Requirements 13.3**

Property 77: Verification Document Access
*For any* verification request review, admin should have access to submitted documents and approval controls
**Validates: Requirements 13.4**

Property 78: Admin Analytics Display
*For any* admin analytics view, it should display user growth, engagement, revenue, and course completion rates
**Validates: Requirements 13.5**

Property 79: Category Management Persistence
*For any* category management action (add, edit, delete), changes should be persisted and reflected in content taxonomy
**Validates: Requirements 13.6**

Property 80: User Suspension Effects
*For any* user suspension by admin, user access should be revoked and user should be notified with reason
**Validates: Requirements 13.7**

### Accessibility Properties

Property 81: Low Bandwidth Mode Optimization
*For any* low bandwidth mode activation, image quality should be reduced and video auto-play should be disabled
**Validates: Requirements 14.5**

Property 82: Multilingual Help Tutorials
*For any* help access, video tutorials should be available in the user's selected language
**Validates: Requirements 14.7**

### Notification Properties

Property 83: Event-Based Notification Delivery
*For any* relevant event (booking, payment, achievement), affected users should receive push notifications
**Validates: Requirements 15.1**

Property 84: Message Notification
*For any* message received, recipient should receive real-time notification
**Validates: Requirements 15.2**

Property 85: Booking Status Notification
*For any* booking confirmation or cancellation, both customer and provider should be immediately notified
**Validates: Requirements 15.4**

Property 86: Achievement Notification
*For any* badge earned or course completed, user should receive congratulatory notification
**Validates: Requirements 15.5**

Property 87: Notification Preference Persistence
*For any* notification preference update, settings should be persisted and respected in future notifications
**Validates: Requirements 15.6**

Property 88: Payment Transaction Notification
*For any* payment received or withdrawal processed, user should receive transaction notification
**Validates: Requirements 15.7**

### Performance & Offline Properties

Property 89: Media Compression on Upload
*For any* media upload, images and videos should be compressed to optimize bandwidth usage
**Validates: Requirements 16.3**

Property 90: Offline Action Sync
*For any* action queued during network interruption, it should sync when connection is restored
**Validates: Requirements 16.7**

### Security & Privacy Properties

Property 91: Sensitive Data Encryption
*For any* sensitive data storage (passwords, payment info), data should be encrypted before persistence
**Validates: Requirements 17.1**

Property 92: Data Deletion Request Processing
*For any* user data deletion request, personal information should be marked for deletion and removed within specified timeframe
**Validates: Requirements 17.4**

Property 93: Privacy Settings Persistence
*For any* privacy setting update (profile visibility, data sharing), changes should be persisted and enforced
**Validates: Requirements 17.5**

Property 94: Role-Based Access Control
*For any* admin function access attempt, authorization should be checked based on user role
**Validates: Requirements 17.6**

### Search Properties

Property 95: Search Filter Application
*For any* search with filters (category, location, price, rating, language), results should match all specified criteria
**Validates: Requirements 18.2**

Property 96: Fuzzy Search Matching
*For any* search query with typos, system should provide fuzzy matching and return similar results
**Validates: Requirements 18.3**

Property 97: Voice Search Support
*For any* voice search in supported language, it should be transcribed and processed correctly
**Validates: Requirements 18.4**

Property 98: Search Result Completeness
*For any* search result item, it should display relevant information including ratings, location, and price
**Validates: Requirements 18.5**

Property 99: Autocomplete Suggestions
*For any* partial search query, autocomplete suggestions should be returned
**Validates: Requirements 18.6**

Property 100: Search Query Logging
*For any* search performed, query should be logged for analytics and recommendation improvement
**Validates: Requirements 18.7**

### Rating & Review Properties

Property 101: Rating Prompt on Completion
*For any* completed transaction or interaction, both parties should be prompted to provide ratings and reviews
**Validates: Requirements 19.1**

Property 102: Rating Validation
*For any* rating submission, score should be between 1-5 stars and optional text review should be accepted
**Validates: Requirements 19.2**

Property 103: Review Content Moderation
*For any* review submission, content should be validated for inappropriate language before publishing
**Validates: Requirements 19.3**

Property 104: Profile Rating Display
*For any* profile view, it should display average rating, total review count, and recent review excerpts
**Validates: Requirements 19.4**

Property 105: Trust Score Calculation
*For any* user, trust score should be calculated using weighted average of ratings, verification status, and platform activity
**Validates: Requirements 19.5**

Property 106: Review Report Flagging
*For any* review report, review should be flagged for admin review
**Validates: Requirements 19.6**

Property 107: Rating Duplicate Prevention
*For any* rating attempt, system should prevent users from rating themselves or submitting multiple ratings for the same interaction
**Validates: Requirements 19.7**

### Analytics Properties

Property 108: User Dashboard Analytics
*For any* user dashboard view, it should display personalized analytics including learning progress, earnings, and engagement metrics
**Validates: Requirements 20.1**

Property 109: Worker Analytics Display
*For any* skilled worker analytics view, it should show service bookings, revenue trends, and customer ratings over time
**Validates: Requirements 20.2**

Property 110: Learner Analytics Display
*For any* learner analytics view, it should display courses completed, time spent learning, and skill progression
**Validates: Requirements 20.3**

Property 111: Employer Analytics Display
*For any* employer analytics view, it should show job posting performance, applicant quality, and hiring metrics
**Validates: Requirements 20.4**

Property 112: Data Export Formatting
*For any* data export request, data should be correctly formatted in requested format (CSV or PDF)
**Validates: Requirements 20.5**

Property 113: Goal Progress Tracking
*For any* user goal, progress should be tracked and milestone notifications sent when milestones are reached
**Validates: Requirements 20.6**


## Error Handling

### Error Classification

**Client Errors (4xx)**
- 400 Bad Request: Invalid input data, validation failures
- 401 Unauthorized: Missing or invalid authentication token
- 403 Forbidden: Insufficient permissions for requested action
- 404 Not Found: Requested resource does not exist
- 409 Conflict: Resource conflict (duplicate enrollment, booking conflict)
- 422 Unprocessable Entity: Semantic validation errors
- 429 Too Many Requests: Rate limit exceeded

**Server Errors (5xx)**
- 500 Internal Server Error: Unexpected server error
- 502 Bad Gateway: Upstream service failure
- 503 Service Unavailable: Service temporarily unavailable
- 504 Gateway Timeout: Upstream service timeout

### Error Response Format

All API errors follow a consistent format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Specific field error details"
    },
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "uuid-request-id"
  }
}
```

### Error Handling Strategies

**Authentication Errors**
- Invalid OTP: Return clear error message with remaining attempts
- Expired token: Return 401 with refresh token instruction
- Rate limit exceeded: Return 429 with retry-after header

**Payment Errors**
- Payment gateway failure: Retry with exponential backoff (3 attempts)
- Insufficient funds: Return clear error, suggest wallet top-up
- Transaction timeout: Mark as pending, implement reconciliation job

**Network Errors**
- Connection timeout: Queue action for retry when online
- Intermittent failure: Implement exponential backoff retry
- Complete offline: Switch to offline mode, queue all actions

**Data Validation Errors**
- Invalid input: Return 400 with field-specific error messages
- Missing required fields: Return 422 with list of missing fields
- Format errors: Return 400 with expected format examples

**Resource Conflicts**
- Duplicate enrollment: Return 409 with existing enrollment details
- Booking conflict: Return 409 with alternative time suggestions
- Concurrent updates: Implement optimistic locking with version numbers

**External Service Failures**
- SMS gateway failure: Queue for retry, log for monitoring
- Payment gateway down: Show maintenance message, queue transactions
- Storage service error: Retry with fallback to alternative storage

### Graceful Degradation

**Core Features (Must Work)**
- Authentication (with cached credentials)
- Offline content access
- Queued action storage
- Basic profile viewing

**Enhanced Features (Can Degrade)**
- Real-time notifications → Polling
- Video streaming → Download only
- Search → Cached results
- Recommendations → Popular items

### Retry Strategies

**Exponential Backoff**
```
Attempt 1: Immediate
Attempt 2: 1 second delay
Attempt 3: 2 seconds delay
Attempt 4: 4 seconds delay
Attempt 5: 8 seconds delay
Max attempts: 5
```

**Circuit Breaker Pattern**
- Threshold: 5 consecutive failures
- Open state duration: 30 seconds
- Half-open state: Allow 1 test request
- Close on success, reopen on failure

### Logging and Monitoring

**Error Logging Levels**
- FATAL: System-wide failures requiring immediate attention
- ERROR: Request failures, external service errors
- WARN: Degraded performance, retry attempts
- INFO: Normal operations, successful requests
- DEBUG: Detailed debugging information

**Monitoring Metrics**
- Error rate by endpoint
- Error rate by error code
- Response time percentiles (p50, p95, p99)
- Circuit breaker state changes
- Retry attempt counts
- Queue depth for offline actions

### User-Facing Error Messages

**Principles**
- Use simple, non-technical language
- Provide actionable guidance
- Support multiple languages
- Include support contact for critical errors

**Examples**
- "Unable to connect. Please check your internet connection and try again."
- "This course is already in your learning list."
- "Payment failed. Please try a different payment method."
- "Too many attempts. Please try again in 15 minutes."

## Testing Strategy

### Testing Approach

The Eka platform requires a comprehensive testing strategy combining unit tests, property-based tests, integration tests, and end-to-end tests. Given the complexity and scale of the platform, we emphasize property-based testing for core business logic while using unit tests for specific examples and edge cases.

### Property-Based Testing

**Framework Selection**
- JavaScript/TypeScript: fast-check
- Python: Hypothesis
- General approach: Generate random valid inputs, verify properties hold

**Configuration**
- Minimum 100 iterations per property test
- Seed-based reproducibility for failed tests
- Shrinking enabled to find minimal failing cases

**Property Test Organization**

Each property test must:
1. Reference the design document property number
2. Include a comment tag: `Feature: eka-women-empowerment-app, Property {N}: {property_text}`
3. Generate random valid inputs covering the domain
4. Assert the property holds for all generated inputs
5. Handle edge cases through generator configuration

**Example Property Test Structure**

```typescript
// Feature: eka-women-empowerment-app, Property 6: Profile Update Persistence
// For any valid profile update, changes should be immediately persisted and retrievable
test('profile updates are persisted', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        userId: fc.uuid(),
        name: fc.string({ minLength: 1, maxLength: 255 }),
        age: fc.integer({ min: 18, max: 100 }),
        location: locationGenerator(),
      }),
      async (profileUpdate) => {
        // Update profile
        await userService.updateProfile(profileUpdate.userId, profileUpdate);
       
        // Retrieve profile
        const retrieved = await userService.getProfile(profileUpdate.userId);
       
        // Assert persistence
        expect(retrieved.name).toBe(profileUpdate.name);
        expect(retrieved.age).toBe(profileUpdate.age);
        expect(retrieved.location).toEqual(profileUpdate.location);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing

**Purpose**
- Test specific examples and edge cases
- Verify error handling paths
- Test boundary conditions
- Validate integration points

**Balance**
- Avoid excessive unit tests for cases covered by properties
- Focus on concrete examples that demonstrate correct behavior
- Test error conditions and edge cases explicitly
- Test integration between components

**Unit Test Categories**

1. **Example Tests**: Demonstrate specific use cases
   - User registers with valid phone number
   - Course enrollment with payment
   - Service booking flow

2. **Edge Case Tests**: Boundary conditions
   - Empty input handling
   - Maximum length strings
   - Minimum/maximum numeric values
   - Null/undefined handling

3. **Error Tests**: Failure scenarios
   - Invalid OTP attempts
   - Payment failures
   - Network errors
   - Validation failures

4. **Integration Tests**: Component interactions
   - Authentication → Profile creation
   - Course enrollment → Payment → Access grant
   - Booking → Payment → Notification

### Test Coverage by Module

**Authentication Service**
- Property tests: OTP validation, rate limiting, token generation
- Unit tests: Specific OTP formats, edge cases (expired OTP, invalid phone)
- Integration tests: Full authentication flow

**User Service**
- Property tests: Profile updates, role management, trust score calculation
- Unit tests: Verification workflow, specific role combinations
- Integration tests: Profile creation → Role assignment → Verification

**Learning Service**
- Property tests: Enrollment, progress tracking, certificate generation
- Unit tests: Specific course structures, quiz scoring edge cases
- Integration tests: Course discovery → Enrollment → Progress → Certificate

**Jobs Service**
- Property